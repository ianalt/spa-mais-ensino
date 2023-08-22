import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getProfile,
  selectUser,
  selectUserProfile,
} from '../../user/userSlice';
import ProfilePageContent from './ProfilePageContent';
import { Grid } from '@mui/material';

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  const userProfile = useAppSelector(selectUserProfile);

  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <Grid container>
      <ProfilePageContent />

      {user.status === 'loading' ? (
        <div>carregando...</div>
      ) : (
        <div>{userProfile && userProfile.email}</div>
      )}
    </Grid>
  );
}
