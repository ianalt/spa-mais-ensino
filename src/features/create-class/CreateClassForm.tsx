import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Autocomplete,
  Button,
  Grid,
  Input,
  TextField,
  Typography,
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
  //TODO titulo
  //TODO categoria
  //TODO videoaula
  //TODO material de estudo
  //TODO preview??? URL.createObjectURL(this.files[0]);

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
    <Grid item xs={12} container mt={2} sx={{ border: '1px solid red' }}>
      <Grid item xs={12}>
        <TextField
          label="Título"
          fullWidth
          required
          value={classTitle}
          onChange={(event) => setClassTitle(event.target.value)}
        />
      </Grid>

      <Grid item xs={12} container justifyContent="space-between">
        <Grid item xs={5.5}>
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
        <Grid item xs={5.5}>
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

      <Grid
        item
        xs={12}
        container
        alignItems="center"
        sx={{ border: '1px solid blue' }}
      >
        <Grid item xs="auto" px={1} flexDirection="column">
          {!videoClassFile && <em>Nenhum vídeo selecionado</em>}
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Adicionar videoaula
            <VisuallyHiddenInput
              type="file"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setVideoClassFile(event.target.files);
              }}
              accept=".mp4"
            />
          </Button>
        </Grid>
        <Grid item xs="auto" container alignContent="center" px={1}>
          {videoClassFile && (
            <Typography>{`${videoClassFile[0].name}`}</Typography>
          )}
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        container
        alignItems="center"
        sx={{ border: '1px solid green' }}
      >
        <Grid item xs="auto" px={1}>
          {!videoClassFile && <em>Nenhum material selecionado</em>}
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Adicionar materiais complementares
            <VisuallyHiddenInput
              type="file"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setExtraFiles(event.target.files);
              }}
              accept=".pdf, .docx, .doc"
              multiple
            />
          </Button>
        </Grid>
        <Grid item xs="auto" container alignContent="center" px={1}></Grid>
      </Grid>
    </Grid>
  );
}
