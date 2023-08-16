import * as _ from 'lodash';
import MaterialTable from 'material-table';
import { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ptBrTableLocalization } from '../../../../utils/pt-br-table-localization';
import TopicDetails from './dialogs/topic-details';
import { selectTopicsTable, setSelected } from './topicsTableSlice';

export default function TopicsTable() {
  const dispatch = useAppDispatch();
  const topicsTable = useAppSelector(selectTopicsTable);

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
        data={_.cloneDeep(topicsTable.list)}
        title="Lista de tópicos"
      />
      <TopicDetails open={openDetails} onClose={() => setOpenDetails(false)} />
    </Fragment>
  );
}
