import { Grid } from '@mui/material';
import CreateClassForm from './CreateClassForm';
import CreateClassPageContent from './CreateClassPageContent';

export default function CreateClassPage() {
  return (
    <Grid container py={4}>
      <CreateClassPageContent />
      <CreateClassForm />
    </Grid>
  );
}
