import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import {
  resetErrors,
  selectSubjectsTable,
  setSelected,
} from '../../subjectsTableSlice';
import { ActiveOption } from '../../../../../../utils/options/types/active-option';
import { activeOptions } from '../../../../../../utils/options/types/active-options';
import NotificationAlert from '../../../../../notification-alert';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface EditSubjectProps {
  open: boolean;
  onClose: any;
  onEdit: any;
}

export default function EditSubject({
  open,
  onClose,
  onEdit,
}: EditSubjectProps) {
  return <div>Editar disciplina</div>;
  //   const dispatch = useAppDispatch();
  //   const subjectsTable = useAppSelector(selectSubjectsTable);

  //   const { status, isUpdating, error, selected } = subjectsTable;

  //   const [openCreateFailedAlert, setOpenCreateFailedAlert] =
  //     useState<boolean>(false);

  //   const [name, setName] = useState<string>('');
  //   const [description, setDescription] = useState<string | null>('');
  //   const [active, setActive] = useState<ActiveOption | null>(null);

  //   const setFields = () => {
  //     if (selected) {
  //       setName(selected.name);
  //       setDescription(selected.description);

  //       const initialActive = activeOptions.find(
  //         (option) => option.value === selected.active
  //       );
  //       setActive(initialActive ? initialActive : null);
  //     }
  //   };

  //   const resetFields = () => {
  //     setName('');
  //     setDescription('');
  //     setActive(null);
  //   };

  //   const handleEditSubject = async () => {
  //     if (selected) {
  //       const body: UpdateSubjectBody = {
  //         subjectId: selected.id,
  //         name,
  //         description: description ? description : '',
  //         active: active?.value || false,
  //       };

  //       try {
  //         await dispatch(editSubject(body)).unwrap();

  //         onEdit();
  //         handleClose();
  //       } catch (rejectedValueOrSerializedError) {
  //         handleOpenCreateFailedAlert();
  //       }
  //     }
  //   };

  //   const handleClose = () => {
  //     dispatch(setSelected(null));
  //     resetFields();
  //     onClose();
  //   };

  //   const handleOpenCreateFailedAlert = () => {
  //     setOpenCreateFailedAlert(true);
  //   };

  //   const handleCloseCreateFailedAlert = (
  //     event: React.SyntheticEvent | Event,
  //     reason?: string
  //   ) => {
  //     if (reason === 'clickaway') {
  //       return;
  //     }

  //     setOpenCreateFailedAlert(false);
  //   };

  //   useEffect(() => {
  //     if (open) {
  //       setFields();
  //       dispatch(resetErrors());
  //     }
  //   }, [open]);

  //   return (
  //     <div>
  //       <Dialog
  //         open={open}
  //         TransitionComponent={Transition}
  //         keepMounted
  //         onClose={handleClose}
  //         aria-describedby="edit-subject-dialog-slide-description"
  //         maxWidth="md"
  //         fullWidth
  //       >
  //         <DialogTitle>{'Editar nova área de conhecimento'}</DialogTitle>
  //         <DialogContent dividers>
  //           <DialogContentText id="edit-subject-dialog-slide-description">
  //             Preencha as informações abaixo para editar a disciplina.{' '}
  //             <strong>Confirme</strong> os dados antes de clicar no botão{' '}
  //             <strong>Criar</strong>.
  //           </DialogContentText>

  //           <Grid container justifyContent="flex-start">
  //             <Grid item xs={12}>
  //               <NotificationAlert
  //                 open={status === 'failed' && openCreateFailedAlert}
  //                 onClose={handleCloseCreateFailedAlert}
  //                 severity="error"
  //                 status="Erro"
  //                 message="Erro(s) detectado(s) durante edição de disciplina"
  //               />
  //             </Grid>
  //             {status === 'failed' && (
  //               <Grid item xs={12} container m={1}>
  //                 <Alert severity="error">
  //                   <Typography variant="body1">
  //                     <strong>Erro ao editar. </strong>
  //                   </Typography>

  //                   {error.map((e: string, index: number) => {
  //                     return (
  //                       <Typography key={index} variant="body2">
  //                         &gt; {e}.
  //                       </Typography>
  //                     );
  //                   })}
  //                 </Alert>
  //               </Grid>
  //             )}
  //           </Grid>

  //           <Grid container justifyContent={'flex-start'} py={2}>
  //             <Grid item xs={4} mr={2}>
  //               <TextField
  //                 id="name"
  //                 margin="normal"
  //                 required
  //                 autoFocus
  //                 fullWidth
  //                 label="Nome"
  //                 placeholder="Digite o nome da disciplina..."
  //                 name="name"
  //                 value={name}
  //                 variant="outlined"
  //                 onChange={(e) => {
  //                   setName(e.target.value);
  //                 }}
  //               />
  //             </Grid>

  //             <Grid item xs={2}>
  //               <Autocomplete
  //                 id="active-options"
  //                 value={active}
  //                 defaultValue={active}
  //                 onChange={(event: any, newValue: ActiveOption | null) => {
  //                   setActive(newValue);
  //                 }}
  //                 options={activeOptions}
  //                 getOptionLabel={(option) => option.label}
  //                 renderInput={(params) => (
  //                   <TextField
  //                     {...params}
  //                     margin="normal"
  //                     required
  //                     fullWidth
  //                     label="Área ativa?"
  //                   />
  //                 )}
  //               />
  //             </Grid>

  //             <Grid item xs={12}>
  //               <TextField
  //                 id="description"
  //                 margin="normal"
  //                 required
  //                 fullWidth
  //                 label="Descrição"
  //                 placeholder="Digite uma descrição para a disciplina..."
  //                 name="description"
  //                 value={description}
  //                 multiline
  //                 rows={6}
  //                 variant="outlined"
  //                 onChange={(e) => {
  //                   setDescription(e.target.value);
  //                 }}
  //               />
  //             </Grid>

  //             <Grid item container xs={12} py={1} pr={1}>
  //               <Grid item xs={1.5}>
  //                 <Typography fontWeight={700}>{'Disciplina(s):'} </Typography>
  //               </Grid>
  //               <Grid item xs={10}>
  //                 <Tooltip
  //                   title="Gerencie o pertecimento de cada disciplina à sua área de conhecimento correspondente individualmente através do menu de disciplinas"
  //                   arrow
  //                 >
  //                   <HelpOutlineOutlinedIcon fontSize="small" color="action" />
  //                 </Tooltip>
  //               </Grid>
  //               <Grid item xs={12} py={1}>
  //                 {(selected?.subjects &&
  //                   selected.subjects.reduce((acc, val, i) => {
  //                     const { name } = val;
  //                     return `${acc}${
  //                       i === selected.subjects.length - 1
  //                         ? `${name}`
  //                         : `${name}, `
  //                     }`;
  //                   }, '')) ||
  //                   '—'}
  //               </Grid>
  //             </Grid>
  //           </Grid>
  //         </DialogContent>
  //         <DialogActions>
  //           <Button onClick={handleClose} color="secondary">
  //             Fechar
  //           </Button>

  //           <LoadingButton
  //             variant="contained"
  //             onClick={handleEditSubject}
  //             loading={isUpdating || status === 'loading'}
  //             disabled={!name || !active || isUpdating || status === 'loading'}
  //           >
  //             Salvar mudanças
  //           </LoadingButton>
  //         </DialogActions>
  //       </Dialog>
  //     </div>
  //   );
}
