import cloneDeep from 'lodash/cloneDeep';
import MaterialTable from 'material-table';
import { Fragment, useEffect, useState } from 'react';
import {
  getSubjectsList,
  resetSelected,
  selectSubjectsTable,
  setSelected,
} from './subjectsTableSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import SubjectDetails from './dialogs/subject-details';

export default function SubjectsTable() {
  const dispatch = useAppDispatch();
  const subjectsTable = useAppSelector(selectSubjectsTable);

  const [openDetails, setOpenDetails] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
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
    dispatch(getSubjectsList());
  }, []);

  return (
    <Fragment>
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
            title: 'Ativa?',
            field: 'active',
            type: 'boolean',
          },
        ]}
        data={cloneDeep(subjectsTable.list)}
        title="Lista de disciplinas"
      />

      <SubjectDetails open={openDetails} onClose={handleCloseDetails} />

      {/* <EditSubject
        open={openEdit}
        onClose={handleCloseEdit}
      /> */}
    </Fragment>
  );
}
