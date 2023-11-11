import { Divider, Grid, LinearProgress } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getTeacherOrMonitorSubject,
  resetSubject,
  selectSubjects,
} from '../../slices/subjectsSlice';
import MySubjectPageContent from './MySubjectContent';
import MySubjectDetails from './MySubjectDetails';
import NoSubjectAssigned from './NoSubjectAssigned';

export default function MySubjectPage() {
  const dispatch = useAppDispatch();
  const subjects = useAppSelector(selectSubjects);

  const { status, selectedSubject } = subjects;

  const handleSubjectDetailsDisplay = () => {
    if (status === 'loading')
      return (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      );

    if (status === 'idle' && !selectedSubject) return <NoSubjectAssigned />;

    if (status === 'idle' && selectedSubject) return <MySubjectDetails />;
  };

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

      {handleSubjectDetailsDisplay()}
    </Grid>
  );
}
