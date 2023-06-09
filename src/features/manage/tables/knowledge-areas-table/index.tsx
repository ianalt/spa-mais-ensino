import AddIcon from '@mui/icons-material/Add';
import cloneDeep from 'lodash/cloneDeep';
import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import KnowledgeAreaDetails from './dialogs/knowledge-area-details';
import {
  getKnowledgeAreasList,
  resetSelected,
  selectKnowledgeAreasTable,
  setSelected,
} from './knowledgeAreasTableSlice';
import { Fab, Grid, Tooltip, Typography } from '@mui/material';
import CreateKnowledgeArea from './dialogs/create-knowledge-area';
import NotificationAlert from '../../../notification-alert';
import RemoveKnowledgeArea from './dialogs/remove-knowledge-area';

export default function KnowledgeAreasTable() {
  const dispatch = useAppDispatch();
  const knowledgeAreasTable = useAppSelector(selectKnowledgeAreasTable);
  const { status, isCreating, isRemoving } = knowledgeAreasTable;

  const [openDetails, setOpenDetails] = useState(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [openCreateAlert, setOpenCreateAlert] = useState<boolean>(false);
  const [openRemoveAlert, setOpenRemoveAlert] = useState<boolean>(false);

  const handleOpenDetails = () => setOpenDetails(true);
  const handleCloseDetails = () => setOpenDetails(false);

  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleOpenCreateAlert = () => setOpenCreateAlert(true);
  const handleCloseCreateAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenCreateAlert(false);
  };

  const handleOpenRemove = () => setOpenRemove(true);
  const handleCloseRemove = () => setOpenRemove(false);
  const handleOpenRemoveAlert = () => setOpenRemoveAlert(true);
  const handleCloseRemoveAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenRemoveAlert(false);
  };

  useEffect(() => {
    handleCloseDetails();
    handleCloseCreate();

    dispatch(resetSelected());
    dispatch(getKnowledgeAreasList());
  }, []);

  return (
    <>
      <Grid item xs={12} container>
        <Grid item xs={12}>
          <Typography variant="h4">Lista de áreas de conhecimento</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end" my={1}>
        <Tooltip title="Criar nova área de conhecimento">
          <span>
            <Fab
              color="primary"
              aria-label="create-user"
              onClick={handleOpenCreate}
              // disabled={isLoading}
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
            grouping: {
              placeholder: 'Arraste as colunas para agrupar',
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
          options={{
            search: true,
            filtering: true,
            exportButton: true,
          }}
          actions={[
            (rowData) => ({
              icon: 'delete',
              tooltip: 'Remover',
              onClick: (event) => {
                dispatch(setSelected(rowData));
                handleOpenRemove();
              },
            }),
            (rowData) => ({
              icon: 'edit',
              tooltip: 'Editar',
              onClick: (event) => {
                dispatch(setSelected(rowData));
              },
            }),
            (rowData) => ({
              icon: 'search',
              tooltip: 'Detalhes',
              onClick: (event) => {
                dispatch(setSelected(rowData));
                handleOpenDetails();
              },
            }),
          ]}
          columns={[
            { title: 'Nome', field: 'name', defaultSort: 'asc' },
            { title: 'Descrição', field: 'description' },
            {
              title: 'Área ativa?',
              field: 'active',
              type: 'boolean',
            },
          ]}
          data={cloneDeep(knowledgeAreasTable.list)}
          title=""
        />
        <KnowledgeAreaDetails open={openDetails} onClose={handleCloseDetails} />

        <CreateKnowledgeArea
          open={openCreate}
          onClose={handleCloseCreate}
          onCreate={handleOpenCreateAlert}
        />

        <RemoveKnowledgeArea
          open={openRemove}
          onClose={handleCloseRemove}
          onRemove={handleOpenRemoveAlert}
        />

        <NotificationAlert
          open={openCreateAlert && status === 'idle' && !isCreating}
          onClose={handleCloseCreateAlert}
          severity="success"
          status="Sucesso"
          message="Área de conhecimento criada com sucesso"
        />

        <NotificationAlert
          open={openRemoveAlert && status === 'idle' && !isRemoving}
          onClose={handleCloseRemoveAlert}
          severity="success"
          status="Sucesso"
          message="Área de conhecimento removida com sucesso"
        />

        <NotificationAlert
          open={openRemoveAlert && status === 'failed' && !isRemoving}
          onClose={handleCloseRemoveAlert}
          severity="error"
          status="Erro"
          message="Não foi possível remover a área de conhecimento selecionada"
        />
      </Grid>
    </>
  );
}
