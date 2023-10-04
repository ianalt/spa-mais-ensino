import { CircularProgress, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCategory, selectCategories } from '../../slices/categoriesSlice';
import {
  getTeacherOrMonitorSubject,
  selectSubjects,
} from '../../slices/subjectsSlice';
import CategoryCard from './CategoryCard';
import MySubjectEditCategory from './EditCategory';
import NotificationAlert from '../notification-alert';

export default function MySubjectDetails() {
  const dispatch = useAppDispatch();

  const subjects = useAppSelector(selectSubjects);
  const { selectedSubject } = subjects;

  const categories = useAppSelector(selectCategories);

  const [openRemoveCategory, setOpenRemoveCategory] = useState<boolean>(false);
  const [openRemoveCategoryAlert, setOpenRemoveCategoryAlert] =
    useState<boolean>(false);

  const [openEditCategory, setOpenEditCategory] = useState<boolean>(false);
  const [openEditCategoryAlert, setOpenEditCategoryAlert] =
    useState<boolean>(false);

  const handleOpenRemoveCategory = () => setOpenRemoveCategory(true);
  const handleCloseRemoveCategory = () => setOpenRemoveCategory(false);
  const handleOpenRemoveCategoryAlert = () => setOpenRemoveCategoryAlert(true);
  const handleCloseRemoveCategoryAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenRemoveCategoryAlert(false);
  };

  const handleOpenEditCategory = () => setOpenEditCategory(true);
  const handleCloseEditCategory = () => setOpenEditCategory(false);
  const handleOpenEditCategoryAlert = () => setOpenEditCategoryAlert(true);
  const handleCloseEditCategoryAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEditCategoryAlert(false);
  };

  return (
    <Grid item xs={12} container mt={5}>
      {subjects.status === 'loading' || categories.status === 'loading' ? (
        <Grid item xs={12}>
          <CircularProgress size="large" />
        </Grid>
      ) : (
        <Grid
          container
          item
          xs={12}
          alignContent="center"
          textAlign="start"
          p={2}
        >
          <Grid item xs={12} mb={2}>
            <Typography variant="h4">{selectedSubject?.name}</Typography>
            <Typography variant="h6">
              {selectedSubject?.knowledgeArea.name}
            </Typography>
          </Grid>

          <Grid container justifyContent="space-evenly" item xs={12}>
            {selectedSubject?.categories.map((category) => {
              return (
                <CategoryCard
                  key={`subject-category-${category.id}`}
                  category={category}
                  onRemoveRequest={handleOpenRemoveCategory}
                  onEditRequest={async () => {
                    await dispatch(getCategory(category.id));
                    handleOpenEditCategory();
                  }}
                />
              );
            })}
          </Grid>

          {/* <MySubjectRemoveCategory open={openRemoveCategory} onRemove={{() => dispatch(get)}} onClose={handleCloseRemoveCategory} /> */}
        </Grid>
      )}

      <MySubjectEditCategory
        open={openEditCategory}
        onEdit={() => {
          dispatch(getTeacherOrMonitorSubject());
          handleOpenEditCategoryAlert();
        }}
        onClose={handleCloseEditCategory}
        subjectId={selectedSubject?.id || 0}
      />

      <NotificationAlert
        open={
          openEditCategoryAlert &&
          categories.status === 'idle' &&
          !categories.isUpdating
        }
        onClose={handleCloseEditCategoryAlert}
        severity="success"
        status="Sucesso"
        message="Categoria editada com sucesso"
      />

      <NotificationAlert
        open={
          openEditCategoryAlert &&
          categories.status === 'failed' &&
          !categories.isUpdating
        }
        onClose={handleCloseEditCategoryAlert}
        severity="error"
        status="Erro"
        message="Não foi possível editar a categoria"
      />

      <NotificationAlert
        open={
          openRemoveCategoryAlert &&
          categories.status === 'idle' &&
          !categories.isRemoving
        }
        onClose={handleCloseRemoveCategoryAlert}
        severity="success"
        status="Sucesso"
        message="Categoria removida com sucesso"
      />

      <NotificationAlert
        open={
          openRemoveCategoryAlert &&
          categories.status === 'failed' &&
          !categories.isRemoving
        }
        onClose={handleCloseRemoveCategoryAlert}
        severity="error"
        status="Erro"
        message="Não foi possível remover a categoria"
      />
    </Grid>
  );
}
