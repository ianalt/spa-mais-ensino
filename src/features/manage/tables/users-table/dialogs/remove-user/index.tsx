import {
  Box,
  Chip,
  Divider,
  Grid,
  Link,
  Paper,
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
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, forwardRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { Role } from '../../../../../../utils/enums/role.enum';
import {
  deleteUser,
  getIsMonitorOrTeacher,
  selectUsersTable,
  setSelected,
} from '../../usersTableSlice';
import { LoadingButton } from '@mui/lab';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface RemoveUserProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  onRemove: any;
}

export default function RemoveUser({
  open,
  onClose,
  onRemove,
}: RemoveUserProps) {
  const dispatch = useAppDispatch();
  const usersTable = useAppSelector(selectUsersTable);
  const { selected, isRemoving } = usersTable;
  const isMonitorOrTeacher = useAppSelector(getIsMonitorOrTeacher);

  const handleClose = () => {
    onClose(true);
    dispatch(setSelected(null));
  };

  const handleRemoveUser = async () => {
    const userId = selected ? selected.id : 0;
    try {
      await dispatch(deleteUser(userId)).unwrap();

      onRemove();
      handleClose();
    } catch (rejectedValueOrSerializedError) {}
  };

  const formatRole = () => {
    return selected?.role.split('').reduce((acc, val, i) => {
      return (acc += `${i === 0 ? val.toUpperCase() : val}`);
    }, '');
  };

  const formatCpf = () => {
    return `${selected?.cpf.substring(0, 3)}.${selected?.cpf.substring(
      3,
      6
    )}.${selected?.cpf.substring(6, 9)}-${selected?.cpf.substring(9, 11)}`;
  };

  const formatBirthDate = () => {
    if (!selected) return '—';

    const date = dayjs(selected.birthDate).format('DD/MM/YYYY');

    return date;
  };

  const formatPhoneNumber = (phone: string) => {
    return `(${phone.substring(0, 2)}) ${phone.substring(
      2,
      3
    )} ${phone.substring(3, 7)}-${phone.substring(7, 11)}`;
  };

  return (
    <div>
      <Dialog
        id="remove-user"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => onClose(true)}
        aria-describedby="remove-user-dialog-slide-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>{'Remover usuário'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="remove-user-dialog-slide-description">
            {'Tem certeza que deseja remover este usuário?'}
          </DialogContentText>

          <Grid container justifyContent={'flex-start'}>
            <Grid item xs={12} my={2}>
              <Divider>
                <Chip label="Dados para acesso" />
              </Divider>
            </Grid>

            <Grid item xs={12} container my={1}>
              <Grid item xs={4} p={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'E-mail:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <Link href={`mailto:${selected?.email}`}>
                      {selected?.email}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={4} container p={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>
                    {'Nível de acesso:'}{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{formatRole()}</Typography>
                </Grid>
              </Grid>

              <Grid item xs={4} container p={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Conta ativa?'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.active ? 'Sim' : 'Não'}</Typography>
                </Grid>
              </Grid>

              {!isMonitorOrTeacher ? (
                <></>
              ) : (
                <Grid item xs={4} container p={1}>
                  <Grid item xs={9}>
                    <Grid item xs={12}>
                      <Typography fontWeight={700}>{'Disciplina:'} </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>{selected?.subject || '—'}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
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
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Nome:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.firstName}</Typography>
                </Grid>
              </Grid>

              <Grid item xs={3} container p={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Sobrenome(s):'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.lastName}</Typography>
                </Grid>
              </Grid>

              <Grid item xs={2} container p={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'CPF:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{formatCpf()}</Typography>
                </Grid>
              </Grid>

              <Grid item xs={4} container p={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>
                    {'Data de nascimento:'}{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{formatBirthDate()}</Typography>
                </Grid>
              </Grid>

              <Grid item xs={3} container p={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Etnia:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.ethnicity}</Typography>
                </Grid>
              </Grid>

              <Grid item xs={3} container p={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Gênero:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.gender}</Typography>
                </Grid>
              </Grid>

              {selected?.role === Role.MONITOR ||
              selected?.role === Role.PROFESSOR ||
              selected?.role === Role.ADMIN ? (
                <></>
              ) : (
                <Grid item xs={2} container p={1}>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>
                      {'Renda familiar total:'}{' '}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      R${selected?.financialInfo.generalIncome}
                    </Typography>
                  </Grid>
                </Grid>
              )}

              {selected?.role === Role.MONITOR ||
              selected?.role === Role.PROFESSOR ||
              selected?.role === Role.ADMIN ? (
                <></>
              ) : (
                <Grid item xs={3} container p={1}>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>
                      {'Total de membros da moradia:'}{' '}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      {selected?.financialInfo.totalHouseHoldMembers}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>

            <Grid item xs={4} container p={1}>
              <Grid item xs={12}>
                <Typography fontWeight={700}>
                  {'Números de telefone:'}{' '}
                </Typography>
              </Grid>
              <Grid item xs={12} container justifyContent="flex-start">
                {selected ? (
                  selected.phoneNumbers.map((item) => {
                    return (
                      <Grid item xs={5} mx={1}>
                        <Link href={`tel:+${item.phoneNumber}`}>
                          {formatPhoneNumber(item.phoneNumber)}
                        </Link>
                      </Grid>
                    );
                  })
                ) : (
                  <></>
                )}
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
              <Grid item xs={2} mr={2} p={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'CEP:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.address.cep}</Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} container>
                <Grid item xs={5} container p={1}>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>{'Endereço:'} </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>{selected?.address.street}</Typography>
                  </Grid>
                </Grid>

                <Grid item xs={6} container p={1}>
                  <Grid item xs={4}>
                    <Grid item xs={12}>
                      <Typography fontWeight={700}>{'Número:'} </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>{selected?.address.streetNumber}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={2} container p={1}>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>{'Bairro:'} </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>{selected?.address.neighborhood}</Typography>
                  </Grid>
                </Grid>

                <Grid item xs={5} container p={1}>
                  <Grid item xs={6}>
                    <Grid item xs={12}>
                      <Typography fontWeight={700}>
                        {'Complemento:'}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>{selected?.address.complement}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={4} container p={1}>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>{'Cidade:'} </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>{selected?.address.city}</Typography>
                  </Grid>
                </Grid>

                <Grid item xs={1} container p={1}>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>{'UF:'} </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>{selected?.address.uf}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {selected?.role === Role.ADMIN ? (
            <></>
          ) : (
            <>
              <Grid item xs={12} my={2}>
                <Divider>
                  <Chip label="Formação acadêmica" />
                </Divider>
              </Grid>

              <Grid item xs={12} container justifyContent="space-evenly" my={1}>
                {selected?.educationInfoList.map((educationInfo, index) => {
                  const {
                    institutionName,
                    courseName,
                    schoolingLevel,
                    startYear,
                    conclusionYear,
                  } = educationInfo;

                  return (
                    <Box key={index + 1} my={2} maxWidth="40%">
                      <Paper>
                        <Grid item xs={12} container p={1}>
                          {selected?.role === Role.ESTUDANTE ? (
                            <></>
                          ) : (
                            <Grid item xs={12} p={1}>
                              <Grid item xs={12}>
                                <Typography fontWeight={700}>
                                  {'Nome do curso:'}{' '}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>{courseName}</Typography>
                              </Grid>
                            </Grid>
                          )}

                          <Grid item xs={12} p={1}>
                            <Grid item xs={12}>
                              <Typography fontWeight={700}>
                                {'Nome da instituição:'}{' '}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>{institutionName}</Typography>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} p={1}>
                            <Grid item xs={12}>
                              <Typography fontWeight={700}>
                                {'Nível de formação:'}{' '}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>{schoolingLevel}</Typography>
                            </Grid>
                          </Grid>

                          <Grid item xs={6} container p={1}>
                            <Grid item xs={12}>
                              <Typography fontWeight={700}>
                                {'Ano de início:'}{' '}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>{startYear}</Typography>
                            </Grid>
                          </Grid>

                          <Grid item xs={6} container p={1}>
                            <Grid item xs={12}>
                              <Typography fontWeight={700}>
                                {'Ano de conclusão:'}{' '}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>{conclusionYear || '—'}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>
                  );
                })}
              </Grid>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>

          <LoadingButton
            size="large"
            variant="contained"
            color="secondary"
            onClick={handleRemoveUser}
            loading={isRemoving}
            disabled={isRemoving}
          >
            Remover
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
