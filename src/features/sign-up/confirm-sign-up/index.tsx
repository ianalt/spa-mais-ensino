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
}

export default function ConfirmSignUp({
  open,
  onClose,
  onConfirm,
}: ConfirmSignUpProps) {
  const dispatch = useAppDispatch();
  const signUp = useAppSelector(selectSignUp);

  const { isLoading, signUpBody } = signUp;

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

  return (
    <div>
      <Dialog
        open={open || isLoading}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => onClose(true)}
        aria-describedby="sign-up-body-confirmation"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{'Confirmação dos dados'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="sign-up-body-confirmation">
            Antes de prosseguir, certifique-se de que as informações que você
            preencheu estão corretas.
          </DialogContentText>
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
