import * as _ from 'lodash';
import MaterialTable from 'material-table';
import { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ptBrTableLocalization } from '../../../../utils/pt-br-table-localization';
import { selectClassesTable, setSelected } from './classesTableSlice';
import ClassDetails from './dialogs/class-details';

export default function ClassesTable() {
  const dispatch = useAppDispatch();
  const classesTable = useAppSelector(selectClassesTable);

  const [openDetails, setOpenDetails] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <Fragment>
      <MaterialTable
        localization={ptBrTableLocalization}
        options={{ search: true, filtering: true }}
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
              setOpenDetails(true);
            },
          }),
        ]}
        columns={[
          { title: 'Título', field: 'title', defaultSort: 'asc' },
          {
            title: 'Ativa?',
            field: 'active',
            type: 'boolean',
          },
        ]}
        data={_.cloneDeep(classesTable.list)}
        title="Lista de tópicos"
      />
      <ClassDetails open={openDetails} onClose={() => setOpenDetails(false)} />
    </Fragment>
  );
}
