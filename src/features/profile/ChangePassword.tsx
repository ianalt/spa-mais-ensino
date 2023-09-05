import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { LoadingButton } from '@mui/lab';
import { Alert, Grid, TextField, Tooltip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { passwordChange, resetErrors, selectUser } from '../../user/userSlice';
import NotificationAlert from '../notification-alert';
import { ChangePasswordBody } from './types/change-password.body';
import { current } from '@reduxjs/toolkit';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface EditProfileProps {
  open: boolean;
  onClose: any;
  onChange: any;
}

export default function EditProfile({
  open,
  onClose,
  onChange,
}: EditProfileProps) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const { status, isUpdating, error } = currentUser;

  const [openChangePasswordFailedAlert, setOpenChangePasswordFailedAlert] =
    useState<boolean>(false);

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>('');

  const resetFields = () => {
    setCurrentPassword('');
    setNewPassword('');
    setNewPasswordConfirmation('');
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const handleOpenChangePasswordFailedAlert = () => {
    setOpenChangePasswordFailedAlert(true);
  };

  const handleCloseEditProfileFailedAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenChangePasswordFailedAlert(false);
  };

  useEffect(() => {
    if (open) {
      resetFields();
      dispatch(resetErrors());
    }
  }, [open]);

  const handlePasswordChange = async () => {
    const body: ChangePasswordBody = {
      currentPassword,
      newPassword,
      newPasswordConfirmation,
    };

    try {
      await dispatch(passwordChange(body)).unwrap();

      onChange();
      handleClose();
    } catch (rejectedValueOrSerializedError) {
      handleOpenChangePasswordFailedAlert();
    }
  };

  return (
    <div>
      <Dialog
        id="change-password"
        open={open || isUpdating}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="change-password-dialog-slide-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{'Alterar senha'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="change-password-dialog-slide-description">
            Para <strong>alterar</strong> sua senha, você precisará fornecer sua{' '}
            <strong>senha atual</strong> antes. Ao fornecer a nova senha
            desejada, clique em <strong>Salvar</strong>.
          </DialogContentText>

          <Grid container justifyContent="center" my={2}>
            <Grid item xs={12}>
              <NotificationAlert
                open={status === 'failed' && openChangePasswordFailedAlert}
                onClose={handleCloseEditProfileFailedAlert}
                severity="error"
                status="Erro"
                message="Erro(s) detectado(s) durante alteração de senha"
              />
            </Grid>
            {status === 'failed' ? (
              <Grid item xs={12} container m={1}>
                <Alert severity="error">
                  <Typography variant="body1">
                    <strong>Erro ao editar. </strong>
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
            ) : (
              <></>
            )}
          </Grid>

          <Grid container>
            <Grid item xs={12} container my={1} justifyContent={'center'}>
              <Grid item xs={8}>
                <TextField
                  id="current-password"
                  margin="normal"
                  required
                  autoFocus
                  fullWidth
                  type="password"
                  label="Senha atual"
                  name="current-password"
                  value={currentPassword}
                  variant="outlined"
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} container my={1} justifyContent={'center'}>
              <Grid
                item
                xs={7}
                container
                alignItems="center"
                justifyContent="center"
              >
                <TextField
                  id="new-password"
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  label="Nova senha"
                  name="new-password"
                  value={newPassword}
                  variant="outlined"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </Grid>

              <Grid
                item
                xs={1}
                p={1}
                container
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Tooltip
                  title="A senha precisa conter entre 8 e 16 caracteres, com 1 letra minúscula, 1 maiúscula, 1 número e 1 caracter especial"
                  arrow
                >
                  <HelpOutlineOutlinedIcon fontSize="small" color="action" />
                </Tooltip>
              </Grid>
            </Grid>

            <Grid item xs={12} container my={1} justifyContent={'center'}>
              <Grid item xs={8}>
                {' '}
                <TextField
                  id="new-password-confirmation"
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  label="Confirme a nova senha"
                  name="new-password-confirmation"
                  value={newPasswordConfirmation}
                  variant="outlined"
                  onChange={(e) => {
                    setNewPasswordConfirmation(e.target.value);
                  }}
                />{' '}
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
            onClick={handlePasswordChange}
            loading={isUpdating}
            disabled={
              isUpdating ||
              !currentPassword ||
              !newPassword ||
              !newPasswordConfirmation
            }
          >
            Salvar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
