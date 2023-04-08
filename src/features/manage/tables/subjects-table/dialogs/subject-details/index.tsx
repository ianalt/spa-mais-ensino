import { Chip, Divider, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Dispatch, SetStateAction, forwardRef } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';

import { selectSubjectsTable, setSelected } from '../../subjectsTableSlice';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SubjectDetailsProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export default function SubjectDetails({ open, onClose }: SubjectDetailsProps) {
  const subjectsTable = useAppSelector(selectSubjectsTable);
  const { selected } = subjectsTable;

  const handleClose = () => {
    onClose(true);
    setSelected(undefined);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => onClose(true)}
        aria-describedby="subject-details-dialog-slide-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{'Detalhes da disciplina'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="subject-details-dialog-slide-description">
            {'Aqui estão as informações sobre esta disciplina: '}
          </DialogContentText>

          <Grid container justifyContent={'flex-start'}>
            <Grid item xs={12} my={2}>
              <Divider>
                <Chip label="Dados Básicos" />
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
                  <Typography fontWeight={700}>{'Ativa?'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.active ? 'Sim' : 'Não'}</Typography>
                </Grid>
              </Grid>

              <Grid item container xs={12} py={1} pr={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Descrição:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography textAlign="justify">
                    {selected?.description}
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
        </DialogActions>
      </Dialog>
    </div>
  );
}
