import { Grid, LinearProgress } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSubject, selectSubjects } from '../../slices/subjectsSlice';
import CategoriesList from './CategoriesList';
import SearchClass from './SearchClass';
import SubjectPageIntro from './SubjectPageIntro';

export default function SubjectPage() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const subjectId = params.subjectId ? parseInt(params.subjectId) : 0;

  const subjects = useAppSelector(selectSubjects);

  useEffect(() => {
    dispatch(getSubject(subjectId));

    document.title = `+Ensino | Porque o ensino é um direito de todos`;
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
          {/* search bar */}
          <SearchClass />

          {/* categories list */}
          <CategoriesList />
        </>
      )}
    </Grid>
  );
}
