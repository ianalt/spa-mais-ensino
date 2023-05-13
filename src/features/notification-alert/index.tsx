import { Alert, AlertColor, Snackbar } from '@mui/material';

interface NotificationAlertProps {
  open: boolean;
  onClose: any;
  severity?: AlertColor;
  status: string;
  message: string;
}

export default function NotificationAlert({
  open,
  onClose,
  severity,
  status,
  message,
}: NotificationAlertProps) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={() => onClose()}>
      <Alert
        onClose={() => onClose()}
        severity={severity}
        sx={{ width: '100%' }}
      >
        <strong>{status}.</strong> {message}.
        {status === 'Erro' ? (
          <strong>Por favor, tente novamente.</strong>
        ) : null}
      </Alert>
    </Snackbar>
  );
}
