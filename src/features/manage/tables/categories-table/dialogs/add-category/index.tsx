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
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import NotificationAlert from '../../../../../notification-alert';
import {
  addNewCategory,
  getCategoryOptions,
  resetErrors,
  selectCategoriesTable,
} from '../../categoriesTableSlice';
import { SubjectOption } from '../types/subject-option';
import { AddCategoryBody } from './types/add-category-body';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AddCategoryProps {
  open: boolean;
  onClose: any;
  onAdd: any;
}

export default function AddCategory({
  open,
  onClose,
  onAdd,
}: AddCategoryProps) {
  const dispatch = useAppDispatch();
  const categoriesTable = useAppSelector(selectCategoriesTable);

  const { status, isCreating, error, subjectsList } = categoriesTable;

  const [openAddFailedAlert, setOpenAddFailedAlert] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [chosenSubject, setChosenSubject] = useState<SubjectOption | null>(
    null
  );

  const resetFields = () => {
    setName('');
    setChosenSubject(null);
  };

  const handleAddCategory = async () => {
    const subjectId = chosenSubject?.id || 0;

    const body: AddCategoryBody = {
      name: name.trim(),
      subjectId,
    };

    try {
      await dispatch(addNewCategory(body)).unwrap();

      onAdd();
      handleClose();
    } catch (rejectedValueOrSerializedError) {
      handleOpenAddFailedAlert();
    }
  };

  const autoCompleteSubjectOptions = createFilterOptions<SubjectOption>({
    matchFrom: 'start',
    stringify: (option) => option.name,
  });

  const handleClose = () => {
    onClose();
  };

  const handleOpenAddFailedAlert = () => {
    setOpenAddFailedAlert(true);
  };

  const handleCloseAddFailedAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAddFailedAlert(false);
  };

  useEffect(() => {
    if (open) {
      resetFields();

      dispatch(resetErrors());
      dispatch(getCategoryOptions());
    }
  }, [open, dispatch]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="add-category-dialog-slide-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{'Adicionar nova disciplina'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="add-category-dialog-slide-description">
            Preencha as informações abaixo para criar uma nova categoria.{' '}
            <strong>Confirme</strong> os dados antes de clicar no botão{' '}
            <strong>Criar</strong>.
          </DialogContentText>

          <Grid container justifyContent="flex-start">
            <Grid item xs={12}>
              <NotificationAlert
                open={status === 'failed' && openAddFailedAlert}
                onClose={handleCloseAddFailedAlert}
                severity="error"
                status="Erro"
                message="Erro(s) detectado(s) durante registro de nova disciplina"
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

          <Grid container justifyContent={'flex-start'} py={2}>
            <Grid item xs={4}>
              <TextField
                id="add-category-name"
                margin="normal"
                required
                autoFocus
                fullWidth
                label="Nome"
                placeholder="Digite o nome da categoria..."
                name="name"
                value={name}
                variant="outlined"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={8} container>
              <Grid item xs={12} pl={1}>
                <Autocomplete
                  id="add-category-subject-option"
                  noOptionsText="Nenhuma opção encontrada"
                  options={subjectsList}
                  value={chosenSubject}
                  defaultValue={chosenSubject}
                  filterOptions={autoCompleteSubjectOptions}
                  onChange={(event: any, newValue: SubjectOption | null) => {
                    setChosenSubject(newValue);
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
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Fechar
          </Button>

          <LoadingButton
            variant="contained"
            onClick={handleAddCategory}
            loading={isCreating || status === 'loading'}
            disabled={
              !name || !chosenSubject || isCreating || status === 'loading'
            }
          >
            Criar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
