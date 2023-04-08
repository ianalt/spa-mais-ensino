import * as _ from 'lodash';
import MaterialTable from 'material-table';
import { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCategoriesTable, setSelected } from './categoriesTableSlice';
import CategoryDetails from './dialogs/category-details';

export default function CategoriesTable() {
  const dispatch = useAppDispatch();
  const categoriesTable = useAppSelector(selectCategoriesTable);

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
        data={_.cloneDeep(categoriesTable.list)}
        title="Lista de Categorias"
      />
      <CategoryDetails
        open={openDetails}
        onClose={() => setOpenDetails(false)}
      />
    </Fragment>
  );
}
