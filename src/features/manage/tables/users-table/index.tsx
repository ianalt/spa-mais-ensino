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

export default function UsersTable() {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectUser);
  const { id } = currentUser;

  const usersTable = useAppSelector(selectUsersTable);
  const { list, selected, status, isCreating } = usersTable;
  const isLoading = useAppSelector(getIsLoading);

  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [openCreateAlert, setOpenCreateAlert] = useState<boolean>(false);

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
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

  const handleCloseCreateAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenCreateAlert(false);
  };

  useEffect(() => {
    handleCloseDetails();
    handleCloseCreate();
    handleCloseEdit();
    handleCloseDelete();

    dispatch(resetSelected());
    dispatch(getUsersList());
  }, []);

  return (
    <>
      <UserDetails open={openDetails} onClose={handleCloseDetails} />

      <CreateUser
        open={openCreate}
        onClose={handleCloseCreate}
        onCreate={handleOpenCreateAlert}
      />

      <NotificationAlert
        open={openCreateAlert && status === 'idle' && !isCreating}
        onClose={handleCloseCreateAlert}
        severity="success"
        status="Sucesso"
        message="Usuário criado com sucesso"
      />

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
                  },
                }),
                (rowData) => ({
                  icon: 'search',
                  tooltip: 'Detalhes',
                  onClick: () => {
                    dispatch(setSelected(rowData));
                    setOpenDetails(true);
                    console.log('USUÁRIO = ');
                    console.log(rowData);
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
    </>
  );
}
