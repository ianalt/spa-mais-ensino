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
  Tooltip,
  Typography,
} from '@mui/material';
import { BasicCategoryInfo } from '../manage/tables/subjects-table/types/subject';
import { selectCategories } from '../../slices/categoriesSlice';
import { useAppSelector } from '../../app/hooks';

interface CategoryCardProps {
  category: BasicCategoryInfo;
  onRemoveRequest: any;
  onEditRequest: any;
}

export default function CategoryCard({
  category,
  onRemoveRequest,
  onEditRequest,
}: CategoryCardProps) {
  const categories = useAppSelector(selectCategories);
  const { status } = categories;

  const handleRemoveCategory = () => {
    onRemoveRequest();
  };

  const handleEditCategory = () => {
    onEditRequest();
  };
  return (
    <Grid item p={1}>
      <Card sx={{ maxWidth: 300 }}>
        <CardActionArea onClick={() => alert('expandir categoria')}>
          <CardMedia
            sx={{ objectFit: 'contain' }}
            component="img"
            height="140"
            image="/undraw_book_lover_re_rwjy.svg"
            alt="pessoa com livro"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" textAlign="center">
              {category.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Grid container justifyContent="space-between">
            <Grid item p={1}>
              <Tooltip title="Remover categoria" arrow>
                <span>
                  <Fab
                    size="small"
                    color="secondary"
                    onClick={handleRemoveCategory}
                    disabled={status === 'loading'}
                  >
                    <DeleteIcon />
                  </Fab>
                </span>
              </Tooltip>
            </Grid>

            <Grid item p={1}>
              <Tooltip title="Editar categoria" arrow>
                <span>
                  <Fab
                    sx={{ borderRadius: 28 }}
                    size="small"
                    color="primary"
                    onClick={handleEditCategory}
                  >
                    <EditIcon />
                  </Fab>
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
