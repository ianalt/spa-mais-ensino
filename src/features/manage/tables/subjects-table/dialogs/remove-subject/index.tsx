import { LoadingButton } from '@mui/lab';
import { Chip, Divider, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { Role } from '../../../../../../utils/enums/role.enum';
import {
  removeSubject,
  selectSubjectsTable,
  setSelected,
} from '../../subjectsTableSlice';
import format from 'date-fns/format';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface RemoveSubjectProps {
  open: boolean;
  onClose: any;
  onRemove: any;
}

export default function RemoveSubject({
  open,
  onClose,
  onRemove,
}: RemoveSubjectProps) {
  const dispatch = useAppDispatch();
  const subjectsTable = useAppSelector(selectSubjectsTable);
  const { selected, status, isRemoving } = subjectsTable;

  const formatCategories = () => {
    if (!selected || selected.categories.length === 0) return '—';

    const sortedCategories = selected.categories
      .map((category) => category.name)
      .sort();

    return sortedCategories.reduce((acc, val, i) => {
      return `${acc}${
        i === selected.categories.length - 1 ? `${val}.` : `${val}, `
      }`;
    }, '');
  };

  const displayTeachersName = () => {
    const teacher = selected?.users.find(
      (user) => user.role === Role.PROFESSOR
    );

    if (!selected || !teacher) return '—';

    const teachersName = `${teacher.firstName} ${teacher.lastName}`;

    return teachersName;
  };

  const handleRemoveSubject = async () => {
    const subjectId = selected ? selected.id : 0;
    try {
      await dispatch(removeSubject(subjectId)).unwrap();

      onRemove();
      handleClose();
    } catch (rejectedValueOrSerializedError) {}
  };

  const handleClose = () => {
    onClose(true);
    setSelected(null);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => onClose(true)}
        aria-describedby="remove-subject-dialog-slide-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{'Remover disciplina'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="remove-subject-dialog-slide-description">
            {'Tem certeza que deseja remover esta disciplina?'}
          </DialogContentText>

          <Grid container justifyContent={'flex-start'}>
            <Grid item xs={12} container my={1}>
              <Grid item xs={4} p={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Criado em:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    {selected?.createdAt
                      ? format(
                          new Date(`${selected?.createdAt}`),
                          'dd/MM/yyyy, HH:mm:ss'
                        )
                      : '—'}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={4} p={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Atualizado em:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    {selected?.updatedAt
                      ? format(
                          new Date(`${selected?.updatedAt}`),
                          'dd/MM/yyyy, HH:mm:ss'
                        )
                      : '—'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container justifyContent={'flex-start'}>
            <Grid item xs={12} my={2}>
              <Divider>
                <Chip label="Detalhes" />
              </Divider>
            </Grid>

            <Grid item container xs={12} my={1}>
              <Grid item container xs="auto" py={1} pr={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Nome:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.name}</Typography>
                </Grid>
              </Grid>

              <Grid item container xs="auto" py={1} pr={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>
                    {'Disciplina ativa?'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.active ? 'Sim' : 'Não'}</Typography>
                </Grid>
              </Grid>

              {/* //linha de área de conhecimento e categorias */}
              <Grid item container xs={12} py={1} pr={1}>
                <Grid item container xs={5}>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>
                      {'Área de conhecimento:'}{' '}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      {selected?.knowledgeArea?.name || '—'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item container xs={7}>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>{'Categorias:'}</Typography>
                  </Grid>
                  <Grid item container xs={12}>
                    {formatCategories()}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container xs={12} py={1} pr={1}>
                <Grid item container xs={4}>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>{'Professor(a):'} </Typography>
                  </Grid>
                  <Grid item xs={12} px={1}>
                    <Typography>{displayTeachersName()}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container xs={12} py={1} pr={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>
                    {'Descrição da disciplina:'}{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography textAlign="justify">
                    {selected?.description || '—'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Fechar
          </Button>

          <LoadingButton
            color="secondary"
            variant="contained"
            onClick={handleRemoveSubject}
            loading={isRemoving || status === 'loading'}
            disabled={isRemoving || status === 'loading'}
          >
            Remover
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
