import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Grid, Skeleton, Tooltip, Typography } from '@mui/material';
import { useAppSelector } from '../../../../../../app/hooks';
import {
  getStudentsIncomeStats,
  selectUsersTable,
} from '../../usersTableSlice';

export default function AvgIncomeStats() {
  const usersTable = useAppSelector(selectUsersTable);
  const { status } = usersTable;

  const incomeStats = useAppSelector(getStudentsIncomeStats);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} p={1} container>
        <Grid item xs={10}>
          <Typography variant="h6" textAlign="center">
            Renda média por estudante
          </Typography>
        </Grid>
        <Grid item xs={2} container alignItems="center">
          <Tooltip
            title="A média das razões entre os valores de renda e o total de componentes do domicílio"
            arrow
          >
            <HelpOutlineOutlinedIcon fontSize="small" color="action" />
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        {status === 'loading' ? (
          <Skeleton variant="circular" width={50} height={50} />
        ) : (
          <Typography variant="h3" textAlign="center">
            R${incomeStats}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
