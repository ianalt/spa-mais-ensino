import { Divider, Grid, LinearProgress } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getTeacherOrMonitorSubject,
  selectSubjects,
} from '../../slices/subjectsSlice';
import MySubjectPageContent from './MySubjectContent';
import MySubjectDetails from './MySubjectDetails';
import NoSubjectAssigned from './NoSubjectAssigned';

export default function MySubjectPage() {
  const dispatch = useAppDispatch();
  const subjects = useAppSelector(selectSubjects);

  const { status, selectedSubject } = subjects;

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

      {status === 'idle' && !selectedSubject && <NoSubjectAssigned />}
      <MySubjectDetails />
    </Grid>
  );
}
