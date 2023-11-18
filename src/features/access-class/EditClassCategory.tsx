import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  TextField,
  Typography,
  createFilterOptions,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  editClassCategory,
  editClassTitle,
  getClassOptions,
  resetErrors,
  selectClasses,
  selectSubjectOptionsForClass,
} from '../../slices/classesSlice';
import NotificationAlert from '../notification-alert';
import { EditClassTitleBody } from './types/edit-class-title-body';
import {
  BasicCategoryInfo,
  SubjectWithCategories,
} from '../create-class/types/class-options';
import { selectUser } from '../../user/userSlice';
import { EditClassCategoryBody } from './types/edit-class-category-body';
import { Role } from '../../utils/enums/role.enum';
import { selectSubjects } from '../../slices/subjectsSlice';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface EditClassTitleProps {
  open: boolean;
  onClose: any;
  onEdit: any;
}

export default function EditClassCategory({
  open,
  onClose,
  onEdit,
}: EditClassTitleProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const classes = useAppSelector(selectClasses);
  const { status, error, selected, isUpdating } = classes;

  const subjects = useAppSelector(selectSubjects);
  const { selectedSubject } = subjects;

  const subjectsList = useAppSelector(selectSubjectOptionsForClass);

  const [openEditFailedAlert, setOpenEditFailedAlert] =
    useState<boolean>(false);

  const [chosenSubject, setChosenSubject] =
    useState<SubjectWithCategories | null>(null);
  const [categories, setCategories] = useState<BasicCategoryInfo[]>([]);
  const [chosenCategory, setChosenCategory] =
    useState<BasicCategoryInfo | null>(null);

  const autoCompleteSubjectOptions = createFilterOptions<SubjectWithCategories>(
    {
      matchFrom: 'start',
      stringify: (option) => option.name,
    }
  );

  const autoCompleteCategoryOptions = createFilterOptions<BasicCategoryInfo>({
    matchFrom: 'start',
    stringify: (option) => option.name,
  });

  const setFields = () => {
    const initialChosenSubject = subjectsList.find(
      (subject) => subject.id === selected?.category.subject.id
    );

    setChosenSubject(initialChosenSubject || null);

    const initialCategoryOptions = initialChosenSubject?.categories || [];

    setCategories(initialCategoryOptions);

    const initialChosenCategory = initialCategoryOptions.find(
      (category) => category.id === selected?.category.id
    );
    setChosenCategory(initialChosenCategory || null);
  };

  const resetFields = () => {
    setChosenSubject(null);
    setCategories([]);
    setChosenCategory(null);
  };

  const handleEditClassCategory = async () => {
    const body: EditClassCategoryBody = {
      classId: selected?.id || 0,
      categoryId: chosenCategory?.id || 0,
    };

    try {
      await dispatch(editClassCategory(body)).unwrap();

      onEdit();
      handleClose();
    } catch (rejectedValueOrSerializedError) {
      handleOpenEditFailedAlert();
    }
  };

  const handleSetCategory = () => {
    if (user.role === Role.PROFESSOR) {
      const [subjectOption] = subjectsList.filter(
        (item) => item.id === selectedSubject?.id
      );

      if (subjectOption !== undefined || subjectOption !== null) {
        setChosenSubject(subjectOption);
        setCategories(subjectOption.categories);
      }
    }
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const handleOpenEditFailedAlert = () => {
    setOpenEditFailedAlert(true);
  };

  const handleCloseEditFailedAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEditFailedAlert(false);
  };

  useEffect(() => {
    if (open) {
      setFields();

      dispatch(resetErrors());
      dispatch(getClassOptions());
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="class-edit-category-dialog-slide-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>{'Editar categoria'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="class-edit-category-dialog-slide-description">
            Preencha o campo abaixo para editar a categoria da aula.{' '}
            <strong>Confirme</strong> a opção antes de clicar no botão{' '}
            <strong>Salvar mudanças</strong>.
          </DialogContentText>

          <Grid container justifyContent="flex-start">
            <Grid item xs={12}>
              <NotificationAlert
                open={status === 'failed' && openEditFailedAlert}
                onClose={handleCloseEditFailedAlert}
                severity="error"
                status="Erro"
                message="Erro(s) detectado(s) durante edição de categoria"
              />
            </Grid>
            {status === 'failed' && (
              <Grid item xs={12} container m={1}>
                <Alert severity="error">
                  <Typography variant="body1">
                    <strong>Erro ao cadastrar. </strong>
                  </Typography>

                  {error.map((e: string, index: number) => {
                    return (
                      <Typography key={index} variant="body2">
                        &gt; {e}.
                      </Typography>
                    );
                  })}
                </Alert>
              </Grid>
            )}
          </Grid>

          <Grid item xs={8} container justifyContent="space-between" mt={1}>
            <Grid
              item
              xs={5}
              display={user.role === Role.PROFESSOR ? 'none' : 'flex'}
            >
              <Autocomplete
                id="edit-class-category-subject-option"
                disabled={user.role === Role.PROFESSOR}
                noOptionsText="Nenhuma opção encontrada"
                options={subjectsList}
                value={chosenSubject}
                fullWidth
                filterOptions={autoCompleteSubjectOptions}
                onChange={(
                  event: any,
                  newValue: SubjectWithCategories | null
                ) => {
                  setChosenSubject(newValue);

                  if (newValue) {
                    const categoryOptions = newValue.categories;

                    setCategories(categoryOptions);
                  } else {
                    setCategories([]);
                    setChosenCategory(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    required
                    fullWidth
                    label="Disciplina"
                  />
                )}
              />
            </Grid>
            <Grid item xs={5}>
              <Autocomplete
                onFocus={handleSetCategory}
                id="edit-class-category-option"
                noOptionsText="Nenhuma opção encontrada"
                fullWidth
                options={categories}
                value={chosenCategory}
                filterOptions={autoCompleteCategoryOptions}
                onChange={(event: any, newValue: BasicCategoryInfo | null) => {
                  setChosenCategory(newValue);
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    required
                    fullWidth
                    label="Categoria"
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Fechar
          </Button>

          <LoadingButton
            variant="contained"
            onClick={handleEditClassCategory}
            loading={status === 'loading' || isUpdating}
            disabled={!chosenCategory || isUpdating || status === 'loading'}
          >
            Salvar mudanças
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
