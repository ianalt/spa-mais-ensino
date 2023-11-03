import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  TextField,
  createFilterOptions,
  styled,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getClassOptions,
  selectSubjectOptionsForClass,
} from '../../slices/classesSlice';
import {
  BasicCategoryInfo,
  SubjectWithCategories,
} from './types/class-options';
import { useNavigate } from 'react-router-dom';

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

  //TODO create req body

  const handleCreateNewClass = () => {
    const body = {
      title: classTitle,
      categoryId: chosenCategory?.id || 0,
      videoClassFile,
      extraFiles,
    };

    console.log(body);
    alert('Criar aula!!!');
  };

  const handleReturnToManagePage = () => {
    resetFields();
    navigate('/mais-ensino/gerenciamento');
  };

  const resetFields = () => {
    setClassTitle('');
    setChosenSubject(null);
    setCategories([]);
    setChosenCategory(null);
    setVideoClassFile(null);
    setExtraFiles(null);
  };

  useEffect(() => {
    dispatch(getClassOptions());
    resetFields();
  }, []);

  return (
    <Grid item xs={12} container justifyContent="center" mt={2}>
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
        <Grid item xs={5}>
          <Autocomplete
            id="create-class-form-subject-option"
            noOptionsText="Nenhuma opção encontrada"
            options={subjectsList}
            value={chosenSubject}
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
            id="create-class-form-category-option"
            noOptionsText="Nenhuma opção encontrada"
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
        <Grid item xs="auto" p={1}>
          <Button
            component="label"
            variant="contained"
            color="secondary"
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

                setVideoClassFile(value);
              }}
              accept=".mp4"
            />
          </Button>
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
            //TODO list files names
            handleListExtraFilesNames()
          )}
        </Grid>
        <Grid item xs="auto" p={1}>
          <Button
            component="label"
            variant="contained"
            color="secondary"
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

                setExtraFiles(value);
              }}
              accept=".pdf, .docx, .doc"
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
          onClick={handleReturnToManagePage}
        >
          Voltar
        </Button>
        <Button
          // isLoading={isCreating}
          size="large"
          variant="contained"
          color="primary"
          onClick={handleCreateNewClass}
          disabled={
            !classTitle ||
            !chosenSubject ||
            !chosenCategory ||
            !videoClassFile ||
            videoClassFile.length <= 0
          }
        >
          Criar aula
        </Button>
      </Grid>
    </Grid>
  );
}
