import { Grid, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProfile, selectUser } from '../../user/userSlice';
import ProfileDetails from './ProfileDetails';
import ProfilePageContent from './ProfilePageContent';
import EditProfile from './EditProfile';
import NotificationAlert from '../notification-alert';
import ChangePassword from './ChangePassword';

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const { status, isUpdating } = user;

  const [openEditProfile, setOpenEditProfile] = useState<boolean>(false);
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);

  const [openEditProfileAlert, setOpenEditProfileAlert] =
    useState<boolean>(false);
  const [openChangePasswordAlert, setOpenChangePasswordAlert] =
    useState<boolean>(false);

  const handleOpenEditProfile = () => setOpenEditProfile(true);
  const handleCloseEditProfile = () => setOpenEditProfile(false);

  const handleOpenChangePassword = () => setOpenChangePassword(true);
  const handleCloseChangePassword = () => setOpenChangePassword(false);

  const handleOpenEditProfileAlert = () => setOpenEditProfileAlert(true);
  const handleCloseEditProfileAlert = () => setOpenEditProfileAlert(false);

  const handleOpenChangePasswordAlert = () => setOpenChangePasswordAlert(true);
  const handleCloseChangePasswordAlert = () =>
    setOpenChangePasswordAlert(false);

  useEffect(() => {
    document.title = '+Ensino: Meu perfil';

    handleCloseEditProfile();

    dispatch(getProfile());
  }, []);

  return (
    <Grid container>
      <ProfilePageContent
        onEditProfileClick={handleOpenEditProfile}
        onChangePasswordClick={handleOpenChangePassword}
      />

      <Grid item xs={12} container>
        {user.status === 'loading' ? <LinearProgress /> : <ProfileDetails />}
      </Grid>

      <EditProfile
        open={openEditProfile}
        onClose={handleCloseEditProfile}
        onEdit={() => {
          handleOpenEditProfileAlert();
          dispatch(getProfile());
        }}
      />

      <ChangePassword
        open={openChangePassword}
        onClose={handleCloseChangePassword}
        onChange={handleOpenChangePasswordAlert}
      />

      <NotificationAlert
        open={openEditProfileAlert && status === 'idle' && !isUpdating}
        onClose={handleCloseEditProfileAlert}
        severity="success"
        status="Sucesso"
        message="Dados atualizados com sucesso"
      />

      <NotificationAlert
        open={openChangePasswordAlert && status === 'idle' && !isUpdating}
        onClose={handleCloseChangePasswordAlert}
        severity="success"
        status="Sucesso"
        message="Senha alterada com sucesso"
      />
    </Grid>
  );
}
