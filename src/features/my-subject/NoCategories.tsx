import { Grid } from '@mui/material';

export default function NoCategories() {
  return (
    <Grid container justifyContent="center" alignItems="center" p={3}>
      <em>Sem categorias disponíveis.</em>
    </Grid>
  );
}
