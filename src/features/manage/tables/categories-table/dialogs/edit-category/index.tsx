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
  editCategory,
  getCategoryOptions,
  resetErrors,
  selectCategoriesTable,
} from '../../categoriesTableSlice';

import { ActiveOption } from '../../../../../../utils/options/types/active-option';
import { activeOptions } from '../../../../../../utils/options/types/active-options';
import { SubjectOption } from '../types/subject-option';
import { EditCategoryBody } from './types/edit-category-body';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface EditCategoryProps {
  open: boolean;
  onClose: any;
  onEdit: any;
}

export default function EditCategory({
  open,
  onClose,
  onEdit,
}: EditCategoryProps) {
  const dispatch = useAppDispatch();
  const categoriesTable = useAppSelector(selectCategoriesTable);

  const { status, isUpdating, error, subjectsList, selected } = categoriesTable;

  const [openEditFailedAlert, setOpenEditFailedAlert] =
    useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [chosenSubject, setChosenSubject] = useState<SubjectOption | null>(
    null
  );
  const [active, setActive] = useState<ActiveOption | null>(null);

  const setFields = () => {
    setName(selected?.name || '');

    setChosenSubject(selected?.subject || null);

    const initialActive = activeOptions.find(
      (option) => option.value === selected?.active
    );
    setActive(initialActive ? initialActive : null);
  };

  const resetFields = () => {
    setName('');
    setActive(null);
  };

  const handleEditCategory = async () => {
    const subjectId = chosenSubject?.id || 0;

    const body: EditCategoryBody = {
      categoryId: selected?.id || 0,
      active: active?.value || false,
      name: name.trim(),
      subjectId: subjectId,
    };

    try {
      await dispatch(editCategory(body)).unwrap();

      onEdit();
      handleClose();
    } catch (rejectedValueOrSerializedError) {
      handleOpenEditFailedAlert();
    }
  };

  const autoCompleteSubjectOptions = createFilterOptions<SubjectOption>({
    matchFrom: 'start',
    stringify: (option) => option.name,
  });

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
      dispatch(getCategoryOptions());
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="edit-category-dialog-slide-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{'Editar categoria'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="edit-category-dialog-slide-description">
            Preencha as informações abaixo para criar uma nova categoria.{' '}
            <strong>Confirme</strong> os dados antes de clicar no botão{' '}
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

          <Grid container justifyContent={'flex-start'} py={2}>
            <Grid item xs={4}>
              <TextField
                id="edit-category-name"
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

            <Grid item xs={6} container>
              <Grid item xs={12} pl={1}>
                <Autocomplete
                  id="edit-category-subject-option"
                  noOptionsText="Nenhuma opção encontrada"
                  options={subjectsList}
                  value={chosenSubject}
                  defaultValue={chosenSubject}
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

            <Grid item xs={12} container>
              <Grid item xs={4}>
                <Autocomplete
                  id="edit-category-active-options"
                  value={active}
                  defaultValue={active}
                  onChange={(event: any, newValue: ActiveOption | null) => {
                    setActive(newValue);
                  }}
                  options={activeOptions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      required
                      fullWidth
                      label="Categoria ativa?"
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
            onClick={handleEditCategory}
            loading={isUpdating || status === 'loading'}
            disabled={
              !name || !chosenSubject || isUpdating || status === 'loading'
            }
          >
            Salvar mudanças
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
