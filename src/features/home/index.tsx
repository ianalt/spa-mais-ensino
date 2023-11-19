import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProfile, selectUser } from '../../user/userSlice';
import { Grid, LinearProgress } from '@mui/material';
import HomePageIntro from './HomePageIntro';
import RecentClasses from './RecentClassesList';
import { getRecentClasses, selectClasses } from '../../slices/classesSlice';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    document.title = '+Ensino: Página inicial';
  }, []);

  return (
    <Grid container>
      <HomePageIntro />
      <RecentClasses />
    </Grid>
  );
}
