import { Grid, Typography } from '@mui/material';

export default function MySubjectPageContent() {
  return (
    <Grid item xs={12} container mt={5}>
      <Grid item xs={5} container alignContent="center" textAlign="end" p={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Minha Disciplina</Typography>
          <Typography variant="body1">
            Aqui, você pode conferir tudo sobre a <strong>disciplina</strong> da
            qual você é <strong>responsável</strong>. Verifique e gerencie as{' '}
            <strong>categorias</strong> de estudo e <strong>tópicos</strong>,
            bem como informações sobre total de <strong>comentários</strong>{' '}
            presentes em cada aula.
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={7} p={2}>
        <img
          src="/undraw_educator_re_ju47.svg"
          alt="Imagem"
          width="100%"
          height="350"
        />
      </Grid>
    </Grid>
  );
}
