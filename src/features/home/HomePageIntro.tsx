import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../user/userSlice';

export default function HomePageIntro() {
  const user = useAppSelector(selectUser);

  return (
    <Grid item xs={12} container mt={5}>
      <Grid item xs={7} p={2}>
        <img
          src="/undraw_brainstorming_re_1lmw.svg"
          alt="Imagem"
          width="100%"
          height="350"
        />
      </Grid>
      <Grid item xs={5} container alignContent="center" textAlign="start" p={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Olá, {user.profile?.firstName}!</Typography>
          <Typography variant="body1">
            <strong>Bons estudos!</strong> Aqui você encontra as aulas mais
            recentes postadas no <strong>+Ensino</strong>. Você também pode
            encontrar as aulas navagando pelas seções de disciplinas, agrupadas
            por suas respectivas <strong>áreas de conhecimento</strong>.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
