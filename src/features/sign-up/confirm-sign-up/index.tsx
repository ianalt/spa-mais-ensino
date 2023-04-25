import { Chip, Divider, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import dayjs from 'dayjs';
import { forwardRef } from 'react';
import { SignUpBody } from '../../../utils/options/types/sign-up-body';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { LoadingButton } from '@mui/lab';
import { performSignUp, selectSignUp } from '../signUpSlice';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmSignUpProps {
  open: boolean;
  onClose: any;
  onConfirm: any;
  signUpBody: SignUpBody;
}

export default function ConfirmSignUp({
  open,
  onClose,
  onConfirm,
  signUpBody,
}: ConfirmSignUpProps) {
  const dispatch = useAppDispatch();
  const signUp = useAppSelector(selectSignUp);

  const { isLoading } = signUp;

  const { user, address, financialInfo, phoneNumbers, educationInfo } =
    signUpBody;

  const handleSignUp = () => {
    dispatch(performSignUp(signUpBody));
  };

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    handleSignUp();
    onConfirm();
  };

  const formatCpf = () => {
    return `${user.cpf.substring(0, 3)}.${user.cpf.substring(
      3,
      6
    )}.${user.cpf.substring(6, 9)}-${user.cpf.substring(9, 11)}`;
  };

  // não usando date-fns porque n tá funcionando
  const formatBirthDate = () => {
    const date = dayjs(user.birthDate).format('DD/MM/YYYY');

    return date;
  };

  return (
    <div>
      <Dialog
        open={open || isLoading}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => onClose(true)}
        aria-describedby="sign-up-body-confirmation"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>{'Confirmação dos dados'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="sign-up-body-confirmation">
            {
              'Aqui estão as informações que você preencheu. Confirme-as antes de finalizar seu cadastro. '
            }
          </DialogContentText>

          <Grid container justifyContent={'flex-start'}>
            <Grid item xs={12} my={2}>
              <Divider>
                <Chip label="Dados Básicos" />
              </Divider>
            </Grid>

            {/* info pessoal essencial */}
            <Grid container xs={12} my={1}>
              {/* Nome */}
              <Grid item container xs={'auto'} py={1} pr={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Nome:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{user.firstName}</Typography>
                </Grid>
              </Grid>

              {/* Sobrenome */}
              <Grid item container xs={'auto'} py={1} pr={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Sobrenome(s):'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{user.lastName}</Typography>
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
                  <Typography>{user.email}</Typography>
                </Grid>
              </Grid>

              {/* Informações educacionais */}

              <Grid item xs={12} my={2}>
                <Divider>
                  <Chip label="Formação Acadêmica" />
                </Divider>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                  {educationInfo.institutionName}
                </Typography>
              </Grid>

              <Grid item xs={12} container>
                <Grid item xs={12}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {educationInfo.schoolingLevel}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {`${educationInfo.startYear} — ${
                      educationInfo.conclusionYear || 'Presente'
                    }`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Fechar
          </Button>

          <LoadingButton
            variant="contained"
            onClick={handleConfirm}
            loading={isLoading}
            disabled={isLoading}
          >
            Cadastrar-se
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
