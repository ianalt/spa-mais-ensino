import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectCategories } from '../../slices/categoriesSlice';
import { selectUser } from '../../user/userSlice';
import { Role } from '../../utils/enums/role.enum';
import { BasicCategoryInfo } from '../manage/tables/subjects-table/types/subject';

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

  const user = useAppSelector(selectUser);
  const { role } = user;

  const handleRemoveCategory = () => {
    onRemoveRequest();
  };

  const handleEditCategory = () => {
    onEditRequest();
  };
  return (
    <Grid item p={1}>
      <Card sx={{ maxWidth: 300 }}>
        <CardContent>
          <CardMedia
            sx={{ objectFit: 'contain' }}
            component="img"
            height="140"
            image="/undraw_book_lover_re_rwjy.svg"
            alt="pessoa com livro"
          />
          <Typography gutterBottom variant="h5" textAlign="center">
            {category.name}
          </Typography>
        </CardContent>

        {role === Role.PROFESSOR && (
          <CardActions>
            <Grid container justifyContent="space-between">
              <Grid item p={1}>
                <Tooltip title="Remover categoria" arrow>
                  <span>
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={handleRemoveCategory}
                      disabled={status === 'loading'}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Grid>

              <Grid item p={1}>
                <Tooltip title="Editar categoria" arrow>
                  <span>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={handleEditCategory}
                    >
                      <EditIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Grid>
            </Grid>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}
