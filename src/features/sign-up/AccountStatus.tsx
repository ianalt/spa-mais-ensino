import { Button, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSignUp } from './signUpSlice';

export default function AccountStatus() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signUp = useAppSelector(selectSignUp);

  const { status, isLoading, accountStatus } = signUp;

  const handleLoginPage = () => {
    navigate('/login');
  };

  const handleWelcomePage = () => {
    navigate('/');
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ border: '2px solid red' }}
          px={{ xs: 2 }}
          width="100%"
          height="100%"
        >
          <Grid item xs={'auto'} sx={{ border: '2px solid blue' }}>
            <Paper
              component={'div'}
              elevation={1}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Grid item container xs={12}>
                <Grid item container xs={12}>
                  <Grid item xs={12} px={2}>
                    <Typography
                      variant="h4"
                      textAlign={{ xs: 'center', md: 'justify' }}
                    >
                      <strong>Cadastro realizado.</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} px={2} mb={1}>
                    <Typography variant="h6" textAlign="left">
                      {accountStatus?.status}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} px={2} mb={1}>
                    <Typography variant="h6" textAlign="left">
                      {accountStatus?.firstName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} px={2} mb={1}>
                    <Typography variant="h6" textAlign="left">
                      {accountStatus?.email}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Botões de navegação */}
          <Grid item xs={12} container my={4}>
            <Grid item xs={6} container justifyContent="center">
              <Button
                size="large"
                variant="contained"
                onClick={handleWelcomePage}
              >
                Página inicial
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
