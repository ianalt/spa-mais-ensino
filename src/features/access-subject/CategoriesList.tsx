import { Divider, Grid, LinearProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getKnowledgeAreas,
  selectKnowledgeAreas,
} from '../../slices/knowledgeAreasSlice';
import { getSubject, selectSubjects } from '../../slices/subjectsSlice';
import { useParams } from 'react-router-dom';

export default function CategoriesList() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const subjectId = params.subjectId ? parseInt(params.subjectId) : 0;

  const subjects = useAppSelector(selectSubjects);

  const { openedSubject } = subjects;

  return (
    <>
      {subjects.status === 'loading' ? (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      ) : (
        <Grid item xs={12} container my={1}>
          <Grid item xs={12}>
            <Typography variant="h4">Categorias:</Typography>
          </Grid>

          <Grid item xs={12} py={1}>
            <Divider />
          </Grid>

          <Grid item xs={12} container justifyContent={'flex-start'}>
            {openedSubject &&
            openedSubject.categories &&
            openedSubject.categories.length > 0 ? (
              openedSubject.categories.map((category) => {
                return (
                  //   <CategoryItem
                  //     key={`category-${category.id}`}
                  //     category={category}
                  //   />
                  JSON.stringify(category)
                );
              })
            ) : (
              <Grid item xs={12}>
                <Typography textAlign="start">
                  <em>Esta disciplina não possui categorias no momento.</em>
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
}
