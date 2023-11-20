import {
  Grid,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectSubjects } from '../../slices/subjectsSlice';
import { Role } from '../../utils/enums/role.enum';
import ContactMailIcon from '@mui/icons-material/ContactMail';

export default function SubjectPageIntro() {
  const subjects = useAppSelector(selectSubjects);

  const { openedSubject } = subjects;
  const teacher = openedSubject?.users.find(
    (user) => user.role === Role.PROFESSOR
  );

  return (
    <>
      {subjects.status === 'loading' ? (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      ) : (
        <>
          <Grid item xs={12} container mt={5}>
            <Grid item xs={7} p={2}>
              <img
                src="/undraw_teaching_re_g7e3.svg"
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
              <Grid item xs={12} container>
                <Grid item xs={12}>
                  <Typography variant="h3">{openedSubject?.name}</Typography>
                  <Typography variant="body1" textAlign="justify">
                    {openedSubject?.description}
                  </Typography>
                  {teacher === undefined ? (
                    <Grid item xs={12} mt={1}>
                      <Typography variant="subtitle1">
                        <em>
                          Não há um(a) professor(a) disponível para a disciplina
                          no momento.
                        </em>
                      </Typography>
                    </Grid>
                  ) : (
                    <Grid item xs={12} mt={1} container>
                      <Grid item xs="auto">
                        <Typography variant="subtitle1" textAlign="end">
                          <em>{`Professor(a): ${`${teacher?.firstName} ${teacher?.lastName}`}`}</em>
                        </Typography>
                      </Grid>

                      <Grid item xs="auto" ml={1}>
                        <Tooltip title="E-mail" arrow>
                          <span>
                            <IconButton
                              href={`mailto:${teacher?.email}`}
                              size="small"
                            >
                              <ContactMailIcon color="primary" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
