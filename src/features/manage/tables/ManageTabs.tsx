import { Box, CircularProgress, Tab } from '@mui/material';
import { useState, useEffect, SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import CategoriesTable from './categories-table';
import {
  selectCategoriesTable,
  getCategoriesList,
} from './categories-table/categoriesTableSlice';
import KnowledgeAreasTable from './knowledge-areas-table';
import {
  selectKnowledgeAreasTable,
  getKnowledgeAreasList,
} from './knowledge-areas-table/knowledgeAreasTableSlice';
import SubjectsTable from './subjects-table';
import {
  selectSubjectsTable,
  getSubjectsList,
} from './subjects-table/subjectsTableSlice';
import TopicsTable from './topics-table';
import {
  selectTopicsTable,
  getTopicsList,
} from './topics-table/topicsTableSlice';
import UsersTable from './users-table';
import { selectUsersTable, getUsersList } from './users-table/usersTableSlice';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function ManageTabs() {
  const dispatch = useAppDispatch();
  const usersTable = useAppSelector(selectUsersTable);
  const knowledgeAreasTable = useAppSelector(selectKnowledgeAreasTable);
  const subjectsTable = useAppSelector(selectSubjectsTable);
  const categoriesTable = useAppSelector(selectCategoriesTable);
  const topicsTable = useAppSelector(selectTopicsTable);
  const [value, setValue] = useState('1');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getKnowledgeAreasList());
    dispatch(getSubjectsList());
    dispatch(getCategoriesList());
    dispatch(getTopicsList());
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
          <UsersTable />
        </TabPanel>
        <TabPanel value="2">
          <KnowledgeAreasTable />
        </TabPanel>
        <TabPanel value="3">
          <SubjectsTable />
        </TabPanel>
        <TabPanel value="4">
          <CategoriesTable />
        </TabPanel>
        <TabPanel value="5">
          <TopicsTable />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
