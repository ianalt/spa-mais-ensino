import { Grid, Typography } from '@mui/material';
export default function ProfilePageContent() {
  return (
    <Grid item xs={12} container mt={5}>
      <Grid item xs={7} p={2}>
        <img
          src="/undraw_profile_details_re_ch9r.svg"
          alt="Imagem"
          width="100%"
          height="350"
        />
      </Grid>
      <Grid item xs={5} container alignContent="center" p={2}>
        <Typography variant="h3">Meu Perfil</Typography>
        <Typography variant="body1">
          Aqui, você pode conferir os seus <strong>dados</strong> cadastrais.
          Caso queira editar qualquer informação para deixar sua conta{' '}
          <strong>atualizada</strong>, basta clicar na opção{' '}
          <strong>Editar perfil</strong>.
        </Typography>
      </Grid>
    </Grid>
  );
}
