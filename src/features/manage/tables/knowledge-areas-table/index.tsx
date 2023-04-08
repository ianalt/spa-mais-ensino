import * as _ from 'lodash';
import MaterialTable from 'material-table';
import { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import KnowledgeAreaDetails from './dialogs/knowledge-area-details';
import {
  selectKnowledgeAreasTable,
  setSelected,
} from './knowledgeAreasTableSlice';

export default function KnowledgeAreasTable() {
  const dispatch = useAppDispatch();
  const knowledgeAreasTable = useAppSelector(selectKnowledgeAreasTable);

  const [openDetails, setOpenDetails] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <Fragment>
      <MaterialTable
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
          { title: 'Nome', field: 'name', defaultSort: 'asc' },
          { title: 'Descrição', field: 'description' },
          {
            title: 'Ativa?',
            field: 'active',
            type: 'boolean',
          },
        ]}
        data={_.cloneDeep(knowledgeAreasTable.list)}
        title="Lista de áreas de conhecimento"
      />
      <KnowledgeAreaDetails
        open={openDetails}
        onClose={() => setOpenDetails(false)}
      />
    </Fragment>
  );
}
