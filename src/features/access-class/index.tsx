import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  CardMedia,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getClass, selectClasses } from '../../slices/classesSlice';
import { selectUser } from '../../user/userSlice';
import { FileType } from '../../utils/enums/file-type.enum';

export default function ClassPage() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const classId = params.classId ? parseInt(params.classId) : 0;

  const classes = useAppSelector(selectClasses);

  const { status, selected } = classes;

  const handleDownloadFile = (path: string) => {
    const fullPath = `${path}/download`;
    window.open(fullPath);
  };

  useEffect(() => {
    dispatch(getClass(classId));
    document.title = `${selected?.title} | +Ensino`;
  }, []);

  return (
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
              <Grid item xs={12}>
                <Typography variant="h3">{selected?.title}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h5">
                  {selected?.category.name} - {selected?.category.subject.name}
                </Typography>
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
                                  (file) => file.fileType === FileType.MATERIAL
                                )
                                .map((file) => {
                                  const { fileName, contentType, path } = file;

                                  return (
                                    <ListItem>
                                      <ListItemButton
                                        component="a"
                                        href="#"
                                        onClick={() => handleDownloadFile(path)}
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

              <Grid item xs={4}>
                <Paper></Paper>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Grid>
  );
}
