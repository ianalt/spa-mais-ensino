import {
  Box,
  Chip,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useAppSelector } from '../../app/hooks';
import { getIsMonitorOrTeacher, selectUserProfile } from '../../user/userSlice';
import { Role } from '../../utils/enums/role.enum';

export default function ProfileDetails() {
  const profile = useAppSelector(selectUserProfile);

  const isMonitorOrTeacher = useAppSelector(getIsMonitorOrTeacher);

  const formatRole = () => {
    return profile?.role.split('').reduce((acc, val, i) => {
      return (acc += `${i === 0 ? val.toUpperCase() : val}`);
    }, '');
  };

  const formatCpf = () => {
    return `${profile?.cpf.substring(0, 3)}.${profile?.cpf.substring(
      3,
      6
    )}.${profile?.cpf.substring(6, 9)}-${profile?.cpf.substring(9, 11)}`;
  };

  const formatBirthDate = () => {
    if (!profile) return '—';

    const date = dayjs(profile.birthDate).format('DD/MM/YYYY');

    return date;
  };

  const formatPhoneNumber = (phone: string) => {
    return `(${phone.substring(0, 2)}) ${phone.substring(
      2,
      3
    )} ${phone.substring(3, 7)}-${phone.substring(7, 11)}`;
  };

  return (
    <>
      <Grid item xs={12} container justifyContent={'flex-start'}>
        <Grid item xs={12} my={2}>
          <Divider>
            <Chip label="Dados para acesso" />
          </Divider>
        </Grid>

        <Grid item xs={12} container my={1}>
          <Grid item xs="auto" p={1}>
            <Grid item xs={12}>
              <Typography fontWeight={700}>{'E-mail:'} </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <Link href={`mailto:${profile?.email}`}>{profile?.email}</Link>
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs="auto" container p={1}>
            <Grid item xs={12}>
              <Typography fontWeight={700}>{'Nível de acesso:'} </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{formatRole()}</Typography>
            </Grid>
          </Grid>

          <Grid item xs="auto" container p={1}>
            <Grid item xs={12}>
              <Typography fontWeight={700}>{'Conta ativa?'} </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{profile?.active ? 'Sim' : 'Não'}</Typography>
            </Grid>
          </Grid>

          {!isMonitorOrTeacher ? (
            <></>
          ) : (
            <Grid item xs="auto" container p={1}>
              <Grid item xs={9}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Disciplina:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  {profile?.subject || '—'}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} container justifyContent={'flex-start'}>
        <Grid item xs={12} my={2}>
          <Divider>
            <Chip label="Dados pessoais" />
          </Divider>
        </Grid>

        <Grid item xs={12} container my={1}>
          <Grid item xs="auto" p={1}>
            <Grid item xs={12}>
              <Typography fontWeight={700}>{'Nome:'} </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{profile?.firstName}</Typography>
            </Grid>
          </Grid>

          <Grid item xs="auto" container p={1}>
            <Grid item xs={12}>
              <Typography fontWeight={700}>{'Sobrenome(s):'} </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{profile?.lastName}</Typography>
            </Grid>
          </Grid>

          <Grid item xs="auto" container p={1}>
            <Grid item xs={12}>
              <Typography fontWeight={700}>{'CPF:'} </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{formatCpf()}</Typography>
            </Grid>
          </Grid>

          <Grid item xs="auto" container p={1}>
            <Grid item xs={12}>
              <Typography fontWeight={700}>{'Data de nascimento:'} </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{formatBirthDate()}</Typography>
            </Grid>
          </Grid>

          <Grid item xs="auto" container p={1}>
            <Grid item xs={12}>
              <Typography fontWeight={700}>{'Etnia:'} </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{profile?.ethnicity}</Typography>
            </Grid>
          </Grid>

          <Grid item xs="auto" container p={1}>
            <Grid item xs={12}>
              <Typography fontWeight={700}>{'Gênero:'} </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{profile?.gender}</Typography>
            </Grid>
          </Grid>

          {profile?.role === Role.MONITOR ||
          profile?.role === Role.PROFESSOR ||
          profile?.role === Role.ADMIN ? (
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
                  R${profile?.financialInfo.generalIncome}
                </Typography>
              </Grid>
            </Grid>
          )}

          {profile?.role === Role.MONITOR ||
          profile?.role === Role.PROFESSOR ||
          profile?.role === Role.ADMIN ? (
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
                  {profile?.financialInfo.totalHouseHoldMembers}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid item xs={4} container p={1}>
          <Grid item xs={12}>
            <Typography fontWeight={700}>{'Números de telefone:'} </Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="flex-start">
            {profile ? (
              profile.phoneNumbers.map((item) => {
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

      <Grid item xs={12} container justifyContent={'flex-start'}>
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
              <Typography>{profile?.address.cep}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} container>
            <Grid item xs={5} container p={1}>
              <Grid item xs={12}>
                <Typography fontWeight={700}>{'Endereço:'} </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{profile?.address.street}</Typography>
              </Grid>
            </Grid>

            <Grid item xs={6} container p={1}>
              <Grid item xs={4}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Número:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{profile?.address.streetNumber}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={2} container p={1}>
              <Grid item xs={12}>
                <Typography fontWeight={700}>{'Bairro:'} </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{profile?.address.neighborhood}</Typography>
              </Grid>
            </Grid>

            <Grid item xs={5} container p={1}>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Complemento:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{profile?.address.complement}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4} container p={1}>
              <Grid item xs={12}>
                <Typography fontWeight={700}>{'Cidade:'} </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{profile?.address.city}</Typography>
              </Grid>
            </Grid>

            <Grid item xs={1} container p={1}>
              <Grid item xs={12}>
                <Typography fontWeight={700}>{'UF:'} </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{profile?.address.uf}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {profile?.role === Role.ADMIN ? (
        <></>
      ) : (
        <>
          <Grid item xs={12} my={2}>
            <Divider>
              <Chip label="Formação acadêmica" />
            </Divider>
          </Grid>

          <Grid item xs={12} container justifyContent="space-evenly" my={1}>
            {profile?.educationInfoList.map((educationInfo, index) => {
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
                      {profile?.role === Role.ESTUDANTE ? (
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
    </>
  );
}
