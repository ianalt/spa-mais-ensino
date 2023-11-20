import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { RecentClassInfo } from '../manage/tables/classes-table/types/recent-class-info';
import { useNavigate } from 'react-router-dom';

interface RecentClassCardProps {
  recentClass: RecentClassInfo;
}

export default function RecentClassCard({ recentClass }: RecentClassCardProps) {
  const navigate = useNavigate();
  const { id, title, category, createdBy } = recentClass;

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
            <Typography variant="body2" color="text.secondary">
              {`${category.name} - ${category.subject.name}`}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              por {`${createdBy.firstName} ${createdBy.lastName} `}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
