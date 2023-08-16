import AddIcon from '@mui/icons-material/Add';
import { Fab, Grid, Tooltip, Typography } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';
import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ptBrTableLocalization } from '../../../../utils/pt-br-table-localization';
import NotificationAlert from '../../../notification-alert';
import CreateKnowledgeArea from './dialogs/create-knowledge-area';
import EditKnowledgeArea from './dialogs/edit-knowledge-area';
import KnowledgeAreaDetails from './dialogs/knowledge-area-details';
import RemoveKnowledgeArea from './dialogs/remove-knowledge-area';
import {
  getKnowledgeAreasList,
  resetSelected,
  selectKnowledgeAreasTable,
  setSelected,
} from './knowledgeAreasTableSlice';

export default function KnowledgeAreasTable() {
  const dispatch = useAppDispatch();
  const knowledgeAreasTable = useAppSelector(selectKnowledgeAreasTable);
  const { status, isCreating, isRemoving, isUpdating } = knowledgeAreasTable;

  const [openDetails, setOpenDetails] = useState(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [openCreateAlert, setOpenCreateAlert] = useState<boolean>(false);
  const [openRemoveAlert, setOpenRemoveAlert] = useState<boolean>(false);
  const [openEditAlert, setOpenEditAlert] = useState<boolean>(false);

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

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenEditAlert = () => setOpenEditAlert(true);
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
          localization={ptBrTableLocalization}
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
                handleOpenEdit();
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
          onCreate={() => {
            handleOpenCreateAlert();
            dispatch(getKnowledgeAreasList());
          }}
        />

        <RemoveKnowledgeArea
          open={openRemove}
          onClose={handleCloseRemove}
          onRemove={handleOpenRemoveAlert}
        />

        <EditKnowledgeArea
          open={openEdit}
          onClose={handleCloseEdit}
          onEdit={handleOpenEditAlert}
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

        <NotificationAlert
          open={openEditAlert && status === 'idle' && !isUpdating}
          onClose={handleCloseEditAlert}
          severity="success"
          status="Sucesso"
          message="Área de conhecimento editada com sucesso"
        />
      </Grid>
    </>
  );
}
