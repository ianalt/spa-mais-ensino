import { Grid, Skeleton, Typography } from '@mui/material';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { useAppSelector } from '../../../../../../app/hooks';
import {
  getStudentsGenderStats,
  selectUsersTable,
} from '../../usersTableSlice';

export default function GenderStatsChart() {
  const usersTable = useAppSelector(selectUsersTable);
  const { status } = usersTable;

  const genderStats = useAppSelector(getStudentsGenderStats);

  const COLORS = [
    '#003f5c',
    '#0bb4ff',
    '#50e991',
    '#bc5090',
    '#9b19f5',
    '#ffa300',
    '#dc0ab4',
    '#b3d4ff',
    '#00bfa0',
  ];

  const DEGREES = 180;
  const RADIAN = Math.PI / DEGREES;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </>
    );
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} p={1}>
        <Typography variant="h6" textAlign="center">
          Proporção estudantil por identidade de gênero
        </Typography>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        {status === 'loading' ? (
          <Skeleton width={450} height={450} />
        ) : (
          <PieChart width={450} height={450}>
            <Pie
              data={genderStats}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={180}
              dataKey="count"
            >
              {genderStats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </Grid>
    </Grid>
  );
}
