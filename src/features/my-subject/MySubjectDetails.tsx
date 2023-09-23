import { CircularProgress, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectSubjects } from '../../slices/subjectsSlice';
import CategoryCard from './CategoryCard';

export default function MySubjectDetails() {
  const subjects = useAppSelector(selectSubjects);
  const { selectedSubject, status } = subjects;

  return (
    <Grid item xs={12} container mt={5}>
      {status === 'loading' ? (
        <Grid item xs={12}>
          <CircularProgress size="large" />
        </Grid>
      ) : (
        <Grid
          container
          item
          xs={12}
          alignContent="center"
          textAlign="start"
          p={2}
        >
          <Grid item xs={12} mb={2}>
            <Typography variant="h4">{selectedSubject?.name}</Typography>
            <Typography variant="h6">
              {selectedSubject?.knowledgeArea.name}
            </Typography>
          </Grid>

          <Grid container justifyContent="space-evenly" item xs={12}>
            {selectedSubject?.categories.map((category) => {
              return (
                <CategoryCard
                  key={`subject-category-${category.id}`}
                  category={category}
                />
              );
            })}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
