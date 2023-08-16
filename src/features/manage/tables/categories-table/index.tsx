import cloneDeep from 'lodash/cloneDeep';
import MaterialTable from 'material-table';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCategoriesTable, setSelected } from './categoriesTableSlice';
import CategoryDetails from './dialogs/category-details';
import { ptBrTableLocalization } from '../../../../utils/pt-br-table-localization';

export default function CategoriesTable() {
  const dispatch = useAppDispatch();
  const categoriesTable = useAppSelector(selectCategoriesTable);

  const [openDetails, setOpenDetails] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
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

      <CategoryDetails
        open={openDetails}
        onClose={() => setOpenDetails(false)}
      />
    </>
  );
}
