import { Divider, Grid, Typography } from '@mui/material';
import { FullCategoryInfo } from '../manage/tables/subjects-table/types/subject';
import ClassCard from './ClassCard';

interface CategoryItemProps {
  category: FullCategoryInfo;
}

export default function CategoryItem({ category }: CategoryItemProps) {
  const { name, classes } = category;

  return (
    <Grid item xs={12} container m={1}>
      <Grid item xs={12} container>
        <Grid item xs={12}>
          <Typography variant="h5">{name}</Typography>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>

      <Grid item xs={12} py={1}>
        <Divider />
      </Grid>

      <Grid item xs={12} container justifyContent={'flex-start'}>
        {category.classes && classes.length > 0 ? (
          classes.map((oneClass) => {
            return (
              <ClassCard key={`class-${oneClass.id}`} oneClass={oneClass} />
            );
          })
        ) : (
          <Grid item xs={12}>
            <Typography textAlign="start">
              <em>Esta categoria não possui aulas no momento.</em>
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
