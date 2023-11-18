import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Alert,
  Autocomplete,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
  createFilterOptions,
  styled,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  createNewClass,
  getClassOptions,
  resetErrors,
  selectClasses,
  selectSubjectOptionsForClass,
} from '../../slices/classesSlice';
import {
  getTeacherOrMonitorSubject,
  selectSubjects,
} from '../../slices/subjectsSlice';
import { selectUser } from '../../user/userSlice';
import { Role } from '../../utils/enums/role.enum';
import { CreateClassBody } from '../manage/tables/classes-table/types/create-class-body';
import NotificationAlert from '../notification-alert';
import {
  BasicCategoryInfo,
  SubjectWithCategories,
} from './types/class-options';
import { FileSize } from '../../utils/enums/file-size.enum';

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

export default function CreateClassForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const classes = useAppSelector(selectClasses);
  const { status, isCreating, error } = classes;

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

  const [isVideoClassSizeInvalid, setIsVideoClassSizeInvalid] =
    useState<boolean>(false);
  const [isAnyExtraFileSizeInvalid, setIsAnyExtraFileSizeInvalid] =
    useState<boolean>(false);

  const user = useAppSelector(selectUser);
  const subjects = useAppSelector(selectSubjects);

  const { selectedSubject } = subjects;

  const subjectsList = useAppSelector(selectSubjectOptionsForClass);

  const [classTitle, setClassTitle] = useState<string>('');
  const [chosenSubject, setChosenSubject] =
    useState<SubjectWithCategories | null>(null);
  const [categories, setCategories] = useState<BasicCategoryInfo[]>([]);
  const [chosenCategory, setChosenCategory] =
    useState<BasicCategoryInfo | null>(null);
  const [videoClassFile, setVideoClassFile] = useState<FileList | null>(null);
  const [extraFiles, setExtraFiles] = useState<FileList | null>(null);

  const autoCompleteSubjectOptions = createFilterOptions<SubjectWithCategories>(
    {
      matchFrom: 'start',
      stringify: (option) => option.name,
    }
  );

  const autoCompleteCategoryOptions = createFilterOptions<BasicCategoryInfo>({
    matchFrom: 'start',
    stringify: (option) => option.name,
  });

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

  const [openCreateClassAlert, setOpenCreateClassAlert] =
    useState<boolean>(false);
  const handleOpenCreateClassAlert = () => {
    setOpenCreateClassAlert(true);
  };

  const handleCloseCreateClassAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenCreateClassAlert(false);
  };

  const [openCreateClassFailedAlert, setOpenCreateFailedAlert] =
    useState<boolean>(false);
  const handleOpenCreateClassFailedAlert = () => {
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

  const handleCreateNewClass = async () => {
    const body: CreateClassBody = {
      title: classTitle,
      categoryId: chosenCategory?.id || 0,
      videoClassFile:
        videoClassFile && videoClassFile.length === 1
          ? videoClassFile[0]
          : null,
      extraFiles: extraFiles && extraFiles.length > 0 ? extraFiles : null,
    };

    try {
      await dispatch(createNewClass(body)).unwrap();

      handleOpenCreateClassAlert();

      resetFields();
      resetErrors();
    } catch (rejectedValueOrSerializedError) {
      handleOpenCreateClassFailedAlert();
    }
  };

  const handleSetCategory = () => {
    if (user.role === Role.PROFESSOR) {
      const [subjectOption] = subjectsList.filter(
        (item) => item.id === selectedSubject?.id
      );

      if (subjectOption !== undefined || subjectOption !== null) {
        setChosenSubject(subjectOption);
        setCategories(subjectOption.categories);
      }
    }
  };

  const handleReturnToPage = () => {
    resetFields();
    resetErrors();

    if (user.role === Role.ADMIN) navigate('/mais-ensino/gerenciamento');

    if (user.role === Role.PROFESSOR) navigate('/mais-ensino/minha-disciplina');
  };

  const resetFields = () => {
    setClassTitle('');
    setChosenSubject(null);
    setCategories([]);
    setChosenCategory(null);
    setVideoClassFile(null);
    setExtraFiles(null);
    setIsVideoClassSizeInvalid(false);
    setIsAnyExtraFileSizeInvalid(false);
  };

  useEffect(() => {
    resetFields();
    dispatch(getClassOptions());
    dispatch(resetErrors());

    if (user.role === Role.PROFESSOR) {
      if (selectedSubject === null || selectedSubject === undefined) {
        dispatch(getTeacherOrMonitorSubject());

        if (selectedSubject === null || selectedSubject === undefined) {
          navigate('*');
        }
      }
    }
  }, []);

  return (
    <Grid item xs={12} container justifyContent="center" mt={2}>
      <Grid container justifyContent="flex-start">
        <Grid item xs={12}>
          <NotificationAlert
            open={status === 'failed' && openCreateClassFailedAlert}
            onClose={handleCloseCreateFailedAlert}
            severity="error"
            status="Erro"
            message="Erro(s) detectado(s) durante criação de nova aula"
          />
        </Grid>
        {status === 'failed' && (
          <Grid item xs={12} container m={1}>
            <Alert severity="error">
              <Typography variant="body1">
                <strong>Erro ao criar nova aula. </strong>
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

        {status === 'idle' && !error && (
          <NotificationAlert
            open={
              openCreateClassAlert &&
              classes.status === 'idle' &&
              !classes.isCreating
            }
            onClose={handleCloseCreateClassAlert}
            severity="success"
            status="Sucesso"
            message="Aula criada com sucesso"
          />
        )}
      </Grid>

      <Grid item xs={5}>
        {isVideoClassSizeInvalid && (
          <Grid item xs={12} m={2}>
            <Alert severity="warning" sx={{ width: '100%' }}>
              <strong>Atenção.</strong> O tamanho da videoaula não pode ser
              maior que 50MB.
            </Alert>
          </Grid>
        )}
        {isAnyExtraFileSizeInvalid && (
          <Grid item xs={12} m={2}>
            <Alert severity="warning" sx={{ width: '100%' }}>
              <strong>Atenção.</strong> O tamanho de um material complementar
              não pode ultrapassar 5MB.
            </Alert>
          </Grid>
        )}
      </Grid>

      <Grid item xs={8}>
        <TextField
          label="Título"
          placeholder="Digite um título para a aula"
          fullWidth
          required
          value={classTitle}
          onChange={(event) => setClassTitle(event.target.value)}
        />
      </Grid>

      <Grid item xs={8} container justifyContent="space-between" mt={1}>
        <Grid
          item
          xs={5}
          // sx={{ border: '1px solid blue' }}
          display={user.role === Role.PROFESSOR ? 'none' : 'flex'}
        >
          <Autocomplete
            id="create-class-form-subject-option"
            disabled={user.role === Role.PROFESSOR}
            noOptionsText="Nenhuma opção encontrada"
            options={subjectsList}
            value={chosenSubject}
            fullWidth
            filterOptions={autoCompleteSubjectOptions}
            onChange={(event: any, newValue: SubjectWithCategories | null) => {
              setChosenSubject(newValue);

              if (newValue) {
                const categoryOptions = newValue.categories;

                setCategories(categoryOptions);
              } else {
                setCategories([]);
                setChosenCategory(null);
              }
            }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                required
                fullWidth
                label="Disciplina"
              />
            )}
          />
        </Grid>
        <Grid item xs={5}>
          <Autocomplete
            onFocus={handleSetCategory}
            id="create-class-form-category-option"
            noOptionsText="Nenhuma opção encontrada"
            fullWidth
            options={categories}
            value={chosenCategory}
            filterOptions={autoCompleteCategoryOptions}
            onChange={(event: any, newValue: BasicCategoryInfo | null) => {
              setChosenCategory(newValue);
            }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                required
                fullWidth
                label="Categoria"
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid item xs={8} my={2}>
        <Divider />
      </Grid>

      <Grid
        item
        xs={6}
        px={1}
        container
        alignItems="center"
        flexDirection="column"
        mt={2}
      >
        <Grid item xs="auto" p={1}>
          {!videoClassFile || videoClassFile.length <= 0 ? (
            <em>Nenhum vídeo selecionado</em>
          ) : (
            <em>{`${videoClassFile[0].name}`}</em>
          )}
        </Grid>
        <Grid item xs="auto" container p={1}>
          <Grid item xs={12}>
            <Button
              component="label"
              variant="contained"
              color="secondary"
              disabled={isCreating || status === 'loading'}
              startIcon={<CloudUploadIcon />}
            >
              Adicionar videoaula
              <VisuallyHiddenInput
                type="file"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const value =
                    event.target.files && event.target.files.length > 0
                      ? event.target.files
                      : null;

                  setIsVideoClassSizeInvalid(
                    !validateFileSize(value, FileSize.CLASS_VIDEO)
                  );

                  setVideoClassFile(value);
                }}
                accept=".mp4"
              />
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={8} my={2}>
        <Divider />
      </Grid>

      <Grid
        item
        xs={12}
        px={1}
        container
        alignItems="center"
        flexDirection="column"
      >
        <Grid item xs="auto" p={1}>
          {!extraFiles || extraFiles.length <= 0 ? (
            <em>Nenhum material selecionado</em>
          ) : (
            handleListExtraFilesNames()
          )}
        </Grid>
        <Grid item xs="auto" p={1}>
          <Button
            component="label"
            variant="contained"
            color="secondary"
            disabled={isCreating || status === 'loading'}
            startIcon={<CloudUploadIcon />}
          >
            Adicionar materiais complementares
            <VisuallyHiddenInput
              type="file"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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

      <Grid item xs={8} my={2}>
        <Divider />
      </Grid>

      <Grid item xs={8} container justifyContent="space-between" my={2}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleReturnToPage}
        >
          Voltar
        </Button>
        <LoadingButton
          loading={isCreating || status === 'loading'}
          size="large"
          variant="contained"
          color="primary"
          onClick={handleCreateNewClass}
          disabled={
            isCreating ||
            status === 'loading' ||
            !classTitle ||
            !chosenSubject ||
            !chosenCategory ||
            !videoClassFile ||
            videoClassFile.length <= 0 ||
            isVideoClassSizeInvalid ||
            isAnyExtraFileSizeInvalid
          }
        >
          Criar aula
        </LoadingButton>
      </Grid>
    </Grid>
  );
}
