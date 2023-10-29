import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import cloneDeep from 'lodash/cloneDeep';
import MaterialTable from 'material-table';
import { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ptBrTableLocalization } from '../../../../utils/pt-br-table-localization';
import {
  getClassesList,
  getIsLoading,
  resetSelected,
  selectClassesTable,
  setSelected,
} from './classesTableSlice';
import ClassDetails from './dialogs/class-details';
import { Fab, Grid, LinearProgress, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ClassesTable() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const classesTable = useAppSelector(selectClassesTable);
  const { list } = classesTable;
  const isLoading = useAppSelector(getIsLoading);

  const [openDetails, setOpenDetails] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

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
    navigate('/mais-ensino/gerenciamento/nova-aula');
  };

  const handleRefreshUsers = () => {
    dispatch(getClassesList());
  };

  useEffect(() => {
    handleCloseDetails();
    handleCloseEdit();
    handleCloseRemove();

    dispatch(resetSelected());
    dispatch(getClassesList());
  }, []);

  return (
    <>
      <Grid container>
        {isLoading ? (
          <Grid item xs={12} mt={3}>
            <LinearProgress />
          </Grid>
        ) : (
          <>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Typography variant="h4">Lista de aulas</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container justifyContent="flex-end" my={1}>
              <Grid item xs="auto" mx={1}>
                <Tooltip title="Criar nova aula">
                  <span>
                    <Fab
                      color="primary"
                      aria-label="create-class"
                      onClick={handleOpenCreate}
                      disabled={isLoading}
                    >
                      <AddIcon />
                    </Fab>
                  </span>
                </Tooltip>
              </Grid>

              <Grid item xs="auto" mx={1}>
                <Tooltip title="Atualizar dados">
                  <span>
                    <Fab
                      color="primary"
                      aria-label="refresh-users"
                      onClick={handleRefreshUsers}
                      disabled={isLoading}
                    >
                      <RefreshIcon />
                    </Fab>
                  </span>
                </Tooltip>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <MaterialTable
                localization={ptBrTableLocalization}
                options={{
                  search: true,
                  filtering: true,
                  exportButton: true,
                  grouping: true,
                }}
                actions={[
                  (rowData) => ({
                    icon: 'delete',
                    tooltip: 'Remover',

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
                    tooltip: 'Editar',

                    onClick: () => {
                      dispatch(setSelected(rowData));
                      handleOpenEdit();
                    },
                  }),
                ]}
                columns={[
                  { title: 'Título', field: 'title', defaultSort: 'asc' },
                  { title: 'Categoria', field: 'category.name' },
                  { title: 'Disciplina', field: 'category.subject.name' },
                  { title: 'Aula ativa?', field: 'active', type: 'boolean' },
                ]}
                data={cloneDeep(list)}
                title=""
              />
            </Grid>
          </>
        )}
      </Grid>
      <ClassDetails open={openDetails} onClose={() => setOpenDetails(false)} />
    </>
  );
}
