import { LoadingButton } from '@mui/lab';
import { Grid, Typography } from '@mui/material';
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
import {
  deleteKnowledgeArea,
  setSelected,
} from '../../knowledgeAreasTableSlice';

import { selectKnowledgeAreasTable } from '../../knowledgeAreasTableSlice';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface RemoveKnowledgeAreaProps {
  open: boolean;
  onClose: any;
  onRemove: any;
}

export default function RemoveKnowledgeArea({
  open,
  onClose,
  onRemove,
}: RemoveKnowledgeAreaProps) {
  const dispatch = useAppDispatch();
  const knowledgeAreasTable = useAppSelector(selectKnowledgeAreasTable);
  const { selected, isRemoving, status } = knowledgeAreasTable;

  const handleRemoveKnowledgeArea = async () => {
    const knowledgeAreaId = selected ? selected.id : 0;
    try {
      await dispatch(deleteKnowledgeArea(knowledgeAreaId)).unwrap();

      onRemove();
      handleClose();
    } catch (rejectedValueOrSerializedError) {}
  };

  const handleClose = () => {
    onClose();
    setSelected(undefined);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="remove-knowledge-area-dialog-slide-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{'Remover área de conhecimento'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="remove-knowledge-area-dialog-slide-description">
            {'Tem certeza que deseja remover esta área de conhecimento??'}
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

          <LoadingButton
            color="secondary"
            variant="contained"
            onClick={handleRemoveKnowledgeArea}
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
