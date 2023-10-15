import { LoadingButton } from '@mui/lab';
import {
  Alert,
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
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addNewCategory,
  resetErrors,
  selectCategories,
} from '../../slices/categoriesSlice';
import { AddCategoryBody } from '../manage/tables/categories-table/dialogs/add-category/types/add-category-body';
import NotificationAlert from '../notification-alert';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface MySubjectAddCategoryProps {
  open: boolean;
  onClose: any;
  onAdd: any;
  subjectId: number;
}

export default function MySubjectAddCategory({
  open,
  onClose,
  onAdd,
  subjectId,
}: MySubjectAddCategoryProps) {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  const { status, isCreating, error } = categories;

  const [openAddFailedAlert, setOpenAddFailedAlert] = useState<boolean>(false);

  const [name, setName] = useState<string>('');

  const resetFields = () => {
    setName('');
  };

  const handleAddCategory = async () => {
    const body: AddCategoryBody = {
      name: name.trim(),
      subjectId: subjectId || 0,
    };

    try {
      await dispatch(addNewCategory(body)).unwrap();

      onAdd();
      handleClose();
    } catch (rejectedValueOrSerializedError) {
      handleOpenAddFailedAlert();
    }
  };

  const handleClose = () => {
    resetFields();
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
    }
  }, [open, dispatch]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="my-subject-add-category-dialog-slide-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{'Adicionar nova categoria'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="my-subject-add-category-dialog-slide-description">
            Forneça um nome para a nova categoria. <strong>Confirme</strong> o
            nome antes de clicar no botão <strong>Criar</strong>.
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
            <Grid item xs={12}>
              <TextField
                id="my-subject-add-category-name"
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
            disabled={!name || isCreating || status === 'loading'}
          >
            Criar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
