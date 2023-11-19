import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

export default function RecentClasses() {
  return (
    <Grid item xs={12} container>
      <Grid item xs={12}>
        <Typography variant="h5">Aulas mais recentes</Typography>
      </Grid>

      <Grid item xs={12} py={1}>
        <Divider />
      </Grid>

      <Grid item xs={12} container justifyContent={'flex-start'}>
        <Grid item xs="auto" p={1} mx={1}>
          <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="130"
                image="/undraw_youtube_tutorial_re_69qc.svg"
                alt="estudante assistindo a uma videoaula"
                sx={{ objectFit: 'contain' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lei da Inércia | Leis de Newton (Parte 1)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mecânica - Física
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  por Ian Alt
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
