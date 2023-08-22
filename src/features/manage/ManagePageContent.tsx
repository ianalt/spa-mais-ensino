import { Grid, Typography } from '@mui/material';

export default function ManagePageContent() {
  return (
    <Grid item xs={12} container mt={5}>
      <Grid item xs={6} container alignContent="center" p={2}>
        <Typography variant="h3">Gerenciamento</Typography>
        <Typography variant="body1">
          Aqui, administradores são capazes de gerenciar o{' '}
          <strong>conteúdo</strong> da plataforma <strong>+Ensino</strong>, bem
          como consultar <strong>estatísticas</strong> sobre acesso dos
          estudantes, total de <strong>tópicos publicados</strong> e comentários
          por aula, além de <strong>designar</strong>{' '}
          <strong>professores</strong> e <strong>monitores</strong> para suas
          respectivas <strong>disciplinas</strong>.
        </Typography>
      </Grid>
      <Grid item xs={6} p={4}>
        <img
          src="/undraw_server_status_re_n8ln.svg"
          alt="Imagem"
          width="100%"
        />
      </Grid>
    </Grid>
  );
}
