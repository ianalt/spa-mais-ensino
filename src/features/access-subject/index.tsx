import { Grid, LinearProgress } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSubject, selectSubjects } from '../../slices/subjectsSlice';
import SubjectPageIntro from './SubjectPageIntro';

export default function SubjectPage() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const subjectId = params.subjectId ? parseInt(params.subjectId) : 0;

  const subjects = useAppSelector(selectSubjects);

  const { openedSubject } = subjects;

  useEffect(() => {
    dispatch(getSubject(subjectId));
    document.title = `+Ensino | ${openedSubject?.name}`;
  }, []);

  return (
    <Grid container>
      {subjects.status === 'loading' ? (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      ) : (
        <>
          <SubjectPageIntro />
        </>
      )}
    </Grid>
  );
}
