import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Fab,
  Grid,
  LinearProgress,
  Link,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCategory, selectCategories } from '../../slices/categoriesSlice';
import { getTeacherSubject, selectSubjects } from '../../slices/subjectsSlice';
import { selectUser } from '../../user/userSlice';
import { Role } from '../../utils/enums/role.enum';
import NotificationAlert from '../notification-alert';
import MySubjectAddCategory from './AddCategory';
import CategoryCard from './CategoryCard';
import MySubjectEditCategory from './EditCategory';
import NoCategories from './NoCategories';
import MySubjectRemoveCategory from './RemoveCategory';
import { ptBrTableLocalization } from '../../utils/pt-br-table-localization';
import cloneDeep from 'lodash/cloneDeep';
import {
  getClass,
  getClassesFromSubject,
  selectClasses,
  setSelected,
} from '../../slices/classesSlice';
import MaterialTable from 'material-table';
import MySubjectRemoveClass from './RemoveClass';

export default function MySubjectDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const subjects = useAppSelector(selectSubjects);
  const categories = useAppSelector(selectCategories);
  const classes = useAppSelector(selectClasses);

  const { selectedSubject } = subjects;

  const [openRemoveCategory, setOpenRemoveCategory] = useState<boolean>(false);
  const [openRemoveCategoryAlert, setOpenRemoveCategoryAlert] =
    useState<boolean>(false);

  const [openEditCategory, setOpenEditCategory] = useState<boolean>(false);
  const [openEditCategoryAlert, setOpenEditCategoryAlert] =
    useState<boolean>(false);

  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);
  const [openAddCategoryAlert, setOpenAddCategoryAlert] =
    useState<boolean>(false);

  const [openRemoveClass, setOpenRemoveClass] = useState<boolean>(false);
  const [openRemoveClassAlert, setOpenRemoveClassAlert] =
    useState<boolean>(false);

  const [showClasses, setShowClasses] = useState<boolean>(false);

  useEffect(() => {
    setShowClasses(false);
  }, []);

  const handleOpenCreateClass = () => {
    navigate('/mais-ensino/minha-disciplina/nova-aula');
  };

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

  const handleShowClasses = () => {
    setShowClasses(true);
    if (subjects.selectedSubject)
      dispatch(getClassesFromSubject(subjects.selectedSubject.id));
  };

  const handleOpenRemoveClass = () => setOpenRemoveClass(true);
  const handleCloseRemoveClass = () => setOpenRemoveClass(false);
  const handleOpenRemoveClassAlert = () => setOpenRemoveClassAlert(true);
  const handleCloseRemoveClassAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenRemoveClassAlert(false);
  };

  return (
    <Grid item xs={12} container mt={5}>
      {subjects.status === 'loading' || categories.status === 'loading' ? (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      ) : (
        (subjects.status === 'idle' && selectedSubject && (
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
                  <Tooltip
                    title={
                      selectedSubject?.categories.length === 0
                        ? 'É necessária pelo menos 1 categoria para criar uma nova aula.'
                        : ''
                    }
                    arrow
                    placement="right"
                  >
                    <span>
                      <Fab
                        variant="extended"
                        color="secondary"
                        onClick={handleOpenCreateClass}
                        disabled={selectedSubject?.categories.length === 0}
                      >
                        <AddIcon />
                        <Typography>Aula</Typography>
                      </Fab>
                    </span>
                  </Tooltip>
                </Grid>
              </Grid>
            )}

            {selectedSubject?.categories.length === 0 ? (
              <NoCategories />
            ) : (
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
            )}

            {!showClasses && (
              <Grid item xs={12} container justifyContent="center" my={2}>
                <Button onClick={handleShowClasses} size="large">
                  <Typography variant="h6">Exibir aulas</Typography>
                </Button>
              </Grid>
            )}

            {classes.status === 'loading' ? (
              <Grid item xs={12}>
                <LinearProgress />
              </Grid>
            ) : (
              showClasses && (
                <Grid item xs={12} container justifyContent="center" mt={5}>
                  <MaterialTable
                    localization={ptBrTableLocalization}
                    options={{
                      search: true,
                      filtering: true,
                      grouping: true,
                    }}
                    actions={[
                      (rowData) => ({
                        icon: 'delete',
                        tooltip: 'Remover',
                        onClick: async (event) => {
                          await dispatch(getClass(rowData.id));
                          handleOpenRemoveClass();
                        },
                      }),
                      (rowData) => ({
                        icon: 'search',
                        tooltip: 'Detalhes',
                        onClick: () => {
                          navigate(`/mais-ensino/aula/${rowData.id}`);
                        },
                      }),
                    ]}
                    columns={[
                      { title: 'Título', field: 'title', defaultSort: 'asc' },
                      {
                        title: 'Categoria',
                        field: 'category.name',
                        defaultGroupOrder: 0,
                      },
                      {
                        title: 'Aula ativa?',
                        field: 'active',
                        type: 'boolean',
                      },
                    ]}
                    data={cloneDeep(classes.list)}
                    title="Lista de aulas"
                  />
                </Grid>
              )
            )}
          </Grid>
        )) || <></>
      )}

      <MySubjectAddCategory
        open={openAddCategory}
        onAdd={() => {
          dispatch(getTeacherSubject());
          handleOpenAddCategoryAlert();
        }}
        onClose={handleCloseAddCategory}
        subjectId={subjects.selectedSubject?.id || 0}
      />

      <MySubjectRemoveCategory
        open={openRemoveCategory}
        onRemove={() => {
          dispatch(getTeacherSubject());
          handleOpenRemoveCategoryAlert();
        }}
        onClose={handleCloseRemoveCategory}
      />

      <MySubjectEditCategory
        open={openEditCategory}
        onEdit={() => {
          dispatch(getTeacherSubject());
          handleOpenEditCategoryAlert();
        }}
        onClose={handleCloseEditCategory}
        subjectId={selectedSubject?.id || 0}
      />

      <MySubjectRemoveClass
        open={openRemoveClass}
        onRemove={() => {
          dispatch(getTeacherSubject());
          handleOpenRemoveClassAlert();
        }}
        onClose={handleCloseRemoveClass}
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

      <NotificationAlert
        open={
          openRemoveClassAlert &&
          classes.status === 'idle' &&
          !classes.isRemoving
        }
        onClose={handleCloseRemoveClassAlert}
        severity="success"
        status="Sucesso"
        message="Aula removida com sucesso"
      />

      <NotificationAlert
        open={
          openRemoveClassAlert &&
          classes.status === 'failed' &&
          !classes.isRemoving
        }
        onClose={handleCloseRemoveClassAlert}
        severity="error"
        status="Erro"
        message="Não foi possível remover a aula"
      />
    </Grid>
  );
}
