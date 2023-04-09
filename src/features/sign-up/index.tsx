import { Autocomplete, Button, Container, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { useAppDispatch } from '../../app/hooks';
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

interface EthnicityOption {
  label: string;
  value: string;
}

interface GenderOption {
  label: string;
  value: string;
}

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(0);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailConfirmation, setEmailConfirmation] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [ethnicity, setEthnicity] = useState<EthnicityOption | undefined>();
  const [gender, setGender] = useState<GenderOption | undefined>();

  const checkFieldEmptiness = (field: string) => {
    return validator.isEmpty(field, { ignore_whitespace: true });
  };

  const checkFieldLength = (field: string, min?: number, max?: number) => {
    return validator.isLength(field, { min, max });
  };

  const formatCpf = (cpf: string) => {
    const digits = cpf.split('');

    return digits.reduce((acc, val, i) => {
      return (acc += `${
        i === 2 || i === 5 ? `${val}.` : i === 8 ? `${val}-` : val
      }`);
    }, '');
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <Container maxWidth="xl" sx={{ border: '1px solid red' }}>
      <Grid my={5} />

      <Grid container justifyContent="center" px={{ xs: 2 }}>
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
            <Stepper activeStep={step} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Grid>

        <Grid item container xs={12} my={5}>
          <Grid item container xs={12} mb={3} sx={{ border: '1px solid red' }}>
            <form noValidate>
              {/* Dados pessoais */}
              {step === 0 ? (
                <Grid item xs={10} container>
                  <Grid item container xs={12}>
                    <Grid item xs={5.5} mr={2}>
                      <TextField
                        id="first-name"
                        margin="normal"
                        required
                        fullWidth
                        label="Nome"
                        name="first-name"
                        autoFocus
                        value={firstName}
                        variant="outlined"
                        placeholder="Digite seu nome..."
                        onChange={(e) => setFirstName(e.target.value)}
                        //   error={checkFieldErrors(fieldErrors, "email") !== ""}
                        //   helperText={checkFieldErrors(fieldErrors, "email")}
                        //   disabled={loading}
                      />
                    </Grid>

                    <Grid xs={5.5} mr={2}>
                      <TextField
                        id="last-name"
                        margin="normal"
                        required
                        fullWidth
                        name="last-name"
                        label="Sobrenome(s)"
                        variant="outlined"
                        placeholder="Digite seu(s) sobrenome(s)..."
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        //   error={checkFieldErrors(fieldErrors, "password") !== ""}
                        //   helperText={checkFieldErrors(fieldErrors, "password")}
                        //   disabled={loading}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} container>
                    <Grid item xs={3} mr={2}>
                      <TextField
                        id="cpf"
                        margin="normal"
                        required
                        fullWidth
                        label="CPF"
                        name="cpf"
                        variant="outlined"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        // error={checkFieldLength(cpf, 11, 11)}
                        // helperText={checkFieldErrors(fieldErrors, "email")}
                        // disabled={loading}
                      />
                    </Grid>

                    <Grid item xs={3} mr={2}>
                      <Autocomplete
                        id="ethnicity-options"
                        options={[1, 2]}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="normal"
                            required
                            fullWidth
                            label="Selecione sua etnia..."
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={3} mr={2}>
                      <Autocomplete
                        id="gender-options"
                        options={[1, 2]}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="normal"
                            required
                            fullWidth
                            label="Selecione seu gênero..."
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={8} container>
                    <Grid item xs={5.5} mr={2}>
                      <TextField
                        id="email"
                        margin="normal"
                        required
                        fullWidth
                        label="E-mail"
                        name="email"
                        value={email}
                        variant="outlined"
                        placeholder="Digite seu e-mail..."
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        // error={checkFieldErrors(fieldErrors, "email") !== ""}
                        // helperText={checkFieldErrors(fieldErrors, "email")}
                        // disabled={loading}
                      />
                    </Grid>

                    <Grid item xs={5.5} mr={2}>
                      <TextField
                        id="email-confirmation"
                        margin="normal"
                        required
                        fullWidth
                        label="Confirmação de e-mail"
                        name="email"
                        value={emailConfirmation}
                        variant="outlined"
                        placeholder="Confirme seu e-mail..."
                        onChange={(e) => setEmailConfirmation(e.target.value)}
                        type="email"
                        // error={checkFieldErrors(fieldErrors, "email") !== ""}
                        // helperText={checkFieldErrors(fieldErrors, "email")}
                        // disabled={loading}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={7} container>
                    <Grid item xs={5.5} mr={2}>
                      <TextField
                        id="password"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        variant="outlined"
                        placeholder="Digite sua senha..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        // error={}
                        // helperText={checkFieldErrors(fieldErrors, "password")}
                        // disabled={loading}
                      />
                    </Grid>

                    <Grid item xs={5.5} mr={2}>
                      <TextField
                        id="password-confirmation"
                        margin="normal"
                        required
                        fullWidth
                        name="password-confirmation"
                        label="Confirmação de senha"
                        type="password"
                        variant="outlined"
                        placeholder="Confirme sua senha..."
                        value={passwordConfirmation}
                        onChange={(e) =>
                          setPasswordConfirmation(e.target.value)
                        }
                        // error={checkFieldErrors(fieldErrors, "password") !== ""}
                        // helperText={checkFieldErrors(fieldErrors, "password")}
                        // disabled={loading}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}

              {/* {step === 1 ? : null} */}
              <Grid
                item
                xs={12}
                my={4}
                container
                justifyContent="space-between"
                sx={{ border: '1px solid green' }}
              >
                <Grid item ml={3}>
                  {step > 0 ? (
                    <Button variant="contained" onClick={handlePreviousStep}>
                      Voltar
                    </Button>
                  ) : null}
                </Grid>

                <Grid item mr={3}>
                  {step < steps.length - 1 ? (
                    <Button variant="contained" onClick={handleNextStep}>
                      Próximo
                    </Button>
                  ) : null}
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

// @IsString()
// cep: string;

// @IsString()
// street: string;

// @IsString()
// streetNumber: string;

// @IsString()
// neighborhood: string;

// @IsOptional()
// @IsString()
// complement: string;

// @IsString()
// city: string;

// @IsEnum(State)
// state: State;
