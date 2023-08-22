import { Grid } from '@mui/material';
import ManageTabs from './tables/ManageTabs';
import ManagePageContent from './ManagePageContent';
import { useEffect } from 'react';

export default function ManagePage() {
  useEffect(() => {
    document.title = '+Ensino: Gerenciamento';
  }, []);

  return (
    <Grid container py={4}>
      <ManagePageContent />

      <Grid item xs={12} container mt={2}>
        <ManageTabs />
      </Grid>
    </Grid>
  );
}
