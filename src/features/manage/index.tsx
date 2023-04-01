import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UsersTable from "./tables/users-table";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getUsersList,
  selectUsersTable,
} from "./tables/users-table/usersTableSlice";
import CircularProgress from "@mui/material/CircularProgress";
import * as _ from "lodash";

export default function ManagePage() {
  const dispatch = useAppDispatch();
  const usersTable = useAppSelector(selectUsersTable);
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    dispatch(getUsersList());
  }, []);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Abas de gerenciamento">
            <Tab label="Usuários" value="1" />
            <Tab label="Áreas de Conhecimento" value="2" />
            <Tab label="Disciplinas" value="3" />
            <Tab label="Categorias" value="4" />
            <Tab label="Tópicos" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {usersTable.status === "loading" ? (
            <CircularProgress />
          ) : (
            <UsersTable users={_.cloneDeep(usersTable.list)} />
          )}
        </TabPanel>
        <TabPanel value="2">Áreas de Conhecimento</TabPanel>
        <TabPanel value="3">Disciplinas</TabPanel>
        <TabPanel value="4">Categorias</TabPanel>
        <TabPanel value="5">Tópicos</TabPanel>
      </TabContext>
    </Box>
  );
}
