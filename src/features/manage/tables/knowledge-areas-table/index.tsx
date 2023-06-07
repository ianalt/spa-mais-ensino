import AddIcon from '@mui/icons-material/Add';
import cloneDeep from 'lodash/cloneDeep';
import MaterialTable from 'material-table';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import KnowledgeAreaDetails from './dialogs/knowledge-area-details';
import {
  selectKnowledgeAreasTable,
  setSelected,
} from './knowledgeAreasTableSlice';
import { Fab, Grid, Tooltip, Typography } from '@mui/material';

export default function KnowledgeAreasTable() {
  const dispatch = useAppDispatch();
  const knowledgeAreasTable = useAppSelector(selectKnowledgeAreasTable);

  const [openDetails, setOpenDetails] = useState(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [openCreateAlert, setOpenCreateAlert] = useState<boolean>(false);

  const handleOpenDetails = () => setOpenDetails(true);
  const handlCloseDetails = () => setOpenDetails(false);

  const handleOpenCreate = () => setOpenCreate(true);
  const handlCloseCreate = () => setOpenCreate(false);

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
        <KnowledgeAreaDetails open={openDetails} onClose={handlCloseDetails} />

        {/* <CreateKnowledgeArea
          open={openCreate}
          onClose={handleCloseCreate}
          onCreate={() => {
            handleOpenCreateAlert();
          }}
        /> */}
      </Grid>
    </>
  );
}
