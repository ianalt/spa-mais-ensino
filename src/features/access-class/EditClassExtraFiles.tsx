import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  Slide,
  Typography,
  styled,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  editClassVideo,
  getClassOptions,
  resetErrors,
  selectClasses,
} from '../../slices/classesSlice';
import { selectUser } from '../../user/userSlice';
import { FileSize } from '../../utils/enums/file-size.enum';
import NotificationAlert from '../notification-alert';
import { EditClassVideoBody } from './types/edit-class-video-body';
import { EditClassExtraFilesBody } from './types/edit-class-extra-files-body';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface EditClassExtraFilesProps {
  open: boolean;
  onClose: any;
  onEdit: any;
}

export default function EditClassExtraFiles({
  open,
  onClose,
  onEdit,
}: EditClassExtraFilesProps) {
  const dispatch = useAppDispatch();

  const classes = useAppSelector(selectClasses);
  const { status, error, selected, isUpdating } = classes;

  const [isAnyExtraFileSizeInvalid, setIsAnyExtraFileSizeInvalid] =
    useState<boolean>(false);

  const [extraFiles, setExtraFiles] = useState<FileList | null>(null);

  const validateFileSize = (value: FileList | null, maxSize: FileSize) => {
    if (value !== null && value.length === 1) {
      return value[0].size <= maxSize;
    }

    if (value !== null && value.length > 1) {
      const length = value.length;

      for (let i = 0; i < length; ++i) {
        const item = value.item(i);

        if (item !== null && item.size > maxSize) return false;
      }
    }

    return true;
  };

  const handleListExtraFilesNames = () => {
    if (extraFiles && extraFiles.length > 0) {
      const length = extraFiles.length;
      const names = [];
      for (let i = 0; i < length; ++i) {
        const name = extraFiles.item(i)?.name || null;
        names.push(name);
      }

      return (
        <List>
          {names.map((item, index) => {
            return (
              <ListItem key={`extra-file-name-${index}`}>
                <em>{item}</em>
              </ListItem>
            );
          })}
        </List>
      );
    }
  };

  const [openEditFailedAlert, setOpenEditFailedAlert] =
    useState<boolean>(false);

  const resetFields = () => {
    setExtraFiles(null);
  };

  const handleEditClassExtraFiles = async () => {
    const body: EditClassExtraFilesBody = {
      classId: selected?.id || 0,
      extraFiles: extraFiles && extraFiles.length > 0 ? extraFiles : null,
    };

    try {
      //   await dispatch(editClassExtraFiles(body)).unwrap();

      onEdit();
      handleClose();
    } catch (rejectedValueOrSerializedError) {
      handleOpenEditFailedAlert();
    }
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const handleOpenEditFailedAlert = () => {
    setOpenEditFailedAlert(true);
  };

  const handleCloseEditFailedAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEditFailedAlert(false);
  };

  useEffect(() => {
    if (open) {
      resetFields();

      dispatch(resetErrors());
      dispatch(getClassOptions());
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="class-edit-video-dialog-slide-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>{'Editar videoaula'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="class-edit-video-dialog-slide-description">
            Escolha um vídeo para a aula. <strong>Confirme</strong> a opção
            antes de clicar no botão <strong>Salvar mudanças</strong>.
          </DialogContentText>

          <Grid container justifyContent="flex-start">
            <Grid item xs={12}>
              <NotificationAlert
                open={status === 'failed' && openEditFailedAlert}
                onClose={handleCloseEditFailedAlert}
                severity="error"
                status="Erro"
                message="Erro(s) detectado(s) durante edição de videoaula"
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

          <Grid container justifyContent="center">
            <Grid item xs={12} container justifyContent="center">
              {isAnyExtraFileSizeInvalid && (
                <Grid item xs={6} m={2}>
                  <Alert severity="warning" sx={{ width: '100%' }}>
                    <strong>Atenção.</strong> O tamanho de um material
                    complementar não pode ultrapassar 5MB.
                  </Alert>
                </Grid>
              )}
            </Grid>

            <Grid
              item
              xs={12}
              px={1}
              container
              alignItems="center"
              flexDirection="column"
              mt={2}
            >
              <Grid item xs="auto" p={1}>
                {!extraFiles || extraFiles.length <= 0 ? (
                  <em>Nenhum material selecionado</em>
                ) : (
                  handleListExtraFilesNames()
                )}
              </Grid>
              <Grid item xs="auto" container p={1}>
                <Grid item xs={12}>
                  <Button
                    component="label"
                    variant="contained"
                    color="secondary"
                    disabled={isUpdating || status === 'loading'}
                    startIcon={<CloudUploadIcon />}
                  >
                    Adicionar materiais complementares
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const value =
                          event.target.files && event.target.files.length > 0
                            ? event.target.files
                            : null;

                        setIsAnyExtraFileSizeInvalid(
                          !validateFileSize(value, FileSize.EXTRA_FILE)
                        );

                        setExtraFiles(value);
                      }}
                      accept=".pdf, .docx, .doc, .txt, .png, .jpg"
                      multiple
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Fechar
          </Button>

          <LoadingButton
            variant="contained"
            // onClick={handleEditClassExtraFiles}
            onClick={() => alert('SHOW!')}
            loading={status === 'loading' || isUpdating}
            // disabled={
            //   !extraFiles ||
            //   extraFiles.length <= 0 ||
            //   isUpdating ||
            //   status === 'loading'
            // }
            disabled
          >
            Salvar mudanças
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
