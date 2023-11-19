import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getRecentClasses, selectClasses } from '../../slices/classesSlice';
import { useEffect } from 'react';
import RecentClassCard from './RecentClassCard';

export default function RecentClassesList() {
  const dispatch = useAppDispatch();
  const classes = useAppSelector(selectClasses);

  const { recentClasses } = classes;

  useEffect(() => {
    dispatch(getRecentClasses());
  }, []);

  return (
    <>
      {classes.status === 'loading' ? (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      ) : (
        <Grid item xs={12} container>
          <Grid item xs={12}>
            <Typography variant="h5">Aulas mais recentes</Typography>
          </Grid>

          <Grid item xs={12} py={1}>
            <Divider />
          </Grid>

          <Grid item xs={12} container justifyContent={'flex-start'}>
            {recentClasses.map((recentClass) => {
              return (
                <RecentClassCard
                  key={`recent-class-${recentClass.id}`}
                  recentClass={recentClass}
                />
              );
            })}
          </Grid>
        </Grid>
      )}
    </>
  );
}
