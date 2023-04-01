import MaterialTable from "material-table";
import { usersTable } from "../../../../utils/constants";
import { User } from "./types/user";

import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";

const actions = [{ icon: <AddIcon />, name: "Adicionar" }];

function BasicSpeedDial() {
  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 25, right: 25 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <React.Fragment>
      {" "}
      <MaterialTable
        options={{ search: true }}
        actions={[
          {
            icon: "delete",
            tooltip: "Remover",
            onClick: (event, rowData: any) => {},
          },
          {
            icon: "edit",
            tooltip: "Editar",
            onClick: (event, rowData: any) => {},
          },
          {
            icon: "search",
            tooltip: "Detalhes",
            onClick: (event, rowData: any) => {},
          },
        ]}
        columns={[
          { title: "Nome", field: "firstName" },
          { title: "Sobrenome(s)", field: "lastName" },
          { title: "E-mail", field: "email" },
          { title: "Acesso", field: "role" },
        ]}
        data={users}
        title="Lista de usuários"
      />{" "}
      <BasicSpeedDial />
    </React.Fragment>
  );
}
