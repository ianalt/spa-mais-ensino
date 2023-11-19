import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProfile, selectUser } from '../../user/userSlice';
import { Grid, LinearProgress } from '@mui/material';
import HomePageIntro from './HomePageIntro';
import RecentClasses from './RecentClasses';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    document.title = '+Ensino: Página inicial';

    dispatch(getProfile());
  }, []);

  return (
    <Grid container>
      {user.status === 'loading' ? (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      ) : (
        <>
          <HomePageIntro />
          <RecentClasses />
        </>
      )}
    </Grid>
  );
}
