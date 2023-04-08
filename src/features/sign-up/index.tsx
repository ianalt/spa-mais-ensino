import { Container, Link, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getKnowledgeAreasWelcome,
  selectKnowledgeAreas,
} from '../../slices/knowledgeAreasSlice';

import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

const steps = [
  'Dados pessoais',
  'Dados de moradia',
  'Dados para contato',
  'Dados educacionais',
  'Dados financeiros',
];

// export default function SignUp() {
//   return (
//     <Box sx={{ width: '100%' }}>
//       <Stepper activeStep={0} alternativeLabel>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//     </Box>
//   );
// }

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const knowledgeAreas = useAppSelector(selectKnowledgeAreas);

  useEffect(() => {
    dispatch(getKnowledgeAreasWelcome());
  }, []);

  return (
    <Container disableGutters>
      <Grid my={5} />

      <Grid container justifyContent={{ md: 'center' }} px={{ xs: 2 }}>
        <Grid item container xs={12} my={5} justifyContent="space-between">
          <Grid
            item
            xs={12}
            md={5}
            mb={{ xs: 3, md: 0 }}
            order={{ xs: 1, md: 1 }}
          >
            <img
              src="/undraw_sign_up_n6im.svg"
              alt="Imagem"
              height="300"
              width="100%"
            />
          </Grid>

          <Grid item container xs={12} md={6.5} order={{ xs: 2, md: 2 }}>
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
                      <strong>Cadastro</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} px={2} mb={1}>
                    <Typography variant="h6" textAlign="left">
                      Para acessar o <strong>+Ensino</strong>, será necessário
                      que se cadastre, fornecendo algumas informações.
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} px={2} my={1}></Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={0} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Grid>

        <Grid item container xs={12} my={5}>
          <Grid
            item
            container
            xs={12}
            md={6.5}
            mb={{ xs: 3, md: 0 }}
            order={{ xs: 2, md: 1 }}
          >
            <form noValidate>
              <TextField
                id="email"
                margin="normal"
                required
                fullWidth
                label="E-mail"
                name="email"
                autoFocus
                //   value={email}
                //   variant="outlined"
                //   placeholder="Digite seu e-mail..."
                //   onChange={(e) => setEmail(e.target.value)}
                //   error={checkFieldErrors(fieldErrors, "email") !== ""}
                //   helperText={checkFieldErrors(fieldErrors, "email")}
                //   disabled={loading}
              />

              <TextField
                id="password"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                placeholder="Digite sua senha..."
                //   onChange={(e) => setPassword(e.target.value)}
                //   value={password}
                //   error={checkFieldErrors(fieldErrors, "password") !== ""}
                //   helperText={checkFieldErrors(fieldErrors, "password")}
                //   disabled={loading}
              />
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
