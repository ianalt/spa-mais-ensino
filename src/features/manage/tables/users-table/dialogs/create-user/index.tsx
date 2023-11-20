import AddIcon from '@mui/icons-material/Add';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Autocomplete,
  Box,
  Chip,
  Divider,
  Fab,
  Grid,
  Input,
  InputLabel,
  Paper,
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
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { viacep } from '../../../../../../api/cep/cep.req';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { convertBirthDate } from '../../../../../../utils/conversions/convert-birth-date';
import { Role } from '../../../../../../utils/enums/role.enum';
import { BirthDateCustom } from '../../../../../../utils/masks/birth-date-mask';
import { CepMaskCustom } from '../../../../../../utils/masks/cep-mask';
import { CpfMaskCustom } from '../../../../../../utils/masks/cpf-mask';
import { NumericFormatCustom } from '../../../../../../utils/masks/numeric-mask';
import { PhoneNumberMaskCustom } from '../../../../../../utils/masks/phone-number-mask';
import { YearMaskCustom } from '../../../../../../utils/masks/year-mask';
import { ethnicityOptions } from '../../../../../../utils/options/ethnicity-options';
import { genderOptions } from '../../../../../../utils/options/gender-options';
import { roleOptions } from '../../../../../../utils/options/role-options';
import {
  schoolingLevelOptions,
  schoolingLevelOptionsForNonStudents,
} from '../../../../../../utils/options/schooling-level-options';
import { EthnicityOption } from '../../../../../../utils/options/types/ethnicity-option';
import { GenderOption } from '../../../../../../utils/options/types/gender-option';
import { RoleOption } from '../../../../../../utils/options/types/role-option';
import { SchoolingLevelOption } from '../../../../../../utils/options/types/schooling-level-option';
import { UfOption } from '../../../../../../utils/options/types/uf-option';
import { ufOptions } from '../../../../../../utils/options/uf-options';
import NotificationAlert from '../../../../../notification-alert';
import {
  createNewAdmin,
  createNewStudent,
  createNewTeacher,
  resetErrors,
  selectUsersTable,
} from '../../usersTableSlice';
import { CreateAdminBody } from './types/create-admin-body';

import { CreateStudentBody } from './types/create-student-body';
import { CreateTeacherBody } from './types/create-teacher-body';
import { EducationInfoOption } from './types/education-info-option';

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
  onClose: any;
  onCreate: any;
}

export default function CreateUser({
  open,
  onClose,
  onCreate,
}: CreateUserProps) {
  const dispatch = useAppDispatch();
  const usersTable = useAppSelector(selectUsersTable);
  const { status, isCreating, error } = usersTable;

  const [openCreateFailedAlert, setOpenCreateFailedAlert] =
    useState<boolean>(false);

  const [cepError, setCepError] = useState<boolean>(false);
  const [cepErrorMessage, setCepErrorMessage] = useState<string>('');
  const [isCepLoading, setIsCepLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<RoleOption | null>(null);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [ethnicity, setEthnicity] = useState<EthnicityOption | null>(null);
  const [gender, setGender] = useState<GenderOption | null>(null);
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
  const [uf, setUf] = useState<UfOption | null>(null);

  const [educationInfoList, setEducationInfoList] = useState<
    EducationInfoOption[]
  >([
    {
      institutionName: '',
      courseName: '',
      schoolingLevel: null,
      startYear: '',
      conclusionYear: null,
    },
  ]);

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

  const handleRemoveEducationInfo = (index: number) => {
    const updatedList = educationInfoList.filter(
      (educationInfo, i) => i !== index
    );

    setEducationInfoList(updatedList);
  };

  const handleEditCourseName = (value: string, index: number) => {
    const newList = educationInfoList.map((educationInfo, i) => {
      return index === i
        ? {
            ...educationInfo,
            courseName: value,
          }
        : educationInfo;
    });

    setEducationInfoList(newList);
  };

  const handleEditInstitutionName = (value: string, index: number) => {
    const newList = educationInfoList.map((educationInfo, i) => {
      return index === i
        ? {
            ...educationInfo,
            institutionName: value,
          }
        : educationInfo;
    });

    setEducationInfoList(newList);
  };

  const handleEditSchoolingLevel = (
    value: SchoolingLevelOption | null,
    index: number
  ) => {
    const newList = educationInfoList.map((educationInfo, i) => {
      return index === i
        ? {
            ...educationInfo,
            schoolingLevel: value,
          }
        : educationInfo;
    });

    setEducationInfoList(newList);
  };

  const handleEditStartYear = (value: string, index: number) => {
    const newList = educationInfoList.map((educationInfo, i) => {
      return index === i
        ? {
            ...educationInfo,
            startYear: value,
          }
        : educationInfo;
    });

    setEducationInfoList(newList);
  };

  const handleEditConclusionYear = (value: string | null, index: number) => {
    const newList = educationInfoList.map((educationInfo, i) => {
      return index === i
        ? {
            ...educationInfo,
            conclusionYear: value,
          }
        : educationInfo;
    });

    setEducationInfoList(newList);
  };

  const handleAddNewEducationInfo = () => {
    setEducationInfoList([
      ...educationInfoList,
      {
        institutionName: '',
        courseName: '',
        schoolingLevel: null,
        startYear: '',
        conclusionYear: null,
      },
    ]);
  };

  const handleCepSearch = async () => {
    try {
      setCepError(false);
      setIsCepLoading(true);

      const data = await viacep.cep(cep);

      const { logradouro, complemento, bairro, localidade } = data;

      const selectedUf = ufOptions.find((option) => option.value === data.uf);

      setStreet(logradouro);
      setStreetNumber('');
      setNeighborhood(bairro);
      setComplement(complemento);
      setCity(localidade);
      setUf(!selectedUf ? null : selectedUf);

      setIsCepLoading(false);
    } catch (error: any) {
      setCepError(error.status === 404);
      setCepErrorMessage(error.statusText);

      resetAddressFields();

      setIsCepLoading(false);
    }
  };

  const filterFieldsByRole = () => {
    if (role?.value === Role.PROFESSOR || role?.value === Role.ADMIN) {
      setGeneralIncome(0);
      setTotalHouseHoldMembers(0);
      setEducationInfoList([
        {
          institutionName: '',
          courseName: '',
          schoolingLevel: null,
          startYear: '',
          conclusionYear: null,
        },
      ]);
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

  const resetFields = () => {
    setCepError(false);
    setCepErrorMessage('');
    setIsCepLoading(false);
    setEmail('');
    setPassword('');
    setRole(null);
    setFirstName('');
    setLastName('');
    setCpf('');
    setBirthDate('');
    setEthnicity(null);
    setGender(null);

    setGeneralIncome(0);
    setTotalHouseHoldMembers(0);

    setPhoneNumber1('');
    setPhoneNumber2('');

    setCep('');
    setStreet('');
    setStreetNumber('');
    setNeighborhood('');
    setComplement('');
    setCity('');
    setUf(null);

    setEducationInfoList([
      {
        institutionName: '',
        courseName: '',
        schoolingLevel: null,
        startYear: '',
        conclusionYear: null,
      },
    ]);
  };

  const handleCreateUser = async () => {
    if (role?.value === Role.ESTUDANTE) {
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

      const body: CreateStudentBody = {
        user: {
          email,
          password,
          role: role?.value,
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

        educationInfoList: educationInfoList.map((educationInfo) => {
          return {
            ...educationInfo,
            schoolingLevel: educationInfo.schoolingLevel
              ? educationInfo.schoolingLevel.value
              : null,
            conclusionYear:
              educationInfo.conclusionYear === ''
                ? null
                : educationInfo.conclusionYear,
          };
        }),

        financialInfo: {
          generalIncome,
          totalHouseHoldMembers,
        },
      };

      try {
        await dispatch(createNewStudent(body)).unwrap();

        onCreate();
        handleClose();
      } catch (rejectedValueOrSerializedError) {
        handleOpenCreateFailedAlert();
      }
    }

    if (role?.value === Role.PROFESSOR) {
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

      const body: CreateTeacherBody = {
        user: {
          email,
          password,
          role: role?.value,
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
        educationInfoList: educationInfoList.map((educationInfo) => {
          return {
            ...educationInfo,
            schoolingLevel: educationInfo.schoolingLevel
              ? educationInfo.schoolingLevel.value
              : null,
            conclusionYear:
              educationInfo.conclusionYear === ''
                ? null
                : educationInfo.conclusionYear,
          };
        }),
      };

      try {
        await dispatch(createNewTeacher(body)).unwrap();

        onCreate();
        handleClose();
      } catch (rejectedValueOrSerializedError) {
        handleOpenCreateFailedAlert();
      }
    }

    if (role?.value === Role.ADMIN) {
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

      const body: CreateAdminBody = {
        user: {
          email,
          password,
          role: role?.value,
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
      };

      try {
        await dispatch(createNewAdmin(body)).unwrap();

        onCreate();
        handleClose();
      } catch (rejectedValueOrSerializedError) {
        handleOpenCreateFailedAlert();
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleOpenCreateFailedAlert = () => {
    setOpenCreateFailedAlert(true);
  };

  const handleCloseCreateFailedAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenCreateFailedAlert(false);
  };

  useEffect(() => {
    if (open) {
      resetFields();
      dispatch(resetErrors());
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open || isCreating}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="create-user-dialog-slide-description"
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>{'Adicionar novo usuário'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="create-user-dialog-slide-description">
            Preencha as informações abaixo para criar o novo usuário.{' '}
            <strong>Confirme</strong> os dados antes de clicar no botão{' '}
            <strong>Criar</strong>.
          </DialogContentText>

          <Grid container justifyContent="flex-start">
            <Grid item xs={12}>
              <NotificationAlert
                open={status === 'failed' && openCreateFailedAlert}
                onClose={handleCloseCreateFailedAlert}
                severity="error"
                status="Erro"
                message="Erro(s) detectado(s) durante registro de novo usuário"
              />
            </Grid>
            {status === 'failed' ? (
              <Grid item xs={12} container m={1}>
                <Alert severity="error">
                  <Typography variant="body1">
                    <strong>Erro ao cadastrar. </strong>
                  </Typography>

                  {error.map((e: string, index: number) => {
                    return (
                      <Typography key={index} variant="body2">
                        &gt; {e}.
                      </Typography>
                    );
                  })}
                </Alert>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>

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
                >
                  <Tooltip
                    title="A senha precisa conter entre 8 e 16 caracteres, com 1 letra minúscula, 1 maiúscula, 1 número e 1 caracter especial"
                    arrow
                  >
                    <HelpOutlineOutlinedIcon fontSize="small" color="action" />
                  </Tooltip>
                </Grid>
              </Grid>

              <Grid item xs={4} container p={1}>
                <Grid item xs={9}>
                  <Autocomplete
                    id="role-options"
                    options={roleOptions}
                    value={role}
                    defaultValue={role}
                    onChange={(event: any, newValue: RoleOption | null) => {
                      setRole(newValue);
                      filterFieldsByRole();
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
                <Chip label="Dados pessoais" />
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

              {role?.value === Role.PROFESSOR || role?.value === Role.ADMIN ? (
                <></>
              ) : (
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
              )}

              {role?.value === Role.PROFESSOR || role?.value === Role.ADMIN ? (
                <></>
              ) : (
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
              )}

              <Grid item xs={2} container p={1}>
                <Grid item xs={12} px={1} py={2}>
                  <InputLabel htmlFor="formatted-phone-number-1-mask-input">
                    Número de celular *
                  </InputLabel>
                  <Input
                    id="formatted-phone-number-1-mask-input"
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
                    id="formatted-phone-number-2-mask-input"
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

                <Grid item xs={2} mr={2} py={2}>
                  <InputLabel htmlFor="formatted-cep-mask-input">
                    CEP *
                  </InputLabel>
                  <Input
                    required
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
                    disabled={isCepLoading || !cep}
                  >
                    Buscar
                  </LoadingButton>
                </Grid>

                <Grid item xs={12} container>
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

              {role?.value === Role.ADMIN ? (
                <></>
              ) : (
                <>
                  <Grid item xs={12} my={2}>
                    <Divider>
                      <Chip label="Formação acadêmica" />
                    </Divider>
                  </Grid>

                  <Grid item xs={12} container justifyContent="center" my={1}>
                    {educationInfoList.map((educationInfo, index) => {
                      const {
                        institutionName,
                        courseName,
                        schoolingLevel,
                        startYear,
                        conclusionYear,
                      } = educationInfo;

                      return (
                        <Box key={index + 1} my={2}>
                          <Paper>
                            <Grid item xs={12} container p={1}>
                              {role?.value === Role.ESTUDANTE ? (
                                <></>
                              ) : (
                                <Grid item xs={12} p={1}>
                                  <TextField
                                    id="course-name"
                                    margin="normal"
                                    fullWidth
                                    required
                                    name="course-name"
                                    label="Nome do curso"
                                    variant="outlined"
                                    placeholder="Digite o nome do curso..."
                                    value={courseName}
                                    onChange={(event: any) => {
                                      const newValue: string =
                                        event.target.value;

                                      handleEditCourseName(newValue, index);
                                    }}
                                  />
                                </Grid>
                              )}

                              <Grid item xs={5} p={1}>
                                <TextField
                                  id="instituition-name"
                                  margin="normal"
                                  fullWidth
                                  required
                                  name="instituition-name"
                                  label="Nome da instituição"
                                  variant="outlined"
                                  placeholder="Digite o nome da instituição..."
                                  value={institutionName}
                                  onChange={(event: any) => {
                                    const newValue: string = event.target.value;

                                    handleEditInstitutionName(newValue, index);
                                  }}
                                />
                              </Grid>

                              <Grid item xs={5} p={1}>
                                <Autocomplete
                                  id="schooling-level-options"
                                  value={schoolingLevel}
                                  defaultValue={schoolingLevel}
                                  onChange={(
                                    event: any,
                                    newValue: SchoolingLevelOption | null
                                  ) => {
                                    handleEditSchoolingLevel(newValue, index);
                                  }}
                                  options={
                                    role?.value === Role.ESTUDANTE
                                      ? schoolingLevelOptions
                                      : schoolingLevelOptionsForNonStudents
                                  }
                                  getOptionLabel={(option) => option.label}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      margin="normal"
                                      required
                                      fullWidth
                                      label="Nível de formação"
                                    />
                                  )}
                                />
                              </Grid>

                              <Grid item xs={3} container p={1}>
                                <Grid item xs={12}>
                                  <InputLabel htmlFor="formatted-start-year-mask-input">
                                    Ano de início *
                                  </InputLabel>
                                  <Input
                                    required
                                    value={startYear}
                                    onChange={(event: any) => {
                                      const newValue: string =
                                        event.target.value;

                                      handleEditStartYear(newValue, index);
                                    }}
                                    name="start-year"
                                    id="formatted-start-year-mask-input"
                                    inputComponent={YearMaskCustom as any}
                                  />
                                </Grid>
                              </Grid>

                              <Grid item xs={3} container p={1}>
                                <Grid item xs={12}>
                                  <InputLabel htmlFor="formatted-conclusion-year-mask-input">
                                    Ano de conclusão
                                  </InputLabel>
                                  <Input
                                    value={conclusionYear}
                                    onChange={(event: any) => {
                                      const newValue: string | null =
                                        event.target.value;

                                      handleEditConclusionYear(newValue, index);
                                    }}
                                    name="conclusion-year"
                                    id="formatted-conclusion-year-mask-input"
                                    inputComponent={YearMaskCustom as any}
                                  />
                                </Grid>
                              </Grid>

                              <Grid
                                item
                                xs={12}
                                container
                                justifyContent="flex-start"
                                mt={2}
                              >
                                <Tooltip title="Remover formação" arrow>
                                  <span>
                                    <Fab
                                      color="secondary"
                                      aria-label="create-user"
                                      onClick={() =>
                                        handleRemoveEducationInfo(index)
                                      }
                                      size="small"
                                      disabled={
                                        educationInfoList.length <= 1 &&
                                        index === 0
                                      }
                                    >
                                      <RemoveIcon />
                                    </Fab>
                                  </span>
                                </Tooltip>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Box>
                      );
                    })}
                    <Grid item xs={12} container justifyContent="center" p={1}>
                      <Tooltip title="Adicionar nova formação" arrow>
                        <span>
                          <Fab
                            color="primary"
                            aria-label="create-user"
                            onClick={handleAddNewEducationInfo}
                            size="small"
                          >
                            <AddIcon />
                          </Fab>
                        </span>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Fechar
          </Button>

          <LoadingButton
            variant="contained"
            onClick={handleCreateUser}
            loading={isCreating}
            disabled={isCreating || !role}
          >
            Criar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
