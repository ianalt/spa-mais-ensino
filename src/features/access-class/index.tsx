import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import {
  CardMedia,
  Fab,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getClass, selectClasses } from '../../slices/classesSlice';
import { selectUser } from '../../user/userSlice';
import { FileType } from '../../utils/enums/file-type.enum';
import Edit from '@mui/icons-material/Edit';
import { Role } from '../../utils/enums/role.enum';
import NotificationAlert from '../notification-alert';
import EditClassTitle from './EditClassTitle';

export default function ClassPage() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const classId = params.classId ? parseInt(params.classId) : 0;
  const user = useAppSelector(selectUser);
  const classes = useAppSelector(selectClasses);
  const { status, selected } = classes;

  const [openEditTitleDialog, setOpenEditTitleDialog] =
    useState<boolean>(false);
  const [openEditCategoryDialog, setOpenEditCategoryDialog] =
    useState<boolean>(false);
  const [openEditClassVideoDialog, setOpenEditClassVideoDialog] =
    useState<boolean>(false);
  const [openEditExtraFilesDialog, setOpenEditExtraFilesDialog] =
    useState<boolean>(false);

  const [openEditTitleAlert, setOpenEditTitleAlert] = useState<boolean>(false);
  const [openEditCategoryAlert, setOpenEditCategoryAlert] =
    useState<boolean>(false);
  const [openEditClassVideoAlert, setOpenEditClassVideoAlert] =
    useState<boolean>(false);
  const [openEditExtraFilesAlert, setOpenEditExtraFilesAlert] =
    useState<boolean>(false);

  const handleOpenEditTitleDialog = () => setOpenEditTitleDialog(true);
  const handleCloseEditTitleDialog = () => setOpenEditTitleDialog(false);

  const handleOpenEditCategoryDialog = () => setOpenEditCategoryDialog(true);
  const handleCloseEditCategoryDialog = () => setOpenEditCategoryDialog(false);

  const handleOpenEditClassVideoDialog = () =>
    setOpenEditClassVideoDialog(true);
  const handleCloseEditClassVideoDialog = () =>
    setOpenEditClassVideoDialog(false);

  const handleOpenEditExtraFilesDialog = () =>
    setOpenEditExtraFilesDialog(true);
  const handleCloseEditExtraFilesDialog = () =>
    setOpenEditExtraFilesDialog(false);

  const handleOpenEditTitleAlert = () => setOpenEditTitleAlert(true);
  const handleCloseEditTitleAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEditTitleAlert(false);
  };

  const handleOpenEditCategoryAlert = () => setOpenEditCategoryAlert(true);
  const handleCloseEditCategoryAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEditCategoryAlert(false);
  };

  const handleOpenEditClassVideoAlert = () => setOpenEditClassVideoAlert(true);
  const handleCloseEditClassVideoAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEditClassVideoAlert(false);
  };

  const handleOpenEditExtraFilesAlert = () => setOpenEditExtraFilesAlert(true);
  const handleCloseEditExtraFilesAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEditExtraFilesAlert(false);
  };

  const resetFields = () => {
    handleCloseEditTitleDialog();
    handleCloseEditCategoryDialog();
    handleCloseEditClassVideoDialog();
    handleCloseEditExtraFilesDialog();
  };

  //TODO SOLVE DOWNLOADS
  const handleDownloadFile = (path: string) => {
    const fullPath = `${path}/download`;
    window.open(fullPath);
  };

  const handleDisplay = () => {
    if (user.role === Role.ADMIN || user.role === Role.PROFESSOR) return 'flex';

    return 'none';
  };

  useEffect(() => {
    resetFields();
    dispatch(getClass(classId));
    document.title = `${selected?.title} | +Ensino`;
  }, []);

  return (
    <>
      <Grid container p={1} m={2}>
        {status === 'loading' ? (
          <Grid item xs={12} container>
            <LinearProgress />
          </Grid>
        ) : (
          <Paper elevation={2}>
            <Grid item xs={12} container p={2}>
              {/* título */}
              <Grid item xs={12} container mb={1}>
                <Grid item xs={12} container>
                  <Grid item xs="auto">
                    <Typography variant="h3">{selected?.title}</Typography>
                  </Grid>
                  <Grid item xs="auto" px={1} display={handleDisplay}>
                    <Tooltip title="Editar título" arrow placement="right">
                      <span>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={handleOpenEditTitleDialog}
                          //   disabled={status === 'loading'}
                        >
                          <EditIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Grid>
                </Grid>

                <Grid item xs={12} container>
                  <Grid item xs="auto">
                    <Typography variant="h5">
                      {selected?.category.name} -{' '}
                      {selected?.category.subject.name}
                    </Typography>
                  </Grid>
                  <Grid item xs="auto" px={1} display={handleDisplay}>
                    <Tooltip title="Editar categoria" arrow placement="right">
                      <span>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={handleOpenEditCategoryDialog}
                          //   disabled={status === 'loading'}
                        >
                          <EditIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    <em>
                      Criada por{' '}
                      {`${selected?.createdBy.firstName} ${selected?.createdBy.lastName}`}{' '}
                      em{' '}
                      {selected?.createdAt
                        ? format(
                            new Date(`${selected?.createdAt}`),
                            'dd/MM/yyyy, HH:mm:ss'
                          )
                        : '—'}
                      {selected?.updatedAt &&
                        ` | Atualizada em: ${format(
                          new Date(`${selected?.updatedAt}`),
                          'dd/MM/yyyy, HH:mm:ss'
                        )}`}
                    </em>
                  </Typography>
                </Grid>

                <Grid xs={12} display={handleDisplay} mt={1}>
                  <Grid item xs="auto" mr={3}>
                    <Fab
                      variant="extended"
                      color="secondary"
                      size="small"
                      onClick={handleOpenEditClassVideoDialog}
                    >
                      <EditIcon />
                      <Typography>Videoaula</Typography>
                    </Fab>
                  </Grid>

                  <Grid item xs="auto">
                    <Fab
                      variant="extended"
                      color="secondary"
                      size="small"
                      onClick={handleOpenEditExtraFilesDialog}
                    >
                      <EditIcon />
                      <Typography>Materiais complementares</Typography>
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                container
                justifyContent={
                  selected?.classFiles &&
                  selected.classFiles.filter(
                    (file) => file.fileType === FileType.MATERIAL
                  ).length <= 0
                    ? 'center'
                    : 'flex-start'
                }
              >
                {/* vídeo */}
                <Grid item xs={9}>
                  <CardMedia
                    component="video"
                    controls
                    height="auto"
                    src={'/videos/Lei da Inércia Parte 1.mp4'}
                  />
                </Grid>
                {/* materiais */}
                {selected?.classFiles &&
                  selected.classFiles.filter(
                    (file) => file.fileType === FileType.MATERIAL
                  ).length > 0 && (
                    <Grid item xs={3} container px={2}>
                      <Paper elevation={1}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant="h5" textAlign="center">
                              Materiais complementares
                            </Typography>
                          </Grid>

                          <Grid item xs={12}>
                            <List>
                              {selected?.classFiles &&
                                selected.classFiles.filter(
                                  (file) => file.fileType === FileType.MATERIAL
                                ).length > 0 &&
                                selected.classFiles
                                  .filter(
                                    (file) =>
                                      file.fileType === FileType.MATERIAL
                                  )
                                  .map((file) => {
                                    const { fileName, contentType, path } =
                                      file;

                                    return (
                                      <ListItem>
                                        <ListItemButton
                                          component="a"
                                          href="#"
                                          onClick={() =>
                                            handleDownloadFile(path)
                                          }
                                        >
                                          <ListItemIcon>
                                            <FileDownloadIcon color="secondary" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primary={
                                              fileName.length > 20
                                                ? `${fileName.substring(
                                                    0,
                                                    20
                                                  )}... .${contentType.substring(
                                                    6
                                                  )}`
                                                : fileName
                                            }
                                          />
                                        </ListItemButton>
                                      </ListItem>
                                    );
                                  })}
                            </List>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  )}
              </Grid>
            </Grid>
          </Paper>
        )}
      </Grid>

      <EditClassTitle
        open={openEditTitleDialog}
        onEdit={() => {
          dispatch(getClass(selected?.id || 0));
          handleOpenEditTitleAlert();
        }}
        onClose={handleCloseEditTitleDialog}
        title={selected?.title || ''}
      />

      <EditClassCategory
        open={openEditCategoryDialog}
        onEdit={() => {
          dispatch(getClass(selected?.id || 0));
          handleOpenEditCategoryAlert();
        }}
        onClose={handleCloseEditCategoryDialog}
        category={selected?.category || null}
      />

      <EditClassVideo
        open={openEditClassVideoDialog}
        onEdit={() => {
          dispatch(getClass(selected?.id || 0));
          handleOpenEditClassVideoAlert();
        }}
        onClose={handleCloseEditClassVideoDialog}
        classVideo={selected?.classFiles.find(
          (file) => file.fileType === FileType.VIDEOAULA
        )}
      />

      <EditClassExtraFiles
        open={openEditExtraFilesDialog}
        onEdit={() => {
          dispatch(getClass(selected?.id || 0));
          handleOpenEditExtraFilesAlert();
        }}
        onClose={handleCloseEditExtraFilesDialog}
        classVideo={selected?.classFiles.filter(
          (file) => file.fileType === FileType.MATERIAL
        )}
      />

      <NotificationAlert
        open={
          openEditTitleAlert && classes.status === 'idle' && !classes.isUpdating
        }
        onClose={handleCloseEditTitleAlert}
        severity="success"
        status="Sucesso"
        message="Título editado com sucesso"
      />

      <NotificationAlert
        open={
          openEditTitleAlert &&
          classes.status === 'failed' &&
          !classes.isUpdating
        }
        onClose={handleCloseEditTitleAlert}
        severity="error"
        status="Erro"
        message="Não foi possível editar o título"
      />

      <NotificationAlert
        open={
          openEditCategoryAlert &&
          classes.status === 'idle' &&
          !classes.isUpdating
        }
        onClose={handleCloseEditCategoryAlert}
        severity="success"
        status="Sucesso"
        message="Categoria editada com sucesso"
      />

      <NotificationAlert
        open={
          openEditCategoryAlert &&
          classes.status === 'failed' &&
          !classes.isUpdating
        }
        onClose={handleCloseEditCategoryAlert}
        severity="error"
        status="Erro"
        message="Não foi possível editar a categoria"
      />

      <NotificationAlert
        open={
          openEditClassVideoAlert &&
          classes.status === 'idle' &&
          !classes.isUpdating
        }
        onClose={handleCloseEditClassVideoAlert}
        severity="success"
        status="Sucesso"
        message="Videoaula editada com sucesso"
      />

      <NotificationAlert
        open={
          openEditClassVideoAlert &&
          classes.status === 'failed' &&
          !classes.isUpdating
        }
        onClose={handleCloseEditClassVideoAlert}
        severity="error"
        status="Erro"
        message="Não foi possível editar a videoaula"
      />

      <NotificationAlert
        open={
          openEditExtraFilesAlert &&
          classes.status === 'idle' &&
          !classes.isUpdating
        }
        onClose={handleCloseEditExtraFilesAlert}
        severity="success"
        status="Sucesso"
        message="Materiais complementares editados com sucesso"
      />

      <NotificationAlert
        open={
          openEditExtraFilesAlert &&
          classes.status === 'failed' &&
          !classes.isUpdating
        }
        onClose={handleCloseEditExtraFilesAlert}
        severity="error"
        status="Erro"
        message="Não foi possível editar os materiais complementares"
      />
    </>
  );
}
