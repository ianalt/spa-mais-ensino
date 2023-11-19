import { Grid } from '@mui/material';
import CreateClassForm from './CreateClassForm';
import CreateClassPageContent from './CreateClassPageContent';
import { useEffect } from 'react';

export default function CreateClassPage() {
  useEffect(() => {
    document.title = 'Criar nova aula | +Ensino';
  }, []);

  return (
    <Grid container py={4}>
      <CreateClassPageContent />
      <CreateClassForm />
    </Grid>
  );
}
