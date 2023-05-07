import { Chip, Divider, Grid, Typography } from '@mui/material';
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
import { Dispatch, Fragment, SetStateAction, forwardRef } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { selectUsersTable, setSelected } from '../../usersTableSlice';
import EducationInfoDetails from '../components/education-info-details';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface UserDetailsProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export default function UserDetails({ open, onClose }: UserDetailsProps) {
  const usersTable = useAppSelector(selectUsersTable);
  const { selected } = usersTable;

  const handleClose = () => {
    onClose(true);
    setSelected(undefined);
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

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => onClose(true)}
        aria-describedby="user-details-dialog-slide-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>{'Detalhes do usuário'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="user-details-dialog-slide-description">
            {'Aqui estão as informações sobre este usuário: '}
          </DialogContentText>

          <Grid container justifyContent={'flex-start'}>
            <Grid item xs={12} my={2}>
              <Divider>
                <Chip label="Dados Básicos" />
              </Divider>
            </Grid>

            {/* info pessoal essencial */}
            <Grid item container xs={12} my={1}>
              {/* Nome */}
              <Grid item container xs={'auto'} py={1} pr={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Nome:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.firstName}</Typography>
                </Grid>
              </Grid>

              {/* Sobrenome */}
              <Grid item container xs={'auto'} py={1} pr={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Sobrenome(s):'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.lastName}</Typography>
                </Grid>
              </Grid>

              {/* Data de nascimento */}
              <Grid item container xs={'auto'} py={1} pr={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>
                    {'Data de nascimento:'}{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {/* <Typography>{formatBirthDate()}</Typography> */}
                  <Typography>{formatBirthDate()}</Typography>
                </Grid>
              </Grid>

              {/* CPF */}
              <Grid item container xs={'auto'} py={1} pr={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'CPF:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{formatCpf()}</Typography>
                </Grid>
              </Grid>

              {/* E-mail */}
              <Grid item container xs={'auto'} py={1} pr={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'E-mail:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.email}</Typography>
                </Grid>
              </Grid>

              <Grid item container xs={'auto'} py={1} pr={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Acesso:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{formatRole()}</Typography>
                </Grid>
              </Grid>

              {selected?.role === 'monitor' ||
              selected?.role === 'professor' ? (
                <Grid item container xs={'auto'} py={1} pr={1}>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>{'Disciplina:'} </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>{selected?.subject || '—'}</Typography>
                  </Grid>
                </Grid>
              ) : null}

              <Grid item container xs={'auto'} py={1} pr={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Ativo?'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.active ? 'Sim' : 'Não'}</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Informações educacionais */}
            {selected?.role !== 'admin' ? (
              <>
                <Grid item xs={12} my={2}>
                  <Divider>
                    <Chip label="Formação Acadêmica" />
                  </Divider>
                </Grid>

                <Grid item container xs={12}>
                  {selected ? (
                    <List
                      sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                      }}
                    >
                      {selected.educationInfoList.map((educationInfo, i) => {
                        return (
                          <Fragment>
                            <EducationInfoDetails
                              educationInfo={educationInfo}
                            />
                            {i + 1 !== selected.educationInfoList.length ? (
                              <Divider variant="fullWidth" component="li" />
                            ) : null}
                          </Fragment>
                        );
                      })}
                    </List>
                  ) : null}
                </Grid>
              </>
            ) : null}

            {selected ? (
              selected.comments.length > 0 ? (
                <Grid item xs={12}>
                  <Divider>
                    <Chip label="Comentários Publicados" />
                  </Divider>
                </Grid>
              ) : null
            ) : null}

            {selected ? (
              selected.comments.length > 0 ? (
                <Grid item container xs={6}>
                  <Grid item xs={12}>
                    {selected.comments.map((comment) => {
                      return (
                        <Typography key={comment.id}>{`${comment}`}</Typography>
                      );
                    })}
                  </Grid>
                </Grid>
              ) : null
            ) : null}
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
