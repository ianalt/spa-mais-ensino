import { Divider, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getTeacherOrMonitorSubject } from '../../slices/subjectsSlice';
import MySubjectPageContent from './MySubjectContent';
import MySubjectDetails from './MySubjectDetails';

export default function MySubjectPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = '+Ensino | Minha disciplina';

    dispatch(getTeacherOrMonitorSubject());
  }, []);

  return (
    <Grid container>
      <MySubjectPageContent />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <MySubjectDetails />
    </Grid>
  );
}
