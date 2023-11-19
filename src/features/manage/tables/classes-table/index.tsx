import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Fab, Grid, LinearProgress, Tooltip, Typography } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';
import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ptBrTableLocalization } from '../../../../utils/pt-br-table-localization';
import {
  getClassesList,
  getIsLoading,
  resetSelected,
  selectClassesTable,
} from './classesTableSlice';

export default function ClassesTable() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const classesTable = useAppSelector(selectClassesTable);
  const { list } = classesTable;
  const isLoading = useAppSelector(getIsLoading);

  const handleOpenClass = (classId: number) => {
    navigate(`/mais-ensino/aula/${classId}`);
  };

  const handleOpenCreate = () => {
    navigate('/mais-ensino/gerenciamento/nova-aula');
  };

  const handleRefreshClasses = () => {
    dispatch(getClassesList());
  };

  useEffect(() => {
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
                      aria-label="refresh-classes"
                      onClick={handleRefreshClasses}
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
                    icon: 'search',
                    tooltip: 'Detalhes',
                    onClick: async () => {
                      handleOpenClass(rowData.id);
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
    </>
  );
}
