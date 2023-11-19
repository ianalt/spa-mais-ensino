import { Box, Grid, Typography } from '@mui/material';

export default function CreateClassPageContent() {
  return (
    <Grid item xs={12} container mt={5}>
      <Grid item xs={6} container justifyContent="center" p={4}>
        <Box width="70%" height="40%">
          <img
            src="/undraw_tutorial_video_re_wepc.svg"
            alt="Imagem"
            width="100%"
          />
        </Box>
      </Grid>
      <Grid item xs={6} container alignContent="center" p={2}>
        <Typography variant="h3">Criar nova aula</Typography>
        <Typography variant="body1">
          Forneça um <strong>título</strong> e um <strong>vídeo</strong> para a
          nova aula, além de <strong>materiais complementares</strong> para
          estudo, caso necessário. Não esqueça de confirmar todos os dados antes
          de prosseguir clicando em <strong>Criar Aula</strong>.
        </Typography>
      </Grid>
    </Grid>
  );
}
