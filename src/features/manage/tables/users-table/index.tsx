import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  CircularProgress,
  Fab,
  Grid,
  LinearProgress,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';
import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../../../user/userSlice';
import NotificationAlert from '../../../notification-alert';
import EthnicityStatsChart from './charts/ethnicity-stats/EthnicityStatsChart';
import GenderStatsChart from './charts/gender-stats/GenderStatsChart';

import CreateUser from './dialogs/create-user';
import EditUser from './dialogs/edit-user';
import RemoveUser from './dialogs/remove-user';
import UserDetails from './dialogs/user-details';
import {
  getAccessCount,
  getEthnicityStats,
  getGenderStats,
  getIncomeStats,
  getIsLoading,
  getUfStats,
  getUsersList,
  resetSelected,
  selectUsersTable,
  setSelected,
} from './usersTableSlice';
import UfStatsChart from './charts/uf-stats/UfStatsChart';
import AccessCountStats from './charts/access-count/AccessCountStats';
import AvgIncomeStats from './charts/avg-income/AvgIncomeStats';

export default function UsersTable() {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectUser);
  const { id } = currentUser;

  const usersTable = useAppSelector(selectUsersTable);
  const { list, status, isCreating, isRemoving, isUpdating } = usersTable;
  const isLoading = useAppSelector(getIsLoading);

  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openRemove, setOpenRemove] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [openCreateAlert, setOpenCreateAlert] = useState<boolean>(false);
  const [openRemoveAlert, setOpenRemoveAlert] = useState<boolean>(false);
  const [openEditAlert, setOpenEditAlert] = useState<boolean>(false);

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleOpenRemove = () => {
    setOpenRemove(true);
  };

  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleOpenCreateAlert = () => {
    setOpenCreateAlert(true);
  };
  const handleOpenRemoveAlert = () => {
    setOpenRemoveAlert(true);
  };

  const handleCloseCreateAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenCreateAlert(false);
  };

  const handleCloseRemoveAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenRemoveAlert(false);
  };

  const handleOpenEditAlert = () => {
    setOpenEditAlert(true);
  };
  const handleCloseEditAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEditAlert(false);
  };

  const handleRefreshStats = () => {
    dispatch(getEthnicityStats());
    dispatch(getGenderStats());
    dispatch(getUfStats());
    dispatch(getAccessCount());
    dispatch(getIncomeStats());
  };

  useEffect(() => {
    handleCloseDetails();
    handleCloseCreate();
    handleCloseEdit();
    handleCloseRemove();

    handleRefreshStats();

    dispatch(resetSelected());
    dispatch(getUsersList());
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Estatísticas</Typography>
        </Grid>
        <Grid item xs={12} mb={5}>
          <Paper>
            <Grid container justifyContent="space-evenly">
              <Grid item xs={3} m={1} container>
                <Grid item xs={12}>
                  <AccessCountStats />
                </Grid>
                <Grid item xs={12}>
                  <AvgIncomeStats />
                </Grid>
              </Grid>

              <Grid item xs={8} m={1}>
                <UfStatsChart />
              </Grid>
              <Grid item xs={4} m={1}>
                <EthnicityStatsChart />
              </Grid>
              <Grid item xs={4} m={1}>
                <GenderStatsChart />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {isLoading ? (
          <Box mt={3}>
            <LinearProgress />
          </Box>
        ) : (
          <>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Typography variant="h4">Lista de usuários</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container justifyContent="flex-end" my={1}>
              <Tooltip title="Criar novo usuário">
                <span>
                  <Fab
                    color="primary"
                    aria-label="create-user"
                    onClick={handleOpenCreate}
                    disabled={isLoading}
                  >
                    <AddIcon />
                  </Fab>
                </span>
              </Tooltip>
            </Grid>

            <Grid item xs={12}>
              <MaterialTable
                localization={{
                  body: {
                    emptyDataSourceMessage: 'Nenhum registro para exibir',
                  },
                  header: {
                    actions: 'Ações',
                  },
                  toolbar: {
                    searchTooltip: 'Pesquisar',
                    exportTitle: 'Baixar lista',
                    exportAriaLabel: 'Baixar lista',
                    exportPDFName: 'Baixar como PDF',
                    exportCSVName: 'Baixar como CSV',
                    searchPlaceholder: 'Pesquisar',
                  },
                  pagination: {
                    labelRowsSelect: 'linhas',
                    labelDisplayedRows: '{count} de {from}-{to}',
                    firstTooltip: 'Primeira página',
                    previousTooltip: 'Página anterior',
                    nextTooltip: 'Próxima página',
                    lastTooltip: 'Última página',
                    labelRowsPerPage: 'Linhas por página',
                  },
                }}
                options={{ search: true, filtering: true, exportButton: true }}
                actions={[
                  (rowData) => ({
                    icon: 'delete',
                    tooltip:
                      rowData.role === 'admin' && id !== rowData.id
                        ? 'Administradores não podem remover outros administradores'
                        : 'Remover',
                    disabled: rowData.role === 'admin' && id !== rowData.id,
                    onClick: () => {
                      dispatch(setSelected(rowData));
                      handleOpenRemove();
                    },
                  }),
                  (rowData) => ({
                    icon: 'search',
                    tooltip: 'Detalhes',
                    onClick: () => {
                      dispatch(setSelected(rowData));
                      handleOpenDetails();
                    },
                  }),
                  (rowData) => ({
                    icon: 'edit',
                    tooltip:
                      rowData.role === 'admin' && id !== rowData.id
                        ? 'Administradores não podem editar informações de outros administradores'
                        : 'Editar',
                    disabled: rowData.role === 'admin' && id !== rowData.id,
                    onClick: () => {
                      dispatch(setSelected(rowData));
                      handleOpenEdit();
                    },
                  }),
                ]}
                columns={[
                  { title: 'Nome', field: 'firstName', defaultSort: 'asc' },
                  { title: 'Sobrenome(s)', field: 'lastName' },
                  { title: 'E-mail', field: 'email' },
                  { title: 'Nível de acesso', field: 'role' },
                  { title: 'Conta ativa?', field: 'active', type: 'boolean' },
                ]}
                data={cloneDeep(list)}
                title=""
              />
            </Grid>
          </>
        )}
      </Grid>

      <UserDetails open={openDetails} onClose={handleCloseDetails} />

      <CreateUser
        open={openCreate}
        onClose={handleCloseCreate}
        onCreate={() => {
          handleOpenCreateAlert();
          handleRefreshStats();
        }}
      />

      <RemoveUser
        open={openRemove}
        onClose={handleCloseRemove}
        onRemove={() => {
          handleOpenRemoveAlert();
          handleRefreshStats();
        }}
      />

      <EditUser
        open={openEdit}
        onClose={handleCloseEdit}
        onEdit={() => {
          handleOpenEditAlert();
          handleRefreshStats();
        }}
      />

      <NotificationAlert
        open={openCreateAlert && status === 'idle' && !isCreating}
        onClose={handleCloseCreateAlert}
        severity="success"
        status="Sucesso"
        message="Usuário criado com sucesso"
      />

      <NotificationAlert
        open={openEditAlert && status === 'idle' && !isUpdating}
        onClose={handleCloseEditAlert}
        severity="success"
        status="Sucesso"
        message="Usuário editado com sucesso"
      />

      <NotificationAlert
        open={openRemoveAlert && status === 'idle' && !isRemoving}
        onClose={handleCloseRemoveAlert}
        severity="success"
        status="Sucesso"
        message="Usuário removido com sucesso"
      />

      <NotificationAlert
        open={openRemoveAlert && status === 'failed' && !isRemoving}
        onClose={handleCloseRemoveAlert}
        severity="error"
        status="Erro"
        message="Não foi possível remover o usuário selecionado"
      />
    </>
  );
}
