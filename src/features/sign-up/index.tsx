import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  TextField,
  Tooltip,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { viacep } from '../../api/cep/cep.req';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FieldErrors, checkFieldErrors } from '../../utils/checkFieldErrors';
import { convertBirthDate } from '../../utils/conversions/convert-birth-date';
import { Ethnicity } from '../../utils/enums/ethnicity.enum';
import { Gender } from '../../utils/enums/gender.enum';
import { SchoolingLevel } from '../../utils/enums/schooling-level.enum';
import { BirthDateCustom } from '../../utils/masks/birth-date-mask';
import { CepMaskCustom } from '../../utils/masks/cep-mask';
import { CpfMaskCustom } from '../../utils/masks/cpf-mask';
import { NumericFormatCustom } from '../../utils/masks/numeric-mask';
import { PhoneNumberMaskCustom } from '../../utils/masks/phone-number-mask';
import { YearMaskCustom } from '../../utils/masks/year-mask';
import { ethnicityOptions } from '../../utils/options/ethnicity-options';
import { genderOptions } from '../../utils/options/gender-options';
import { schoolingLevelOptions } from '../../utils/options/schooling-level-options';
import { EthnicityOption } from '../../utils/options/types/ethnicity-option';
import { GenderOption } from '../../utils/options/types/gender-option';
import { SchoolingLevelOption } from '../../utils/options/types/schooling-level-option';
import { SignUpBody } from '../../utils/options/types/sign-up-body';
import { UfOption } from '../../utils/options/types/uf-option';
import { ufOptions } from '../../utils/options/uf-options';
import ConfirmSignUp from './confirm-sign-up';
import { resetSignUp, selectSignUp } from './signUpSlice';
import AccountStatus from './AccountStatus';

const steps = [
  'Dados para criação da conta',
  'Dados pessoais',
  'Dados de moradia',
  'Dados educacionais',
];

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signUp = useAppSelector(selectSignUp);

  const { status, isLoading, error, accountStatus } = signUp;

  const [step, setStep] = useState<number>(0);

  const [openConfirmSignUp, setOpenConfirmSignUp] = useState<boolean>(false);

  //TODO remove dummy
  const testDummy: SignUpBody = {
    user: {
      email: 'ian.alt@email.com',
      password: 'Teste12aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa34*',
      firstName: 'TesteTaaaaaarês',
      lastName: 'Testado',
      cpf: '09853645726',
      birthDate: '2005--17',
      ethnicity: Ethnicity.BRANCA,
      gender: Gender.HOMEM_CIS,
    },
    address: {
      cep: '123407',
      street: 'Rua Nóbrega',
      streetNumber: '1789',
      neighborhood: 'Valparaíso',
      complement: 'Casa verde',
      city: 'Petrópolis',
      uf: 'RJ',
    },
    phoneNumbers: [
      {
        phoneNumber: '24912343647',
      },
    ],
    educationInfo: {
      schoolingLevel: SchoolingLevel.EMC,
      courseName: null,
      institutionName: 'Colégio Liceu',
      startYear: '2020',
      conclusionYear: '2022',
    },
    financialInfo: {
      generalIncome: 1000,
      totalHouseHoldMembers: 2,
    },
  };

  const [signUpBody, setSignUpBody] = useState<SignUpBody>(testDummy);

  const [email, setEmail] = useState<string>('');
  const [emailConfirmation, setEmailConfirmation] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
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

  const [schoolingLevel, setSchoolingLevel] =
    useState<SchoolingLevelOption | null>();
  const [courseName, setCourseName] = useState<string | null>(null);
  const [institutionName, setInstitutionName] = useState<string>('');
  const [startYear, setStartYear] = useState<string>('');
  const [conclusionYear, setConclusionYear] = useState<string | null>();

  const [isEmailConfirmed, setIsEmailConfirmed] = useState<boolean>(true);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState<boolean>(true);

  const [cepError, setCepError] = useState<boolean>(false);
  const [cepErrorMessage, setCepErrorMessage] = useState<string>('');
  const [isCepLoading, setIsCepLoading] = useState<boolean>(false);

  const resetAddressFields = () => {
    setStreet('');
    setStreetNumber('');
    setNeighborhood('');
    setComplement('');
    setCity('');
    setUf(null);
  };

  const handleStep = (i: number) => {
    setStep(i);
  };

  const handleOpenConfirmSignUp = () => {
    const phoneNumbers = !phoneNumber2
      ? [phoneNumber1].map((phone) => {
          return {
            phoneNumber: phone,
          };
        })
      : [phoneNumber1, phoneNumber2].map((phone) => {
          return {
            phoneNumber: phone,
          };
        });

    const body: SignUpBody = {
      user: {
        email,
        password,
        firstName,
        lastName,
        cpf,
        birthDate: convertBirthDate(birthDate),
        ethnicity: ethnicity?.value,
        gender: gender?.value,
      },

      address: {
        cep,
        street,
        streetNumber,
        neighborhood,
        complement,
        city,
        uf: uf?.value,
      },
      phoneNumbers,

      educationInfo: {
        schoolingLevel: schoolingLevel?.value,
        courseName,
        institutionName,
        startYear,
        conclusionYear,
      },

      financialInfo: {
        generalIncome,
        totalHouseHoldMembers,
      },
    };

    setSignUpBody(body);

    setOpenConfirmSignUp(true);
  };

  const handleCloseConfirmSignUp = () => {
    setOpenConfirmSignUp(false);
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

  const handleEmailConfirmation = () => {
    setIsEmailConfirmed(email === emailConfirmation);
  };

  const handlePasswordConfirmation = () => {
    setIsPasswordConfirmed(password === passwordConfirmation);
  };

  const handleCepSearch = async () => {
    try {
      setCepError(false);
      setIsCepLoading(true);

      const data = await viacep.cep(cep);

      const { logradouro, complemento, bairro, localidade } = data;

      setStreet(logradouro);
      setStreetNumber('');
      setNeighborhood(bairro);
      setComplement(complemento);
      setCity(localidade);
      setUf(ufOptions.find((option) => option.value === data.uf));

      setIsCepLoading(false);
    } catch (error: any) {
      setCepError(error.status === 404);
      setCepErrorMessage(error.statusText);

      resetAddressFields();

      setIsCepLoading(false);
    }
  };

  const handleWelcomePage = () => {
    dispatch(resetSignUp());
    navigate('/');
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    dispatch(resetSignUp());
  }, []);

  return (
    <>
      <ConfirmSignUp
        open={openConfirmSignUp}
        onClose={handleCloseConfirmSignUp}
        onConfirm={() => {
          handleCloseConfirmSignUp();

          alert(signUp.accountStatus);
        }}
        //TODO change to body
        signUpBody={signUpBody}
        // signUpBody={testDummy}
      />
      {!isLoading && accountStatus ? (
        <Container maxWidth="xl">
          <AccountStatus />
        </Container>
      ) : (
        <Container maxWidth="xl">
          <Grid my={5} />

          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

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
                          Para acessar o <strong>+Ensino</strong>, será
                          necessário que se cadastre, fornecendo algumas
                          informações.
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
                  {steps.map((label, i) => (
                    <Step key={label}>
                      <StepLabel>
                        <Button size="small" onClick={() => handleStep(i)}>
                          {label}
                        </Button>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Grid>

            <Grid item container xs={12} my={5} justifyContent={'center'}>
              <Grid item container xs={10} mb={3} justifyContent={'center'}>
                {status === 'failed' ? (
                  <Grid item xs={12} container m={1}>
                    <Alert severity="error">
                      <Typography variant="body1">
                        <strong>Erro ao cadastrar. </strong>
                      </Typography>
                      {error.map((e: string) => {
                        return (
                          <Typography key={e} variant="body2">
                            &gt; {e}.
                          </Typography>
                        );
                      })}
                    </Alert>
                  </Grid>
                ) : (
                  <></>
                )}

                {cepError ? (
                  <Grid item xs={12} container m={1}>
                    <Alert severity="error">
                      <Typography variant="body1">
                        <strong>CEP inválido. </strong>
                      </Typography>
                      <Typography variant="body2">
                        &gt; {cepErrorMessage}
                      </Typography>
                    </Alert>
                  </Grid>
                ) : (
                  <></>
                )}

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

                            handleEmailConfirmation();
                          }}
                          type="email"
                          // error={!isEmailConfirmed}
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
                          }}
                          type="email"
                          // error={!isEmailConfirmed}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} container>
                      <Grid item xs={7} container>
                        <Grid item xs={5} mr={1}>
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
                            }}
                            type="password"
                            // error={!isPasswordConfirmed}
                          />
                        </Grid>

                        <Grid
                          item
                          mt={1}
                          xs={1}
                          container
                          alignItems="flex-start"
                          justifyContent="flex-start"
                        >
                          <Tooltip
                            title="A senha precisa conter entre 8 e 16 caracteres, com 1 letra minúscula, 1 maiúscula, 1 número e 1 caracter especial"
                            arrow
                          >
                            <HelpOutlineOutlinedIcon
                              fontSize="small"
                              color="action"
                            />
                          </Tooltip>
                        </Grid>

                        <Grid item xs={5} mr={2}>
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

                              handlePasswordConfirmation();
                            }}
                            type="password"
                            // error={!isPasswordConfirmed}
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
                      <Grid item xs={4} mr={2}>
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
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                          disabled={isLoading}
                        />
                      </Grid>

                      <Grid xs={4} mr={2}>
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
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                          disabled={isLoading}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} container>
                      <Grid item xs={2} mr={2}>
                        <Autocomplete
                          id="ethnicity-options"
                          value={ethnicity}
                          defaultValue={ethnicity}
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
                              label="Qual sua etnia?"
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={3} mr={2}>
                        <Autocomplete
                          id="gender-options"
                          options={genderOptions}
                          value={gender}
                          defaultValue={gender}
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
                              label="Como você se identifica?"
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={2} ml={2} mr={2} py={2}>
                        <InputLabel htmlFor="formatted-cpf-mask-input">
                          CPF *
                        </InputLabel>
                        <Input
                          id="formatted-cpf-mask-input"
                          name="cpf"
                          required
                          value={cpf}
                          inputComponent={CpfMaskCustom as any}
                          placeholder="XXX.XXX.XXX-XX"
                          // onChange={convertCpf}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            convertCpf(event);
                          }}
                          disabled={isLoading}
                        />
                      </Grid>

                      <Grid item xs={2} ml={2} mr={2} py={2}>
                        {/* <BirthDatePicker /> */}
                        <InputLabel htmlFor="formatted-birth-date-mask-input">
                          Data de nascimento *
                        </InputLabel>
                        <Input
                          id="formatted-birth-date-mask-input"
                          name="birth-date"
                          required
                          value={birthDate}
                          inputComponent={BirthDateCustom as any}
                          placeholder="DD/MM/AAAA"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setBirthDate(event.target.value);
                          }}
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
                            id="formatted-phone-number-mask-input"
                            name="phone-number-1"
                            required
                            value={phoneNumber1}
                            onChange={convertPhoneNumber1}
                            placeholder="(XX) X XXXX-XXXX"
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
                            placeholder="(XX) X XXXX-XXXX"
                            inputComponent={PhoneNumberMaskCustom as any}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} container>
                      <Grid xs={4} mr={2}>
                        <TextField
                          id="general-income"
                          required
                          name="general-income"
                          label="Renda familiar total"
                          margin="normal"
                          variant="outlined"
                          placeholder="Digite o valor total de sua renda familiar..."
                          fullWidth
                          value={generalIncome}
                          onChange={(e) =>
                            setGeneralIncome(parseFloat(e.target.value))
                          }
                          InputProps={{
                            inputComponent: NumericFormatCustom as any,
                          }}
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
                            const n = parseInt(e.target.value);
                            setTotalHouseHoldMembers(Number.isNaN(n) ? 0 : n);
                          }}
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
                        <LoadingButton
                          color="primary"
                          variant="contained"
                          onClick={handleCepSearch}
                          loading={isCepLoading}
                          disabled={isCepLoading}
                        >
                          Buscar
                        </LoadingButton>
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
                        />
                      </Grid>

                      <Grid item xs={1} mr={2}>
                        {/* //TODO fix UF bug */}
                        <Autocomplete
                          id="uf-options"
                          value={uf}
                          defaultValue={uf}
                          inputValue={uf?.label}
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
                {step === 3 ? (
                  <Grid item xs={12} container>
                    <Grid item xs={12} mr={2}>
                      <TextField
                        id="instituition-name"
                        autoFocus
                        margin="normal"
                        fullWidth
                        required
                        name="instituition-name"
                        label="Nome da instituição"
                        variant="outlined"
                        placeholder="Digite o nome da instituição..."
                        value={institutionName}
                        onChange={(e) => setInstitutionName(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={5.5} mr={2}>
                      <Autocomplete
                        id="schooling-level-options"
                        value={schoolingLevel}
                        onChange={(
                          event: any,
                          newValue: SchoolingLevelOption | null
                        ) => {
                          setSchoolingLevel(newValue);
                        }}
                        options={schoolingLevelOptions}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="normal"
                            required
                            fullWidth
                            label="Nível de escolaridade"
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={3} container>
                      <Grid item xs={12} mr={2} py={2}>
                        <InputLabel htmlFor="formatted-start-year-mask-input">
                          Ano de início *
                        </InputLabel>
                        <Input
                          required
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                          name="start-year"
                          id="formatted-start-year-mask-input"
                          inputComponent={YearMaskCustom as any}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={3} container>
                      <Grid item xs={12} mr={2} py={2}>
                        <InputLabel htmlFor="formatted-conclusion-year-mask-input">
                          Ano de conclusão
                        </InputLabel>
                        <Input
                          value={conclusionYear}
                          onChange={(e) => setConclusionYear(e.target.value)}
                          name="conclusion-year"
                          id="formatted-conclusion-year-mask-input"
                          inputComponent={YearMaskCustom as any}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
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
                  <LoadingButton
                    size="large"
                    variant="contained"
                    onClick={handleOpenConfirmSignUp}
                    loading={isLoading}
                    disabled={isLoading || cepError}
                  >
                    Cadastrar-se
                  </LoadingButton>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
