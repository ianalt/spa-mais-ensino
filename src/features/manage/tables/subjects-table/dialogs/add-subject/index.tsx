import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import {
  getAddSubjectOptions,
  resetErrors,
  selectSubjectsTable,
} from '../../subjectsTableSlice';
import { AddSubjectBody } from './types/add-subject-body';
import NotificationAlert from '../../../../../notification-alert';
import { KnowledgeAreaOption } from './types/knowledge-area-option';
import { TeacherOption } from './types/teacher-option';
import { MonitorOption } from './types/monitor-option';
import { isJSDocNullableType } from 'typescript';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AddSubjectProps {
  open: boolean;
  onClose: any;
  onAdd: any;
}

export default function AddSubject({ open, onClose, onAdd }: AddSubjectProps) {
  const dispatch = useAppDispatch();
  const subjectsTable = useAppSelector(selectSubjectsTable);

  const {
    status,
    isCreating,
    error,
    knowledgeAreasList,
    teachersList,
    monitorsList,
  } = subjectsTable;

  const [openAddFailedAlert, setOpenAddFailedAlert] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [chosenKnowledgeArea, setChosenKnowledgeArea] =
    useState<KnowledgeAreaOption | null>(null);
  const [chosenTeacher, setChosenTeacher] = useState<TeacherOption | null>(
    null
  );
  const [chosenMonitors, setChosenMonitors] = useState<MonitorOption[]>([]);

  const resetFields = () => {
    setName('');
    setDescription('');
    setChosenKnowledgeArea(null);
    setChosenTeacher(null);
    setChosenMonitors([]);
  };

  const handleAddSubject = async () => {
    const knowledgeAreaId = chosenKnowledgeArea?.id || 0;
    const teacherId = chosenTeacher?.id || 0;
    const monitorsIds =
      chosenMonitors.length > 0
        ? chosenMonitors.map((monitor) => monitor.id)
        : [];

    const body: AddSubjectBody = {
      name,
      description,
      knowledgeAreaId,
      teacherId,
      monitorsIds,
    };

    try {
      //   await dispatch(addNewSubject(body)).unwrap();
      console.log(body);
      //   onAdd();
      //   handleClose();
    } catch (rejectedValueOrSerializedError) {
      handleOpenAddFailedAlert();
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleOpenAddFailedAlert = () => {
    setOpenAddFailedAlert(true);
  };

  const handleCloseAddFailedAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAddFailedAlert(false);
  };

  useEffect(() => {
    if (open) {
      resetFields();

      dispatch(resetErrors());
      dispatch(getAddSubjectOptions());
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="create-knowledge-area-dialog-slide-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{'Adicionar nova área de conhecimento'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="create-knowledge-area-dialog-slide-description">
            Preencha as informações abaixo para criar uma nova área de
            conhecimento. <strong>Confirme</strong> os dados antes de clicar no
            botão <strong>Criar</strong>.
          </DialogContentText>

          <Grid container justifyContent="flex-start">
            <Grid item xs={12}>
              <NotificationAlert
                open={status === 'failed' && openAddFailedAlert}
                onClose={handleCloseAddFailedAlert}
                severity="error"
                status="Erro"
                message="Erro(s) detectado(s) durante registro de nova área de conhecimento"
              />
            </Grid>
            {status === 'failed' && (
              <Grid item xs={12} container m={1}>
                <Alert severity="error">
                  <Typography variant="body1">
                    <strong>Erro ao cadastrar. </strong>
                  </Typography>

                  {error.map((e: string, index: number) => {
                    return (
                      <Typography key={index} variant="body2">
                        &gt; {e}.
                      </Typography>
                    );
                  })}
                </Alert>
              </Grid>
            )}
          </Grid>

          <Grid container justifyContent={'flex-start'} py={2}>
            <Grid item xs={4}>
              <TextField
                id="name"
                margin="normal"
                required
                autoFocus
                fullWidth
                label="Nome"
                placeholder="Digite o nome da disciplina..."
                name="name"
                value={name}
                variant="outlined"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={8} container>
              <Grid item xs={12} pl={1}>
                <Autocomplete
                  id="add-subject-knowledge-area-option"
                  options={knowledgeAreasList}
                  value={chosenKnowledgeArea}
                  defaultValue={chosenKnowledgeArea}
                  onChange={(
                    event: any,
                    newValue: KnowledgeAreaOption | null
                  ) => {
                    setChosenKnowledgeArea(newValue);
                  }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      required
                      fullWidth
                      label="Área de connhecimento"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="description"
                margin="normal"
                fullWidth
                name="description"
                label="Descrição"
                variant="outlined"
                placeholder="Digite uma descrição para a área de conhecimento..."
                value={description}
                multiline
                rows={6}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={4} container>
              <Grid item xs={12}>
                <Autocomplete
                  id="add-subject-teacher-option"
                  options={teachersList}
                  value={chosenTeacher}
                  defaultValue={chosenTeacher}
                  onChange={(event: any, newValue: TeacherOption | null) => {
                    setChosenTeacher(newValue);
                  }}
                  getOptionLabel={(option) =>
                    `${option.firstName} ${option.lastName}`
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      required
                      fullWidth
                      label="Professor(a)"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} container mt={2} mb={5}>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="add-subject-monitors-options"
                  options={monitorsList}
                  onChange={(event: any, newValue: MonitorOption | null) => {
                    alert(JSON.stringify(newValue));
                  }}
                  disableCloseOnSelect
                  getOptionLabel={(option) =>
                    `${option.firstName} ${option.lastName}`
                  }
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {`${option.firstName} ${option.lastName}`}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      rows={2}
                      {...params}
                      label="Monitores(as)"
                      placeholder="Selecione os monitores para esta disciplina"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Fechar
          </Button>

          <LoadingButton
            variant="contained"
            onClick={handleAddSubject}
            loading={isCreating || status === 'loading'}
            disabled={!name || isCreating || status === 'loading'}
          >
            Criar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
