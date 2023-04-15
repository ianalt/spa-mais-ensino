import { Autocomplete, Button, Container, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { useAppDispatch } from '../../app/hooks';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { IMaskInput } from 'react-imask';
import { viacep } from '../../api/cep/cep.req';

const steps = [
  'Dados para criação da conta',
  'Dados pessoais',
  'Dados de moradia',
  'Dados educacionais',
];

interface TextMaskCustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const CpfMaskCustom = forwardRef<HTMLElement, TextMaskCustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000.000.000-00"
        definitions={{
          '#': /[1-9]/,
        }}
        // inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

const PhoneNumberMaskCustom = forwardRef<HTMLElement, TextMaskCustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(00) 0 0000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        // inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

const CepMaskCustom = forwardRef<HTMLElement, TextMaskCustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00000-000"
        definitions={{
          '#': /[1-9]/,
        }}
        // inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

interface EthnicityOption {
  label: string;
  value: string;
}

interface GenderOption {
  label: string;
  value: string;
}

interface UfOption {
  label: string;
  value: string;
}

//TODO separar gênero e identidade de gênero
const ufOptions: UfOption[] = [
  { label: 'AC', value: 'AC' },
  { label: 'AL', value: 'AL' },
  { label: 'AP', value: 'AP' },
  { label: 'AM', value: 'AM' },
  { label: 'BA', value: 'BA' },
  { label: 'CE', value: 'CE' },
  { label: 'DF', value: 'DF' },
  { label: 'ES', value: 'ES' },
  { label: 'GO', value: 'GO' },
  { label: 'MA', value: 'MA' },
  { label: 'MT', value: 'MT' },
  { label: 'MS', value: 'MS' },
  { label: 'MG', value: 'MG' },
  { label: 'PA', value: 'PA' },
  { label: 'PB', value: 'PB' },
  { label: 'PR', value: 'PR' },
  { label: 'PE', value: 'PE' },
  { label: 'PI', value: 'PI' },
  { label: 'RJ', value: 'RJ' },
  { label: 'RN', value: 'RN' },
  { label: 'RS', value: 'RS' },
  { label: 'RO', value: 'RO' },
  { label: 'RR', value: 'RR' },
  { label: 'SC', value: 'SC' },
  { label: 'SP', value: 'SP' },
  { label: 'SE', value: 'SE' },
  { label: 'TO', value: 'TO' },
];
const genderOptions: GenderOption[] = [
  {
    label: 'Homem',
    value: 'Homem',
  },
  {
    label: 'Mulher',
    value: 'Mulher',
  },
  {
    label: 'Não-Binário',
    value: 'Não-Binário',
  },
  {
    label: 'Outro',
    value: 'Outro',
  },
];

const ethnicityOptions: EthnicityOption[] = [
  {
    label: 'Amarela',
    value: 'Amarela',
  },
  {
    label: 'Branca',
    value: 'Branca',
  },
  {
    label: 'Indígena',
    value: 'Indígena',
  },
  {
    label: 'Parda',
    value: 'Parda',
  },
  {
    label: 'Preta',
    value: 'Preta',
  },
];

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(0);

  const [email, setEmail] = useState<string>('');
  const [emailConfirmation, setEmailConfirmation] = useState<string>('');
  const [emailConfirmed, setEmailConfirmed] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [passwordConfirmed, setPasswordConfirmed] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [ethnicity, setEthnicity] = useState<EthnicityOption | null>();
  const [gender, setGender] = useState<GenderOption | null>();
  const [generalIncome, setGeneralIncome] = useState<number>(0);
  const [totalHouseHoldMembers, setTotalHouseHoldMembers] = useState<number>(0);
  const [phoneNumber1, setPhoneNumber1] = useState<string>('');
  const [phoneNumber2, setPhoneNumber2] = useState<string>('');

  const [cep, setCep] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [streetNumber, setStreetNumber] = useState<string>('');
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [complement, setComplement] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [uf, setUf] = useState<UfOption | null>();

  //TODO educational

  const resetAddressFields = () => {
    setStreet('');
    setStreetNumber('');
    setNeighborhood('');
    setComplement('');
    setCity('');
    setUf(null);
  };

  const handleCepSearch = async () => {
    try {
      const data = await viacep.cep(cep);

      const { logradouro, complemento, bairro, localidade } = data;

      setStreet(logradouro);
      setStreetNumber('');
      setNeighborhood(bairro);
      setComplement(complemento);
      setCity(localidade);

      setUf(ufOptions.find((option) => option.value === data.uf));
    } catch (error) {
      resetAddressFields();
      console.log(error);
    }
  };

  const handleWelcomePage = () => {
    navigate('/');
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleConfirmEmail = () => {
    setEmailConfirmed(email === emailConfirmation);
  };

  const handleConfirmPassword = () => {
    setPasswordConfirmed(password === passwordConfirmation);
  };

  const checkFieldEmptiness = (field: string) => {
    return validator.isEmpty(field, { ignore_whitespace: true });
  };

  const checkFieldLength = (field: string, min?: number, max?: number) => {
    return validator.isLength(field, { min, max });
  };

  const convertCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    const convertedCpf = input
      .split('')
      .filter((char) => {
        return char !== '.' && char !== '-';
      })
      .join('');

    setCpf(convertedCpf);
  };

  const convertPhoneNumber1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    const convertedPhoneNumber = input
      .split('')
      .filter((char) => {
        return char !== ' ' && char !== '(' && char !== ')' && char !== '-';
      })
      .join('');

    setPhoneNumber1(convertedPhoneNumber);
  };

  const convertPhoneNumber2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    const convertedPhoneNumber = input
      .split('')
      .filter((char) => {
        return char !== ' ' && char !== '(' && char !== ')' && char !== '-';
      })
      .join('');

    setPhoneNumber2(convertedPhoneNumber);
  };

  const convertCep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    const convertedCep = input
      .split('')
      .filter((char) => {
        return char !== '-';
      })
      .join('');

    setCep(convertedCep);
  };

  return (
    <Container maxWidth="xl">
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

        <Grid item container xs={12} my={5} justifyContent={'center'}>
          <Grid item container xs={10} mb={3} justifyContent={'center'}>
            <form noValidate>
              {/* Dados para conta */}
              {step === 0 ? (
                <Grid item xs={12} container>
                  <Grid item xs={12} container>
                    <Grid item xs={5.5} mr={2}>
                      <TextField
                        id="email"
                        margin="normal"
                        required
                        autoFocus
                        fullWidth
                        label="E-mail"
                        name="email"
                        value={email}
                        variant="outlined"
                        placeholder="Digite seu e-mail..."
                        onChange={(e) => {
                          setEmail(e.target.value);

                          handleConfirmEmail();
                        }}
                        type="email"
                        error={emailConfirmed}
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
                        onChange={(e) => {
                          setEmailConfirmation(e.target.value);

                          handleConfirmEmail();
                        }}
                        type="email"
                        error={emailConfirmed}
                        // helperText={checkFieldErrors(fieldErrors, "email")}
                        // disabled={loading}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} container>
                    <Grid item xs={7} container>
                      <Grid item xs={5.5} mr={2}>
                        <TextField
                          id="password"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Senha"
                          variant="outlined"
                          placeholder="Digite sua senha..."
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);

                            handleConfirmPassword();
                          }}
                          type="password"
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
                          variant="outlined"
                          placeholder="Confirme sua senha..."
                          value={passwordConfirmation}
                          onChange={(e) => {
                            setPasswordConfirmation(e.target.value);

                            handleConfirmPassword();
                          }}
                          type="password"
                          // error={checkFieldErrors(fieldErrors, "password") !== ""}
                          // helperText={checkFieldErrors(fieldErrors, "password")}
                          // disabled={loading}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}

              {/* Dados pessoais */}
              {step === 1 ? (
                <Grid item xs={12} container>
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
                      <Autocomplete
                        id="ethnicity-options"
                        value={ethnicity}
                        onChange={(
                          event: any,
                          newValue: EthnicityOption | null
                        ) => {
                          setEthnicity(newValue);
                        }}
                        options={ethnicityOptions}
                        getOptionLabel={(option) => option.label}
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
                        options={genderOptions}
                        value={gender}
                        onChange={(
                          event: any,
                          newValue: GenderOption | null
                        ) => {
                          setGender(newValue);
                        }}
                        getOptionLabel={(option) => option.label}
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

                    <Grid item xs={3} ml={2} mr={2} py={2}>
                      <InputLabel htmlFor="formatted-cpf-mask-input">
                        CPF *
                      </InputLabel>
                      <Input
                        required
                        value={cpf}
                        onChange={convertCpf}
                        name="cpf"
                        id="formatted-cpf-mask-input"
                        inputComponent={CpfMaskCustom as any}
                        placeholder="Digite seu CPF..."
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={10} container>
                    <Grid item container xs={3}>
                      <Grid item xs={12} mr={2} py={2}>
                        <InputLabel htmlFor="formatted-phone-number-1-mask-input">
                          Número de celular *
                        </InputLabel>
                        <Input
                          required
                          value={phoneNumber1}
                          onChange={convertPhoneNumber1}
                          name="phone-number-1"
                          id="formatted-phone-number-mask-input"
                          inputComponent={PhoneNumberMaskCustom as any}
                        />
                      </Grid>
                    </Grid>

                    <Grid item container xs={3}>
                      <Grid item xs={12} mr={2} py={2}>
                        <InputLabel htmlFor="formatted-phone-number-2-mask-input">
                          Segundo número (opcional)
                        </InputLabel>
                        <Input
                          value={phoneNumber2}
                          onChange={convertPhoneNumber2}
                          name="phone-number-2"
                          id="formatted-phone-number-mask-input"
                          inputComponent={PhoneNumberMaskCustom as any}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} container>
                    {/* //TODO apply money mask */}
                    <Grid xs={4} mr={2}>
                      <TextField
                        id="general-income"
                        margin="normal"
                        required
                        fullWidth
                        name="general-income"
                        type="number"
                        label="Renda familiar total"
                        variant="outlined"
                        placeholder="Digite o valor total de sua renda familiar..."
                        value={generalIncome}
                        onChange={(e) =>
                          setGeneralIncome(parseFloat(e.target.value))
                        }
                        //   error={checkFieldErrors(fieldErrors, "password") !== ""}
                        //   helperText={checkFieldErrors(fieldErrors, "password")}
                        //   disabled={loading}
                      />
                    </Grid>

                    <Grid xs={2} mr={2}>
                      <TextField
                        id="total-household-members"
                        margin="normal"
                        required
                        fullWidth
                        name="total-household-members"
                        type="number"
                        label="Total de membros na moradia"
                        variant="outlined"
                        value={totalHouseHoldMembers}
                        onChange={(e) => {
                          setTotalHouseHoldMembers(parseInt(e.target.value));
                        }}
                        //   error={checkFieldErrors(fieldErrors, "password") !== ""}
                        //   helperText={checkFieldErrors(fieldErrors, "password")}
                        //   disabled={loading}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}

              {/* Dados de moradia */}
              {step === 2 ? (
                <Grid item xs={12} container>
                  <Grid item container xs={12}>
                    <Grid item xs={2} mr={2} py={2}>
                      <InputLabel htmlFor="formatted-cep-mask-input">
                        CEP *
                      </InputLabel>
                      <Input
                        required
                        autoFocus
                        value={cep}
                        onChange={convertCep}
                        name="cep"
                        id="formatted-cep-mask-input"
                        inputComponent={CepMaskCustom as any}
                        placeholder="Digite seu CEP..."
                      />
                    </Grid>
                    <Grid item xs={4} mr={2} py={2} alignSelf="flex-end">
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleCepSearch}
                      >
                        Buscar
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid item container xs={12}>
                    <Grid item xs={5.5} mr={2}>
                      <TextField
                        id="street"
                        margin="normal"
                        required
                        fullWidth
                        label="Endereço"
                        name="street"
                        value={street}
                        variant="outlined"
                        placeholder="Digite seu endereço..."
                        onChange={(e) => setStreet(e.target.value)}
                        //   error={checkFieldErrors(fieldErrors, "email") !== ""}
                        //   helperText={checkFieldErrors(fieldErrors, "email")}
                        //   disabled={loading}
                      />
                    </Grid>

                    <Grid xs={2} mr={2}>
                      <TextField
                        id="street-number"
                        margin="normal"
                        required
                        fullWidth
                        name="street-number"
                        label="Número"
                        variant="outlined"
                        value={streetNumber}
                        onChange={(e) => setStreetNumber(e.target.value)}
                        //   error={checkFieldErrors(fieldErrors, "password") !== ""}
                        //   helperText={checkFieldErrors(fieldErrors, "password")}
                        //   disabled={loading}
                      />
                    </Grid>

                    <Grid xs={3} mr={2}>
                      <TextField
                        id="neighborhood"
                        margin="normal"
                        required
                        fullWidth
                        name="neighborhood"
                        label="Bairro"
                        variant="outlined"
                        placeholder="Digite o seu bairro..."
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        //   error={checkFieldErrors(fieldErrors, "password") !== ""}
                        //   helperText={checkFieldErrors(fieldErrors, "password")}
                        //   disabled={loading}
                      />
                    </Grid>

                    <Grid xs={5.5} mr={2}>
                      <TextField
                        id="complement"
                        margin="normal"
                        fullWidth
                        name="complement"
                        label="Complemento"
                        variant="outlined"
                        placeholder="Digite informações adicionais, caso haja..."
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        //   error={checkFieldErrors(fieldErrors, "password") !== ""}
                        //   helperText={checkFieldErrors(fieldErrors, "password")}
                        //   disabled={loading}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} container>
                    <Grid item xs={4} mr={2}>
                      <TextField
                        id="city"
                        margin="normal"
                        fullWidth
                        required
                        name="city"
                        label="Cidade"
                        variant="outlined"
                        placeholder="Digite sua cidade..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        //   error={checkFieldErrors(fieldErrors, "password") !== ""}
                        //   helperText={checkFieldErrors(fieldErrors, "password")}
                        //   disabled={loading}
                      />
                    </Grid>

                    <Grid item xs={1} mr={2}>
                      <Autocomplete
                        id="uf-options"
                        value={uf}
                        onChange={(event: any, newValue: UfOption | null) => {
                          setUf(newValue);
                        }}
                        options={ufOptions}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="normal"
                            required
                            fullWidth
                            label="UF"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}

              {/* Dados educacionais */}
              {/* {step === 3 ? () : null} */}

              {/* Botões de navegação */}
              <Grid item xs={12} container my={4}>
                <Grid item xs={3} container justifyContent="flex-start">
                  {step > 0 ? (
                    <Button
                      size="large"
                      variant="contained"
                      onClick={handlePreviousStep}
                      disabled={step <= 0}
                    >
                      Voltar
                    </Button>
                  ) : null}
                </Grid>

                <Grid item xs={6} container justifyContent="center">
                  <Button
                    size="large"
                    variant="contained"
                    onClick={handleWelcomePage}
                  >
                    Página inicial
                  </Button>
                </Grid>

                <Grid item xs={3} container justifyContent="flex-end">
                  {step < steps.length - 1 ? (
                    <Button
                      size="large"
                      variant="contained"
                      onClick={handleNextStep}
                      disabled={step >= steps.length - 1}
                    >
                      Próximo
                    </Button>
                  ) : step === steps.length - 1 ? (
                    <Button size="large" variant="contained">
                      Cadastrar-se
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
