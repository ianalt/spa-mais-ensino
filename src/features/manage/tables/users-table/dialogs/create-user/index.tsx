import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Chip,
  Divider,
  Grid,
  Input,
  InputLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import dayjs, { Dayjs } from 'dayjs';
import {
  Dispatch,
  Fragment,
  SetStateAction,
  forwardRef,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { selectUsersTable, setSelected } from '../../usersTableSlice';
import EducationInfoDetails from '../components/education-info-details';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { CpfMaskCustom } from '../../../../../../utils/masks/cpf-mask';
import { BirthDateCustom } from '../../../../../../utils/masks/birth-date-mask';
import { PhoneNumberMaskCustom } from '../../../../../../utils/masks/phone-number-mask';
import { NumericFormatCustom } from '../../../../../../utils/masks/numeric-mask';
import { CepMaskCustom } from '../../../../../../utils/masks/cep-mask';
import { UfOption } from '../../../../../../utils/options/types/uf-option';
import { ufOptions } from '../../../../../../utils/options/uf-options';
import { viacep } from '../../../../../../api/cep/cep.req';
import { EthnicityOption } from '../../../../../../utils/options/types/ethnicity-option';
import { GenderOption } from '../../../../../../utils/options/types/gender-option';
import { ethnicityOptions } from '../../../../../../utils/options/ethnicity-options';
import { genderOptions } from '../../../../../../utils/options/gender-options';
import { roleOptions } from '../../../../../../utils/options/role-options';
import { RoleOption } from '../../../../../../utils/options/types/role-option';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CreateUserProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

const steps = [
  'Dados para criação da conta',
  'Dados pessoais',
  'Dados de moradia',
  'Dados educacionais',
];

export default function CreateUser({ open, onClose }: CreateUserProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const usersTable = useAppSelector(selectUsersTable);

  const [step, setStep] = useState<number>(0);

  const [cepError, setCepError] = useState<boolean>(false);
  const [cepErrorMessage, setCepErrorMessage] = useState<string>('');
  const [isCepLoading, setIsCepLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<RoleOption | null>();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  //TODO gender and ethnicity
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

  const handleClose = () => {
    onClose(true);
    setSelected(undefined);
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

  const resetAddressFields = () => {
    setStreet('');
    setStreetNumber('');
    setNeighborhood('');
    setComplement('');
    setCity('');
    setUf(null);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => onClose(true)}
        aria-describedby="create-user-dialog-slide-description"
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>{'Adicionar novo usuário'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="create-user-dialog-slide-description">
            {'Preencha as informações abaixo para criar o novo usuário: '}
          </DialogContentText>

          <Grid container justifyContent={'flex-start'}>
            <Grid item xs={12} my={2}>
              <Divider>
                <Chip label="Dados para acesso" />
              </Divider>
            </Grid>

            <Grid item xs={12} container my={1}>
              <Grid item xs={4} p={1}>
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                />
              </Grid>

              <Grid item xs={4} container p={1}>
                <Grid item xs={9}>
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
                  />
                </Grid>

                <Grid
                  item
                  xs={1}
                  p={1}
                  container
                  alignItems="flex-start"
                  justifyContent="center"
                  sx={{ border: '1px solid blue' }}
                >
                  <Tooltip
                    title="A senha precisa conter entre 8 e 16 caracteres, com 1 letra minúscula, 1 maiúscula, 1 número e 1 caracter especial"
                    arrow
                  >
                    <HelpOutlineOutlinedIcon fontSize="small" color="action" />
                  </Tooltip>
                </Grid>
              </Grid>

              <Grid
                item
                xs={4}
                container
                p={1}
                sx={{ border: '1px solid red' }}
              >
                <Grid item xs={9}>
                  <Autocomplete
                    id="role-options"
                    options={roleOptions}
                    value={role}
                    defaultValue={role}
                    onChange={(event: any, newValue: RoleOption | null) => {
                      setRole(newValue);
                    }}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        required
                        fullWidth
                        label="Nível de acesso"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container justifyContent={'flex-start'}>
            <Grid item xs={12} my={2}>
              <Divider>
                <Chip label="Dados de pessoais" />
              </Divider>
            </Grid>

            <Grid item xs={12} container my={1}>
              <Grid item xs={3} p={1}>
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
                />
              </Grid>

              <Grid item xs={3} container p={1}>
                <Grid item xs={12}>
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
                  />
                </Grid>
              </Grid>

              <Grid item xs={2} container p={1}>
                <Grid item xs={12} px={1} py={2}>
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
                    onChange={convertCpf}
                  />
                </Grid>
              </Grid>

              <Grid item xs={4} container p={1}>
                <Grid item xs={12} px={1} py={2}>
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setBirthDate(event.target.value);
                    }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={3} container p={1}>
                <Grid item xs={12}>
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
              </Grid>

              <Grid item xs={4} container p={1}>
                <Grid item xs={12}>
                  <Autocomplete
                    id="gender-options"
                    options={genderOptions}
                    value={gender}
                    defaultValue={gender}
                    onChange={(event: any, newValue: GenderOption | null) => {
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
              </Grid>

              <Grid item xs={2} container p={1}>
                <Grid item xs={12} px={1}>
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
              </Grid>

              <Grid item xs={2} container p={1}>
                <Grid item xs={12} px={1}>
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

              <Grid item xs={2} container p={1}>
                <Grid item xs={12} px={1} py={2}>
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

              <Grid item xs={2} container p={1}>
                <Grid item xs={12} px={1} py={2}>
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

            <Grid container justifyContent={'flex-start'}>
              <Grid item xs={12} my={2}>
                <Divider>
                  <Chip label="Dados de moradia" />
                </Divider>
              </Grid>

              <Grid item xs={12} container my={1} px={1}>
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

                <Grid item xs={12} container sx={{ border: '1px solid red' }}>
                  <Grid item xs={6} container p={1}>
                    <Grid item xs={12}>
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
                  </Grid>

                  <Grid item xs={6} container p={1}>
                    <Grid item xs={4}>
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
                  </Grid>

                  <Grid item xs={3} container p={1}>
                    <Grid item xs={12}>
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
                  </Grid>

                  <Grid item xs={9} container p={1}>
                    <Grid item xs={6}>
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

                  <Grid item xs={4} container p={1}>
                    <Grid item xs={12}>
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
                  </Grid>

                  <Grid item xs={1} container p={1}>
                    <Grid item xs={12}>
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
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
