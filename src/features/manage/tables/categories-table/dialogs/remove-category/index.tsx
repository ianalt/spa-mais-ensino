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
import {
  removeCategory,
  selectCategoriesTable,
  setSelected,
} from '../../categoriesTableSlice';
import format from 'date-fns/format';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface RemoveCategoryProps {
  open: boolean;
  onClose: any;
  onRemove: any;
}

export default function RemoveCategory({
  open,
  onClose,
  onRemove,
}: RemoveCategoryProps) {
  const dispatch = useAppDispatch();
  const categoriesTable = useAppSelector(selectCategoriesTable);
  const { selected, status, isRemoving } = categoriesTable;

  const handleRemoveCategory = async () => {
    const categoryId = selected ? selected.id : 0;
    try {
      await dispatch(removeCategory(categoryId)).unwrap();

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
        aria-describedby="remove-category-dialog-slide-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{'Remover categoria'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="remove-category-dialog-slide-description">
            {'Tem certeza que deseja remover esta categoria?'}
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
                  <Typography fontWeight={700}>{'Disciplina:'} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.subject.name}</Typography>
                </Grid>
              </Grid>

              <Grid item container xs="auto" py={1} pr={1}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>
                    {'Categoria ativa?'}{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.active ? 'Sim' : 'Não'}</Typography>
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
            onClick={handleRemoveCategory}
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
