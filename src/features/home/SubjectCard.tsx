import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface SubjectCardProps {
  subject: { id: number; name: string };
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const navigate = useNavigate();
  const { id, name } = subject;

  const handleNavigate = () => navigate(`/mais-ensino/disciplina/${id}`);

  return (
    <Grid item xs="auto" p={1} mx={1}>
      <Card sx={{ minWidth: 280, minHeight: 170 }}>
        <CardActionArea onClick={handleNavigate}>
          <CardMedia
            component="img"
            height="130"
            image="/undraw_teacher_re_sico.svg"
            alt="professora organizando arquivos pelo notebook"
            sx={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign="center"
            >
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
