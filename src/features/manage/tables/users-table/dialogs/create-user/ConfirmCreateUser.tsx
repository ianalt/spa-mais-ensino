import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmCreateUserProps {
  open: boolean;
  onClose: any;
  onConfirm: any;
}

export default function ConfirmCreateUser({
  open,
  onClose,
  onConfirm,
}: ConfirmCreateUserProps) {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => onClose()}
        aria-describedby="create-user-confirmation"
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

          <LoadingButton variant="contained" onClick={handleConfirm}>
            Criar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
