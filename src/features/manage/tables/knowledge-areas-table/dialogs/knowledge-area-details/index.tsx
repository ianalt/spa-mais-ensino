import { Grid, Typography } from '@mui/material';
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
import { setSelected } from '../../knowledgeAreasTableSlice';

import { selectKnowledgeAreasTable } from '../../knowledgeAreasTableSlice';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface KnowledgeAreaDetailsProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export default function KnowledgeAreaDetails({
  open,
  onClose,
}: KnowledgeAreaDetailsProps) {
  const knowledgeAreasTable = useAppSelector(selectKnowledgeAreasTable);
  const { selected } = knowledgeAreasTable;

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
        onClose={handleClose}
        aria-describedby="knowledge-area-details-dialog-slide-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{'Detalhes da área de conhecimento'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="knowledge-area-details-dialog-slide-description">
            {'Aqui estão os detalhes sobre esta área de conhecimento: '}
          </DialogContentText>

          <Grid container justifyContent={'flex-start'}>
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
                  <Typography fontWeight={700}>{'Área ativa?'} </Typography>
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
                    {selected?.description || '—'}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item container xs={12} py={1} pr={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{'Disciplina(s):'} </Typography>
                </Grid>
                <Grid item xs={12} py={1}>
                  {(selected?.subjects &&
                    selected.subjects.reduce((acc, val, i) => {
                      const { name } = val;
                      return `${acc}${
                        i === selected.subjects.length - 1
                          ? `${name}`
                          : `${name}, `
                      }`;
                    }, '')) ||
                    '—'}
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
