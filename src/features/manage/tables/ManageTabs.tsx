import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Tab } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import CategoriesTable from './categories-table';
import { getCategoriesList } from './categories-table/categoriesTableSlice';
import TopicsTable from './classes-table';
import { getClassesList } from './classes-table/classesTableSlice';
import KnowledgeAreasTable from './knowledge-areas-table';
import { getKnowledgeAreasList } from './knowledge-areas-table/knowledgeAreasTableSlice';
import SubjectsTable from './subjects-table';
import { getSubjectsList } from './subjects-table/subjectsTableSlice';
import UsersTable from './users-table';

export default function ManageTabs() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('1');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getKnowledgeAreasList());
    dispatch(getSubjectsList());
    dispatch(getCategoriesList());
    dispatch(getClassesList());
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
