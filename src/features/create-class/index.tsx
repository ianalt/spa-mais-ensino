import { Grid, TextField } from '@mui/material';
import CreateClassPageContent from './CreateClassPageContent';
import CreateClassForm from './CreateClassForm';

export default function CreateClassPage() {
  return (
    <Grid container py={4}>
      <CreateClassPageContent />
      <CreateClassForm />
    </Grid>
  );
}
