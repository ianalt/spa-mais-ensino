import { Grid, Typography } from '@mui/material';

export default function NoSubjectAssigned() {
  return (
    <Grid item xs={12} container justifyContent="center" p={1}>
      <Grid item xs={'auto'}>
        <img
          src="/undraw_pending_approval_xuu9.svg"
          alt="Imagem"
          width="100%"
          height="350"
        />
      </Grid>
      <Grid item xs={3} container alignContent="center" textAlign="start">
        <Grid item xs={12}>
          <Typography variant="body1">
            No momento, você <strong>não pertence</strong> a uma disciplina do{' '}
            <strong>+Ensino</strong>. Caso seja algo inesperado, entre em
            contato com o <strong>suporte técnico</strong> da plataforma.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
