import { Grid } from '@mui/material';
import ManageTabs from './tables/ManageTabs';
import ContentManage from './ContentManage';

export default function ManagePage() {
  return (
    <Grid container py={4}>
      <ContentManage />

      <Grid item xs={12} container mt={2}>
        <ManageTabs />
      </Grid>
    </Grid>
  );
}
