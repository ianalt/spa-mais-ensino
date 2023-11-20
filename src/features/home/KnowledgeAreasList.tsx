import { Divider, Grid, LinearProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getKnowledgeAreas,
  selectKnowledgeAreas,
} from '../../slices/knowledgeAreasSlice';
import KnowledgeAreaItem from './KnowledgeAreaItem';

export default function KnowledgeAreasList() {
  const dispatch = useAppDispatch();
  const knowledgeAreas = useAppSelector(selectKnowledgeAreas);

  const { list } = knowledgeAreas;

  useEffect(() => {
    dispatch(getKnowledgeAreas());
  }, []);

  return (
    <>
      {knowledgeAreas.status === 'loading' ? (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      ) : (
        <Grid item xs={12} container my={1}>
          <Grid item xs={12}>
            <Typography variant="h4">Áreas de conhecimento:</Typography>
          </Grid>

          <Grid item xs={12} py={1}>
            <Divider />
          </Grid>

          <Grid item xs={12} container justifyContent={'flex-start'}>
            {list.map((item) => {
              return (
                <KnowledgeAreaItem
                  key={`knowledge-area-${item.id}`}
                  knowledgeArea={item}
                />
              );
            })}
          </Grid>
        </Grid>
      )}
    </>
  );
}
