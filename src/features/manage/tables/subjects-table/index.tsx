import AddIcon from '@mui/icons-material/Add';
import { Fab, Grid, Tooltip, Typography } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';
import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ptBrTableLocalization } from '../../../../utils/pt-br-table-localization';
import NotificationAlert from '../../../notification-alert';
import AddSubject from './dialogs/add-subject';
import EditSubject from './dialogs/edit-subject';
import RemoveSubject from './dialogs/remove-subject';
import SubjectDetails from './dialogs/subject-details';
import {
  getSubjectsList,
  resetSelected,
  selectSubjectsTable,
  setSelected,
} from './subjectsTableSlice';

export default function SubjectsTable() {
  const dispatch = useAppDispatch();
  const subjectsTable = useAppSelector(selectSubjectsTable);

  const { status, isCreating, isRemoving, isUpdating } = subjectsTable;

  const [openDetails, setOpenDetails] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [openAddAlert, setOpenAddAlert] = useState<boolean>(false);
  const [openRemoveAlert, setOpenRemoveAlert] = useState<boolean>(false);
  const [openEditAlert, setOpenEditAlert] = useState<boolean>(false);

  const handleOpenDetails = () => setOpenDetails(true);
  const handleCloseDetails = () => setOpenDetails(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenAddAlert = () => setOpenAddAlert(true);
  const handleCloseAddAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAddAlert(false);
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
    handleCloseAdd();

    dispatch(resetSelected());
    dispatch(getSubjectsList());
  }, []);

  return (
    <>
      <Grid item xs={12} container>
        <Grid item xs={12}>
          <Typography variant="h4">Lista de disciplinas</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end" my={1}>
        <Tooltip title="Criar nova disciplina">
          <span>
            <Fab
              color="primary"
              aria-label="create-subject"
              onClick={handleOpenAdd}
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
            grouping: true,
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
            { title: 'Área de conhecimento', field: 'knowledgeArea.name' },
            {
              title: 'Ativa?',
              field: 'active',
              type: 'boolean',
            },
          ]}
          data={cloneDeep(subjectsTable.list)}
          title=""
        />
      </Grid>

      <SubjectDetails open={openDetails} onClose={handleCloseDetails} />

      <AddSubject
        open={openAdd}
        onAdd={() => {
          handleOpenAddAlert();
          dispatch(getSubjectsList());
        }}
        onClose={handleCloseAdd}
      />

      <RemoveSubject
        open={openRemove}
        onClose={handleCloseRemove}
        onRemove={handleOpenRemoveAlert}
      />

      <EditSubject
        open={openEdit}
        onClose={handleCloseEdit}
        onEdit={handleOpenEditAlert}
      />

      <NotificationAlert
        open={openAddAlert && status === 'idle' && !isCreating}
        onClose={handleCloseAddAlert}
        severity="success"
        status="Sucesso"
        message="Disciplina criada com sucesso"
      />

      <NotificationAlert
        open={openEditAlert && status === 'idle' && !isUpdating}
        onClose={handleCloseEditAlert}
        severity="success"
        status="Sucesso"
        message="Disciplina editada com sucesso"
      />

      <NotificationAlert
        open={openRemoveAlert && status === 'idle' && !isRemoving}
        onClose={handleCloseRemoveAlert}
        severity="success"
        status="Sucesso"
        message="Disciplina removida com sucesso"
      />

      <NotificationAlert
        open={openRemoveAlert && status === 'failed' && !isRemoving}
        onClose={handleCloseRemoveAlert}
        severity="error"
        status="Erro"
        message="Não foi possível remover a disciplina selecionada"
      />
    </>
  );
}
