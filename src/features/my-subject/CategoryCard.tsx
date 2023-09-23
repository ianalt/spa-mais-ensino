import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { BasicCategoryInfo } from '../manage/tables/subjects-table/types/subject';

interface CategoryCardProps {
  category: BasicCategoryInfo;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const handleRemoveCategory = () => {
    dispatchEvent(openRemoveCategory());
  };

  const handleEditCategory = () => {
    dispatchEvent(openEditCategory());
  };
  return (
    <Grid item p={1}>
      <Card sx={{ maxWidth: 325 }}>
        <CardActionArea onClick={() => alert('expandir categoria')}>
          <CardMedia
            sx={{ objectFit: 'contain' }}
            component="img"
            height="140"
            image="/undraw_book_lover_re_rwjy.svg"
            alt="pessoa com livro"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {category.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              recusandae minima similique rerum non ratione labore officia
              totam. Neque consequatur debitis excepturi blanditiis ullam quidem
              facilis! Magni nihil ad optio!
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Grid container justifyContent="flex-end">
            <Grid item p={1}>
              <Fab
                size="small"
                color="secondary"
                onClick={handleRemoveCategory}
              >
                <DeleteIcon />
              </Fab>
            </Grid>

            <Grid item p={1}>
              <Fab
                sx={{ borderRadius: 28 }}
                size="small"
                color="primary"
                onClick={handleEditCategory}
              >
                <EditIcon />
              </Fab>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
