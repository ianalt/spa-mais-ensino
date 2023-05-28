import { Grid, Paper, Typography } from '@mui/material';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { useAppSelector } from '../../../../../../app/hooks';
import { getStudentsGenderStats } from '../../usersTableSlice';

export default function GenderStatsChart() {
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

  const RADIAN = Math.PI / 180;
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
    <Paper>
      <Grid container>
        <Grid item xs={12} p={2}>
          <Typography variant="h6" textAlign="center">
            Proporção por identidade de gênero
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <PieChart width={500} height={500}>
            <Pie
              data={genderStats}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={220}
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
        </Grid>
      </Grid>
    </Paper>
  );
}
