import { Grid, LinearProgress } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSubject, selectSubjects } from '../../slices/subjectsSlice';
import { useParams } from 'react-router-dom';

export default function SubjectPage() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const subjectId = params.subjectId ? parseInt(params.subjectId) : 0;

  const subjects = useAppSelector(selectSubjects);

  const { openedSubject } = subjects;
  // undraw_teaching_re_g7e3.svg

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
        <>{JSON.stringify(openedSubject)}</>
      )}
    </Grid>
  );
}
