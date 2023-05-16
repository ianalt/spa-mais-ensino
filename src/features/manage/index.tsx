import { Grid } from '@mui/material';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ManageTabs from './tables/ManageTabs';
import {
  getCategoriesList,
  selectCategoriesTable,
} from './tables/categories-table/categoriesTableSlice';
import {
  getKnowledgeAreasList,
  selectKnowledgeAreasTable,
} from './tables/knowledge-areas-table/knowledgeAreasTableSlice';
import {
  getSubjectsList,
  selectSubjectsTable,
} from './tables/subjects-table/subjectsTableSlice';
import {
  getTopicsList,
  selectTopicsTable,
} from './tables/topics-table/topicsTableSlice';
import {
  getUsersList,
  selectUsersTable,
} from './tables/users-table/usersTableSlice';

export default function ManagePage() {
  const dispatch = useAppDispatch();
  const usersTable = useAppSelector(selectUsersTable);
  const knowledgeAreasTable = useAppSelector(selectKnowledgeAreasTable);
  const subjectsTable = useAppSelector(selectSubjectsTable);
  const categoriesTable = useAppSelector(selectCategoriesTable);
  const topicsTable = useAppSelector(selectTopicsTable);
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    dispatch(getUsersList());
    dispatch(getKnowledgeAreasList());
    dispatch(getSubjectsList());
    dispatch(getCategoriesList());
    dispatch(getTopicsList());
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} container>
        GERENCIAMENTO
      </Grid>
      <Grid item xs={12} container>
        <ManageTabs />
      </Grid>
    </Grid>
  );
}
