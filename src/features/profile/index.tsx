import { Grid, LinearProgress } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProfile, selectUser } from '../../user/userSlice';
import ProfileDetails from './ProfileDetails';
import ProfilePageContent from './ProfilePageContent';

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  useEffect(() => {
    document.title = '+Ensino: Meu perfil';

    dispatch(getProfile());
  }, []);

  return (
    <Grid container>
      <ProfilePageContent />

      <Grid item xs={12} container>
        {user.status === 'loading' ? <LinearProgress /> : <ProfileDetails />}
      </Grid>
    </Grid>
  );
}
