import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useAppSelector } from '../../../../../../app/hooks';
import { getStudentsUfStats, selectUsersTable } from '../../usersTableSlice';
import { Grid, Skeleton, Typography } from '@mui/material';

export default function UfStatsChart() {
  const usersTable = useAppSelector(selectUsersTable);
  const { status } = usersTable;

  const ufStats = useAppSelector(getStudentsUfStats);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} p={1}>
        <Typography variant="h6" textAlign="center">
          Proporção estudantil por UF
        </Typography>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        {status === 'loading' ? (
          <Skeleton width={700} height={300} />
        ) : (
          <BarChart
            width={700}
            height={300}
            data={ufStats}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar name="Total de estudantes" dataKey="count" fill="#4BC0C0" />
          </BarChart>
        )}
      </Grid>
    </Grid>
  );
}
