import * as _ from "lodash";
import MaterialTable from "material-table";
import { Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectUsersTable, setSelected } from "./usersTableSlice";
import UserDetails from "./dialogs/user-details";
import { Box } from "@mui/material";

export default function UsersTable() {
  const dispatch = useAppDispatch();
  const usersTable = useAppSelector(selectUsersTable);

  const [openDetails, setOpenDetails] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <Fragment>
      <MaterialTable
        options={{ search: true }}
        actions={[
          (rowData) => ({
            icon: "delete",
            tooltip:
              rowData.role === "admin"
                ? "Administradores não podem remover outros administradores"
                : "Remover",
            disabled: rowData.role === "admin",
            onClick: (event) => {
              dispatch(setSelected(rowData));
            },
          }),
          (rowData) => ({
            icon: "edit",
            tooltip:
              rowData.role === "admin"
                ? "Administradores não podem editar informações de outros administradores"
                : "Editar",
            disabled: rowData.role === "admin",
            onClick: (event) => {
              dispatch(setSelected(rowData));
            },
          }),
          (rowData) => ({
            icon: "search",
            tooltip: "Detalhes",
            onClick: (event) => {
              dispatch(setSelected(rowData));
              setOpenDetails(true);
            },
          }),
        ]}
        columns={[
          { title: "Nome", field: "firstName" },
          { title: "Sobrenome(s)", field: "lastName" },
          { title: "E-mail", field: "email" },
          { title: "Acesso", field: "role" },
        ]}
        data={_.cloneDeep(usersTable.list)}
        title="Lista de usuários"
      />
      <UserDetails open={openDetails} onClose={() => setOpenDetails(false)} />
    </Fragment>
  );
}
