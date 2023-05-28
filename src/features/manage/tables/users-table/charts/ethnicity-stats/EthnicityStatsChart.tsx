import { Grid, Paper, Typography } from '@mui/material';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { useAppSelector } from '../../../../../../app/hooks';
import { getStudentsEthnicityStats } from '../../usersTableSlice';

export default function EthnicityStatsChart() {
  const ethnicityStats = useAppSelector(getStudentsEthnicityStats);

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

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
        <text
          x={x}
          y={y + 20}
          fill="white"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
        >
          {`${ethnicityStats[index].name}`}
        </text>
      </>
    );
  };

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12} p={2}>
          <Typography variant="h6" textAlign="center">
            Total de estudantes cadastrados (por etnia)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <PieChart width={500} height={500}>
            <Pie
              data={ethnicityStats}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={220}
              dataKey="count"
            >
              {ethnicityStats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Grid>
      </Grid>
    </Paper>
  );
}
