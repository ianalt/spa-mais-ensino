import AddIcon from '@mui/icons-material/Add';
import { Fab, Grid, Tooltip, Typography } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';
import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ptBrTableLocalization } from '../../../../utils/pt-br-table-localization';
import NotificationAlert from '../../../notification-alert';
import {
  getCategoriesList,
  resetSelected,
  selectCategoriesTable,
  setSelected,
} from './categoriesTableSlice';
import AddCategory from './dialogs/add-category';
import CategoryDetails from './dialogs/category-details';
import EditCategory from './dialogs/edit-category';
import RemoveCategory from './dialogs/remove-category';

export default function CategoriesTable() {
  const dispatch = useAppDispatch();
  const categoriesTable = useAppSelector(selectCategoriesTable);

  const { status, isCreating, isRemoving, isUpdating } = categoriesTable;

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
    dispatch(getCategoriesList());
  }, []);

  return (
    <>
      <Grid item xs={12} container>
        <Grid item xs={12}>
          <Typography variant="h4">Lista de categorias</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} container justifyContent="flex-end" my={1}>
        <Tooltip title="Criar nova categoria">
          <span>
            <Fab
              color="primary"
              aria-label="create-category"
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
            grouping: true,
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
            { title: 'Disciplina', field: 'subject.name' },
            {
              title: 'Ativa?',
              field: 'active',
              type: 'boolean',
            },
          ]}
          data={cloneDeep(categoriesTable.list)}
          title="Lista de Categorias"
        />
      </Grid>

      <CategoryDetails
        open={openDetails}
        onClose={() => setOpenDetails(false)}
      />

      <AddCategory
        open={openAdd}
        onAdd={() => {
          handleOpenAddAlert();
          dispatch(getCategoriesList());
        }}
        onClose={handleCloseAdd}
      />

      <EditCategory
        open={openEdit}
        onEdit={() => {
          handleOpenEditAlert();
          dispatch(getCategoriesList());
        }}
        onClose={handleCloseEdit}
      />

      <RemoveCategory
        open={openRemove}
        onClose={handleCloseRemove}
        onRemove={handleOpenRemoveAlert}
      />

      <NotificationAlert
        open={openAddAlert && status === 'idle' && !isCreating}
        onClose={handleCloseAddAlert}
        severity="success"
        status="Sucesso"
        message="Categoria criada com sucesso"
      />

      <NotificationAlert
        open={openEditAlert && status === 'idle' && !isUpdating}
        onClose={handleCloseEditAlert}
        severity="success"
        status="Sucesso"
        message="Categoria editada com sucesso"
      />

      <NotificationAlert
        open={openRemoveAlert && status === 'idle' && !isRemoving}
        onClose={handleCloseRemoveAlert}
        severity="success"
        status="Sucesso"
        message="Categoria removida com sucesso"
      />

      <NotificationAlert
        open={openRemoveAlert && status === 'failed' && !isRemoving}
        onClose={handleCloseRemoveAlert}
        severity="error"
        status="Erro"
        message="Não foi possível remover a categoria selecionada"
      />
    </>
  );
}
