import BookIcon from '@mui/icons-material/Book';
import {
  Autocomplete,
  Box,
  Grid,
  LinearProgress,
  TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getClassesFromSubject,
  selectClasses,
} from '../../slices/classesSlice';

export default function SearchClass() {
  const dispatch = useAppDispatch();
  const classes = useAppSelector(selectClasses);
  const { list } = classes;

  const navigate = useNavigate();

  const handleNavigate = (classId: number) =>
    navigate(`/mais-ensino/aula/${classId}`);

  const params = useParams();
  const subjectId = params.subjectId ? parseInt(params.subjectId) : 0;

  useEffect(() => {
    dispatch(getClassesFromSubject(subjectId));
  }, []);

  return (
    <>
      {classes.status === 'loading' ? (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      ) : (
        <Grid item xs={12} container mt={5}>
          <Autocomplete
            id="class-search-bar"
            fullWidth
            options={list}
            noOptionsText="Nenhuma disciplina disponível"
            getOptionLabel={(option) => option.title}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
                onClick={() => handleNavigate(option.id)}
              >
                <BookIcon color="secondary" />
                {option.title}
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Pesquise por uma aula" />
            )}
          />
        </Grid>
      )}
    </>
  );
}
