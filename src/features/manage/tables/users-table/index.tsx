import * as _ from 'lodash';
import MaterialTable from 'material-table';
import { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  getIsLoading,
  getUsersList,
  resetSelected,
  selectUsersTable,
  setSelected,
} from './usersTableSlice';
import UserDetails from './dialogs/user-details';
import { Box, Fab, Grid, LinearProgress, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateUser from './dialogs/create-user';
import NotificationAlert from '../../../notification-alert';
import { selectUser } from '../../../../user/userSlice';
import RemoveUser from './dialogs/remove-user';
import EditUser from './dialogs/edit-user';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartToolTip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const testData = [
  {
    name: 'Amarela',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Branca',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Indígena',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Parda',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Preta',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
];

export default function UsersTable() {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectUser);
  const { id } = currentUser;

  const usersTable = useAppSelector(selectUsersTable);
  const { list, selected, status, isCreating, isRemoving, isUpdating } =
    usersTable;
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

  useEffect(() => {
    handleCloseDetails();
    handleCloseCreate();
    handleCloseEdit();
    handleCloseRemove();

    dispatch(resetSelected());
    dispatch(getUsersList());
  }, []);

  return (
    <>
      {isLoading ? (
        <Box mt={3}>
          <LinearProgress />
        </Box>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <MaterialTable
              options={{ search: true, filtering: true }}
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
                { title: 'Acesso', field: 'role' },
                { title: 'Ativo?', field: 'active', type: 'boolean' },
              ]}
              data={_.cloneDeep(list)}
              title="Lista de usuários"
            />
          </Grid>
        </Grid>
      )}
      <Grid container justifyContent="flex-end" mt={2}>
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

      {/* //TODO gráficos */}
      {/* //TODO etnia  */}
      {/* //TODO gênero */}
      {/* //TODO total de membros em residência */}
      {/* //TODO renda familiar */}
      {/* //TODO nível de escolaridade */}

      <Grid container>
        <Grid item xs={12}>
          <BarChart
            width={700}
            height={300}
            data={testData}
            title="Total de usuários (etnia)"
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
            <ChartToolTip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </Grid>
      </Grid>

      <UserDetails open={openDetails} onClose={handleCloseDetails} />

      <CreateUser
        open={openCreate}
        onClose={handleCloseCreate}
        onCreate={handleOpenCreateAlert}
      />

      <RemoveUser
        open={openRemove}
        onClose={handleCloseRemove}
        onRemove={handleOpenRemoveAlert}
      />

      <EditUser
        open={openEdit}
        onClose={handleCloseEdit}
        onEdit={handleOpenEditAlert}
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
