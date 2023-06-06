import { Grid } from '@mui/material';
import ManageTabs from './tables/ManageTabs';

export default function ManagePage() {
  return (
    <Grid container>
      <Grid item xs={12} container>
        <ManageTabs />
      </Grid>
    </Grid>
  );
}
