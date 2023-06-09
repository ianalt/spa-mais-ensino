import { LoadingButton } from '@mui/lab';
import { Alert, Grid, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import NotificationAlert from '../../../../../notification-alert';
import {
  createNewKnowledgeArea,
  resetErrors,
  selectKnowledgeAreasTable,
} from '../../knowledgeAreasTableSlice';
import { CreateKnowledgeAreaBody } from './types/create-knowledge-area-body';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CreateKnowledgeAreaProps {
  open: boolean;
  onClose: any;
  onCreate: any;
}

export default function CreateKnowledgeArea({
  open,
  onClose,
  onCreate,
}: CreateKnowledgeAreaProps) {
  const dispatch = useAppDispatch();
  const knowledgeAreasTable = useAppSelector(selectKnowledgeAreasTable);

  const { status, isCreating, error } = knowledgeAreasTable;

  const [openCreateFailedAlert, setOpenCreateFailedAlert] =
    useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const resetFields = () => {
    setName('');
    setDescription('');
  };

  const handleCreateKnowledgeArea = async () => {
    const body: CreateKnowledgeAreaBody = {
      name,
      description,
    };

    try {
      await dispatch(createNewKnowledgeArea(body)).unwrap();

      onCreate();
      handleClose();
    } catch (rejectedValueOrSerializedError) {
      handleOpenCreateFailedAlert();
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
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="create-knowledge-area-dialog-slide-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{'Adicionar nova área de conhecimento'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="create-knowledge-area-dialog-slide-description">
            Preencha as informações abaixo para criar uma nova área de
            conhecimento. <strong>Confirme</strong> os dados antes de clicar no
            botão <strong>Criar</strong>.
          </DialogContentText>

          <Grid container justifyContent="flex-start">
            <Grid item xs={12}>
              <NotificationAlert
                open={status === 'failed' && openCreateFailedAlert}
                onClose={handleCloseCreateFailedAlert}
                severity="error"
                status="Erro"
                message="Erro(s) detectado(s) durante registro de nova área de conhecimento"
              />
            </Grid>
            {status === 'failed' && (
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
            )}
          </Grid>

          <Grid container justifyContent={'flex-start'} py={2}>
            <Grid item xs={4}>
              <TextField
                id="name"
                margin="normal"
                required
                autoFocus
                fullWidth
                label="Nome"
                placeholder="Digite o nome da área de conhecimento..."
                name="name"
                value={name}
                variant="outlined"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="description"
                margin="normal"
                fullWidth
                name="description"
                label="Descrição"
                variant="outlined"
                placeholder="Digite uma descrição para a área de conhecimento..."
                value={description}
                multiline
                rows={6}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Fechar
          </Button>

          <LoadingButton
            variant="contained"
            onClick={handleCreateKnowledgeArea}
            loading={isCreating || status === 'loading'}
            disabled={!name || isCreating || status === 'loading'}
          >
            Criar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
