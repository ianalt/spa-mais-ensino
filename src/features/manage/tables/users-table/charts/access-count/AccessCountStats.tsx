import { Grid, Skeleton, Typography } from '@mui/material';
import { useAppSelector } from '../../../../../../app/hooks';
import {
  getStudentsAccessCount,
  selectUsersTable,
} from '../../usersTableSlice';

export default function AccessCountStats() {
  const usersTable = useAppSelector(selectUsersTable);
  const { status } = usersTable;

  const accessCount = useAppSelector(getStudentsAccessCount);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} p={1}>
        <Typography variant="h6" textAlign="center">
          Total de acessos (últimas 24 horas)
        </Typography>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        {status === 'loading' ? (
          <Skeleton variant="circular" width={50} height={50} />
        ) : (
          <Typography variant="h3" textAlign="center">
            {accessCount}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
