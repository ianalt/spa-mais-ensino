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
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { format } from 'date-fns';
import {
  removeClass,
  resetSelected,
  selectClasses,
} from '../../slices/classesSlice';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface RemoveClassProps {
  open: boolean;
  onClose: any;
  onRemove: any;
}

export default function MySubjectRemoveClass({
  open,
  onClose,
  onRemove,
}: RemoveClassProps) {
  const dispatch = useAppDispatch();
  const classes = useAppSelector(selectClasses);
  const { selected, status, isRemoving } = classes;

  const handleRemoveClass = async () => {
    const classId = selected ? selected.id : 0;
    try {
      await dispatch(removeClass(classId)).unwrap();

      onRemove();
      handleClose();
    } catch (rejectedValueOrSerializedError) {}
  };

  const handleClose = () => {
    onClose(true);
    dispatch(resetSelected());
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => onClose(true)}
        aria-describedby="my-subject-remove-class-dialog-slide-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{'Remover aula'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="my-subject-remove-class-dialog-slide-description">
            {'Tem certeza que deseja deletar esta aula?'}
          </DialogContentText>

          <Grid container justifyContent={'flex-start'}>
            <Grid item xs={12} container my={1}>
              <Grid item xs={4} p={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Criada em:'} </Typography>
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
                  <Typography fontWeight={700}>{'Criada por: '} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    {`${selected?.createdBy.firstName} ${selected?.createdBy.lastName}`}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={4} p={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Atualizada em:'} </Typography>
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
                  <Typography>{selected?.title}</Typography>
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
            onClick={handleRemoveClass}
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
