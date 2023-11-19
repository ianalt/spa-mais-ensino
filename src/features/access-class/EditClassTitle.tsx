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
  editClassTitle,
  resetErrors,
  selectClasses,
} from '../../slices/classesSlice';
import NotificationAlert from '../notification-alert';
import { EditClassTitleBody } from './types/edit-class-title-body';

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

export default function EditClassTitle({
  open,
  onClose,
  onEdit,
}: EditClassTitleProps) {
  const dispatch = useAppDispatch();
  const classes = useAppSelector(selectClasses);

  const { status, error, selected, isUpdating } = classes;

  const [openEditFailedAlert, setOpenEditFailedAlert] =
    useState<boolean>(false);

  const [title, setTitle] = useState<string>('');

  const setFields = () => {
    setTitle(selected?.title || '');
  };

  const resetFields = () => {
    setTitle('');
  };

  const handleEditClassTitle = async () => {
    const body: EditClassTitleBody = {
      classId: selected?.id || 0,
      title: title.trim(),
    };

    try {
      await dispatch(editClassTitle(body)).unwrap();

      onEdit();
      handleClose();
    } catch (rejectedValueOrSerializedError) {
      handleOpenEditFailedAlert();
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
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="class-edit-title-dialog-slide-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>{'Editar título'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="class-edit-title-dialog-slide-description">
            Preencha o campo abaixo para editar o título da aula.{' '}
            <strong>Confirme</strong> o texto antes de clicar no botão{' '}
            <strong>Salvar mudanças</strong>.
          </DialogContentText>

          <Grid container justifyContent="flex-start">
            <Grid item xs={12}>
              <NotificationAlert
                open={status === 'failed' && openEditFailedAlert}
                onClose={handleCloseEditFailedAlert}
                severity="error"
                status="Erro"
                message="Erro(s) detectado(s) durante edição de título da aula"
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
                id="class-edit-title"
                margin="normal"
                required
                autoFocus
                fullWidth
                label="Título"
                placeholder="Digite o título da aula..."
                name="name"
                value={title}
                variant="outlined"
                onChange={(e) => {
                  setTitle(e.target.value);
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
            onClick={handleEditClassTitle}
            loading={status === 'loading' || isUpdating}
            disabled={!title || isUpdating || status === 'loading'}
          >
            Salvar mudanças
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
