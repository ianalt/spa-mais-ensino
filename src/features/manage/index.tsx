import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import KnowledgeAreasTable from './tables/knowledge-areas-table';
import {
  getKnowledgeAreasList,
  selectKnowledgeAreasTable,
} from './tables/knowledge-areas-table/knowledgeAreasTableSlice';
import SubjectsTable from './tables/subjects-table';
import {
  getSubjectsList,
  selectSubjectsTable,
} from './tables/subjects-table/subjectsTableSlice';
import UsersTable from './tables/users-table';
import {
  getUsersList,
  selectUsersTable,
} from './tables/users-table/usersTableSlice';
import CategoriesTable from './tables/categories-table';
import {
  getCategoriesList,
  selectCategoriesTable,
} from './tables/categories-table/categoriesTableSlice';

export default function ManagePage() {
  const dispatch = useAppDispatch();
  const usersTable = useAppSelector(selectUsersTable);
  const knowledgeAreasTable = useAppSelector(selectKnowledgeAreasTable);
  const subjectsTable = useAppSelector(selectSubjectsTable);
  const categoriesTable = useAppSelector(selectCategoriesTable);
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    dispatch(getUsersList());
    dispatch(getKnowledgeAreasList());
    dispatch(getSubjectsList());
    dispatch(getCategoriesList());
  }, []);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Abas de gerenciamento">
            <Tab label="Usuários" value="1" />
            <Tab label="Áreas de Conhecimento" value="2" />
            <Tab label="Disciplinas" value="3" />
            <Tab label="Categorias" value="4" />
            <Tab label="Tópicos" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {usersTable.status === 'loading' ? (
            <CircularProgress />
          ) : (
            <UsersTable />
          )}
        </TabPanel>
        <TabPanel value="2">
          {knowledgeAreasTable.status === 'loading' ? (
            <CircularProgress />
          ) : (
            <KnowledgeAreasTable />
          )}
        </TabPanel>
        <TabPanel value="3">
          {subjectsTable.status === 'loading' ? (
            <CircularProgress />
          ) : (
            <SubjectsTable />
          )}
        </TabPanel>
        <TabPanel value="4">
          {' '}
          {categoriesTable.status === 'loading' ? (
            <CircularProgress />
          ) : (
            <CategoriesTable />
          )}
        </TabPanel>
        <TabPanel value="5">Tópicos</TabPanel>
      </TabContext>
    </Box>
  );
}
