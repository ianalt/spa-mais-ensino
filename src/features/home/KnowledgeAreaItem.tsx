import { Divider, Grid, Typography } from '@mui/material';
import { KnowledgeArea } from '../../slices/knowledgeAreasSlice';
import SubjectCard from './SubjectCard';

interface KnowledgeAreaItemProps {
  knowledgeArea: KnowledgeArea;
}

export default function KnowledgeAreaItem({
  knowledgeArea,
}: KnowledgeAreaItemProps) {
  const { name, subjects } = knowledgeArea;
  return (
    <Grid item xs={12} container m={2}>
      <Grid item xs={12}>
        <Typography variant="h5">{name}</Typography>
      </Grid>

      <Grid item xs={12} py={1}>
        <Divider />
      </Grid>

      <Grid item xs={12} container justifyContent={'flex-start'}>
        {subjects.length > 0 ? (
          subjects.map((subject) => {
            return (
              <SubjectCard key={`subject-${subject.id}`} subject={subject} />
            );
          })
        ) : (
          <Grid item xs={12}>
            <Typography textAlign="start">
              <em>
                Esta área de conhecimento não possui disciplinas no momento.
              </em>
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
