import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BasicClassInfo } from '../manage/tables/subjects-table/types/subject';

interface ClassCardProps {
  oneClass: BasicClassInfo;
}

export default function ClassCard({ oneClass }: ClassCardProps) {
  const navigate = useNavigate();
  const { id, title } = oneClass;

  const handleNavigate = () => navigate(`/mais-ensino/aula/${id}`);

  return (
    <Grid item xs="auto" p={1} mx={1}>
      <Card sx={{ maxWidth: 380, maxHeight: 270 }}>
        <CardActionArea onClick={handleNavigate}>
          <CardMedia
            component="img"
            height="130"
            image="/undraw_youtube_tutorial_re_69qc.svg"
            alt="estudante assistindo a uma videoaula"
            sx={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
