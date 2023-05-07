import * as _ from 'lodash';
import MaterialTable from 'material-table';
import { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectUsersTable, setSelected } from './usersTableSlice';
import UserDetails from './dialogs/user-details';
import { Box, Fab, Grid, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateUser from './dialogs/create-user';

export default function UsersTable() {
  const dispatch = useAppDispatch();
  const usersTable = useAppSelector(selectUsersTable);

  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
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

  return (
    <>
      <UserDetails open={openDetails} onClose={handleCloseDetails} />

      <CreateUser open={openCreate} onClose={handleCloseCreate} />

      <Grid container>
        <Grid item xs={12}>
          <MaterialTable
            options={{ search: true, filtering: true }}
            actions={[
              (rowData) => ({
                icon: 'delete',
                tooltip:
                  rowData.role === 'admin'
                    ? 'Administradores não podem remover outros administradores'
                    : 'Remover',
                disabled: rowData.role === 'admin',
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
                },
              }),
              (rowData) => ({
                icon: 'edit',
                tooltip:
                  rowData.role === 'admin'
                    ? 'Administradores não podem editar informações de outros administradores'
                    : 'Editar',
                disabled: rowData.role === 'admin',
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
            data={_.cloneDeep(usersTable.list)}
            title="Lista de usuários"
          />
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end" mt={2}>
          <Tooltip title="Criar novo usuário">
            <Fab
              color="primary"
              aria-label="create-user"
              onClick={handleOpenCreate}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}
