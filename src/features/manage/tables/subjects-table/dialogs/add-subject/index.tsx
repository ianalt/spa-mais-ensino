import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
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
  createFilterOptions,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import NotificationAlert from '../../../../../notification-alert';
import {
  addNewSubject,
  getAddSubjectOptions,
  resetErrors,
  selectSubjectsTable,
} from '../../subjectsTableSlice';
import { AddSubjectBody } from './types/add-subject-body';
import { KnowledgeAreaOption } from './types/knowledge-area-option';
import { MonitorOption } from './types/monitor-option';
import { TeacherOption } from './types/teacher-option';

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
      name: name.trim(),
      description: description.trim(),
      knowledgeAreaId,
      teacherId,
      monitorsIds,
    };

    try {
      await dispatch(addNewSubject(body)).unwrap();

      onAdd();
      handleClose();
    } catch (rejectedValueOrSerializedError) {
      handleOpenAddFailedAlert();
    }
  };

  const autoCompleteMonitorOptions = createFilterOptions<MonitorOption>({
    matchFrom: 'start',
    stringify: (option) => `${option.firstName} ${option.lastName}`,
  });

  const autoCompleteKnowledgeAreaOptions =
    createFilterOptions<KnowledgeAreaOption>({
      matchFrom: 'start',
      stringify: (option) => option.name,
    });

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
  }, [open, dispatch]);

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
        <DialogTitle>{'Adicionar nova disciplina'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="create-knowledge-area-dialog-slide-description">
            Preencha as informações abaixo para criar uma nova disciplina.{' '}
            <strong>Confirme</strong> os dados antes de clicar no botão{' '}
            <strong>Criar</strong>.
          </DialogContentText>

          <Grid container justifyContent="flex-start">
            <Grid item xs={12}>
              <NotificationAlert
                open={status === 'failed' && openAddFailedAlert}
                onClose={handleCloseAddFailedAlert}
                severity="error"
                status="Erro"
                message="Erro(s) detectado(s) durante registro de nova disciplina"
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
                  noOptionsText="Nenhuma opção encontrada"
                  options={knowledgeAreasList}
                  value={chosenKnowledgeArea}
                  defaultValue={chosenKnowledgeArea}
                  filterOptions={autoCompleteKnowledgeAreaOptions}
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

            <Grid item xs={6} container>
              {JSON.stringify(chosenTeacher)}
              <Grid item xs={12}>
                <Autocomplete
                  id="add-subject-teacher-option"
                  noOptionsText="Nenhuma opção encontrada"
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
              {JSON.stringify(chosenMonitors)}
              <Grid item xs={12}>
                <Autocomplete
                  id="add-subject-monitors-options"
                  noOptionsText="Nenhuma opção encontrada"
                  multiple
                  options={monitorsList}
                  value={chosenMonitors}
                  defaultValue={chosenMonitors}
                  filterOptions={autoCompleteMonitorOptions}
                  disableCloseOnSelect
                  onChange={(event: any, newValue: MonitorOption[]) => {
                    setChosenMonitors(newValue);
                  }}
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
                      {...params}
                      label="Monitores(as)"
                      placeholder="Selecione os(as) monitores(as) para esta disciplina"
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
