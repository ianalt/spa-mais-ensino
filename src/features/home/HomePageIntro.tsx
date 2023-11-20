import { Grid, LinearProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProfile, selectUser } from '../../user/userSlice';
import { useEffect } from 'react';
import { Role } from '../../utils/enums/role.enum';

export default function HomePageIntro() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <>
      {user.status === 'loading' ? (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      ) : (
        <Grid item xs={12} container mt={5}>
          <Grid item xs={7} p={2}>
            <img
              src="/undraw_brainstorming_re_1lmw.svg"
              alt="Imagem"
              width="100%"
              height="350"
            />
          </Grid>
          <Grid
            item
            xs={5}
            container
            alignContent="center"
            textAlign="start"
            p={2}
          >
            <Grid item xs={12}>
              <Typography variant="h3">
                Olá, {user.profile?.firstName}!
              </Typography>
              <Typography variant="body1">
                Aqui você encontra as aulas mais recentes postadas no{' '}
                <strong>+Ensino</strong>. Você também pode encontrar as aulas
                navegando pelas seções de disciplinas, agrupadas por suas
                respectivas <strong>áreas de conhecimento</strong>.{' '}
                {user.role === Role.ESTUDANTE && <strong>Bons estudos!</strong>}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
