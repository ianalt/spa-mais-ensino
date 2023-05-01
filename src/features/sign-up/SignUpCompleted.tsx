import { Box, Button, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetSignUp, selectSignUp } from './signUpSlice';

export default function SignUpCompleted() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signUp = useAppSelector(selectSignUp);

  const { accountInfo } = signUp;

  const handleLoginPage = () => {
    navigate('/login');
    dispatch(resetSignUp());
  };

  const handleWelcomePage = () => {
    navigate('/');
    dispatch(resetSignUp());
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Paper
            component={'div'}
            elevation={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid container p={3} justifyContent="center">
              <Grid item xs={12}>
                <img
                  src="/undraw_certification_re_ifll.svg"
                  alt="Imagem"
                  height="375"
                  width="100%"
                />
              </Grid>
              <Grid item xs={12} container justifyContent="center" mb={3}>
                <Typography variant="h3">Concluído!</Typography>
              </Grid>
              <Grid item xs={12} container mb={3}>
                <Grid item xs={12} container justifyContent="center">
                  <Typography variant="h5">
                    {accountInfo?.firstName}, sua conta foi cadastrada com
                    sucesso.
                  </Typography>
                </Grid>

                <Grid item xs={12} container justifyContent="center">
                  <Typography variant="h5">
                    Utilize o e-mail e a senha inseridas durante o processo de
                    cadastro para acessar o <strong>+Ensino</strong>.
                  </Typography>
                </Grid>

                <Grid item xs={12} container justifyContent="center" my={3}>
                  <Typography variant="h4">
                    E-mail: <strong>{accountInfo?.email}</strong>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} container justifyContent="center">
                <Typography variant="h3">Bons estudos!</Typography>
              </Grid>

              <Grid item container justifyContent="space-evenly" m={5}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={handleWelcomePage}
                >
                  <Typography variant="h6">Página Inicial</Typography>
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  onClick={handleLoginPage}
                >
                  <Typography variant="h6">Entrar</Typography>
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
