import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  CircularProgress,
  Fab,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCategory, selectCategories } from '../../slices/categoriesSlice';
import {
  getTeacherOrMonitorSubject,
  selectSubjects,
} from '../../slices/subjectsSlice';
import NotificationAlert from '../notification-alert';
import MySubjectAddCategory from './AddCategory';
import CategoryCard from './CategoryCard';
import MySubjectEditCategory from './EditCategory';
import MySubjectRemoveCategory from './RemoveCategory';
import { Role } from '../../utils/enums/role.enum';
import { selectUser } from '../../user/userSlice';

export default function MySubjectDetails() {
  const dispatch = useAppDispatch();

  const subjects = useAppSelector(selectSubjects);
  const { selectedSubject } = subjects;

  const user = useAppSelector(selectUser);

  const categories = useAppSelector(selectCategories);

  const [openAddTopic, setOpenAddTopic] = useState<boolean>(false);

  const [openRemoveCategory, setOpenRemoveCategory] = useState<boolean>(false);
  const [openRemoveCategoryAlert, setOpenRemoveCategoryAlert] =
    useState<boolean>(false);

  const [openEditCategory, setOpenEditCategory] = useState<boolean>(false);
  const [openEditCategoryAlert, setOpenEditCategoryAlert] =
    useState<boolean>(false);

  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);
  const [openAddCategoryAlert, setOpenAddCategoryAlert] =
    useState<boolean>(false);

  const handleOpenAddTopic = () => setOpenAddTopic(true);
  const handleCloseAddTopic = () => setOpenAddTopic(false);

  const handleOpenAddCategory = () => setOpenAddCategory(true);
  const handleCloseAddCategory = () => setOpenAddCategory(false);
  const handleOpenAddCategoryAlert = () => setOpenAddCategoryAlert(true);
  const handleCloseAddCategoryAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAddCategoryAlert(false);
  };

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
          <Grid item xs={12}>
            <Typography variant="h4">{selectedSubject?.name}</Typography>
            <Typography variant="h6">
              {selectedSubject?.knowledgeArea.name}
            </Typography>
          </Grid>

          <Grid item xs={12} mb={2}>
            <Typography variant="body1">
              {selectedSubject?.description}
            </Typography>
          </Grid>

          {user.role === Role.PROFESSOR && (
            <Grid item xs={12} container justifyContent="flex-start" mb={5}>
              <Grid item xs="auto" px={1}>
                <Fab
                  variant="extended"
                  color="secondary"
                  onClick={handleOpenAddCategory}
                >
                  <AddIcon />
                  <Typography>Categoria</Typography>
                </Fab>
              </Grid>

              <Grid item xs="auto" px={1}>
                <Fab
                  variant="extended"
                  color="secondary"
                  onClick={handleOpenAddTopic}
                >
                  <AddIcon />
                  <Typography>Tópico</Typography>
                </Fab>
              </Grid>
            </Grid>
          )}

          <Grid container justifyContent="space-evenly" item xs={12}>
            {selectedSubject?.categories.map((category) => {
              return (
                <CategoryCard
                  key={`subject-category-${category.id}`}
                  category={category}
                  onRemoveRequest={async () => {
                    await dispatch(getCategory(category.id));

                    handleOpenRemoveCategory();
                  }}
                  onEditRequest={async () => {
                    await dispatch(getCategory(category.id));
                    handleOpenEditCategory();
                  }}
                />
              );
            })}
          </Grid>
        </Grid>
      )}

      <MySubjectAddCategory
        open={openAddCategory}
        onAdd={() => {
          dispatch(getTeacherOrMonitorSubject());
          handleOpenAddCategoryAlert();
        }}
        onClose={handleCloseAddCategory}
        subjectId={subjects.selectedSubject?.id || 0}
      />

      <MySubjectRemoveCategory
        open={openRemoveCategory}
        onRemove={() => {
          dispatch(getTeacherOrMonitorSubject());
          handleOpenRemoveCategoryAlert();
        }}
        onClose={handleCloseRemoveCategory}
      />

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
          openAddCategoryAlert &&
          categories.status === 'idle' &&
          !categories.isCreating
        }
        onClose={handleCloseAddCategoryAlert}
        severity="success"
        status="Sucesso"
        message="Categoria criada com sucesso"
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
