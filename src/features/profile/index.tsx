import { Grid, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProfile, selectUser } from '../../user/userSlice';
import ProfileDetails from './ProfileDetails';
import ProfilePageContent from './ProfilePageContent';
import EditProfile from './EditProfile';

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const [openEditProfile, setOpenEditProfile] = useState<boolean>(false);

  const handleOpenEditProfile = () => setOpenEditProfile(true);
  const handleCloseEditProfile = () => setOpenEditProfile(false);

  useEffect(() => {
    document.title = '+Ensino: Meu perfil';

    handleCloseEditProfile();

    dispatch(getProfile());
  }, []);

  return (
    <Grid container>
      <ProfilePageContent onEditProfileClick={handleOpenEditProfile} />

      <Grid item xs={12} container>
        {user.status === 'loading' ? <LinearProgress /> : <ProfileDetails />}
      </Grid>

      <EditProfile
        open={openEditProfile}
        onClose={handleCloseEditProfile}
        onEdit={() => {}}
      />
    </Grid>
  );
}
