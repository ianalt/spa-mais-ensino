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
import { Role } from '../../../../../../utils/enums/role.enum';
import NotificationAlert from '../../../../../notification-alert';
import {
  editSubject,
  getEditSubjectOptions,
  resetErrors,
  selectSubjectsTable,
} from '../../subjectsTableSlice';
import { KnowledgeAreaOption } from '../../types/knowledge-area-option';
import { MonitorOption } from '../../types/monitor-option';
import { TeacherOption } from '../../types/teacher-option';
import { EditSubjectBody } from './types/edit-subject-body';
import { ActiveOption } from '../../../../../../utils/options/types/active-option';
import { activeOptions } from '../../../../../../utils/options/types/active-options';

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
  const dispatch = useAppDispatch();
  const subjectsTable = useAppSelector(selectSubjectsTable);

  const {
    status,
    isUpdating,
    error,
    knowledgeAreasList,
    teachersList,
    monitorsList,
    selected,
  } = subjectsTable;

  const [openEditFailedAlert, setOpenEditFailedAlert] =
    useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [chosenKnowledgeArea, setChosenKnowledgeArea] =
    useState<KnowledgeAreaOption | null>(null);
  const [chosenTeacher, setChosenTeacher] = useState<TeacherOption | null>(
    null
  );
  const [chosenMonitors, setChosenMonitors] = useState<MonitorOption[]>([]);
  const [active, setActive] = useState<ActiveOption | null>(null);

  const setFields = () => {
    const teacherFound =
      selected?.users.find((user) => user.role === Role.PROFESSOR) || null;

    setName(selected?.name || '');
    setDescription(selected?.description || '');
    setChosenKnowledgeArea(selected?.knowledgeArea || null);
    setChosenTeacher(teacherFound);
    setChosenMonitors([]);

    const initialActive = activeOptions.find(
      (option) => option.value === selected?.active
    );
    setActive(initialActive ? initialActive : null);
  };

  const resetFields = () => {
    setName('');
    setDescription('');
    setActive(null);
  };

  const handleEditSubject = async () => {
    const knowledgeAreaId = chosenKnowledgeArea?.id || 0;

    const teacherId = chosenTeacher?.id || 0;

    const monitorsIds =
      chosenMonitors.length > 0
        ? chosenMonitors.map((monitor) => monitor.id)
        : [];

    const body: EditSubjectBody = {
      subjectId: selected?.id || 0,
      active: active?.value || false,
      name: name.trim(),
      description: description.trim(),
      knowledgeAreaId,
      teacherId,
      monitorsIds,
    };

    try {
      await dispatch(editSubject(body)).unwrap();

      onEdit();
      handleClose();
    } catch (rejectedValueOrSerializedError) {
      handleOpenEditFailedAlert();
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
    resetFields();
    onClose();
  };

  const handleOpenEditFailedAlert = () => {
    setOpenEditFailedAlert(true);
  };

  const handleCloseEditFailedAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEditFailedAlert(false);
  };

  useEffect(() => {
    if (open) {
      setFields();

      dispatch(resetErrors());
      dispatch(getEditSubjectOptions(selected?.id || 0));
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="edit-subject-dialog-slide-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{'Adicionar nova disciplina'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="edit-subject-dialog-slide-description">
            Preencha as informações abaixo para criar uma nova disciplina.{' '}
            <strong>Confirme</strong> os dados antes de clicar no botão{' '}
            <strong>Salvar mudanças</strong>.
          </DialogContentText>

          <Grid container justifyContent="flex-start">
            <Grid item xs={12}>
              <NotificationAlert
                open={status === 'failed' && openEditFailedAlert}
                onClose={handleCloseEditFailedAlert}
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
                  id="edit-subject-knowledge-area-option"
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

            <Grid item xs={12} container>
              <Grid item xs={4}>
                <Autocomplete
                  id="edit-subject-active-options"
                  value={active}
                  defaultValue={active}
                  onChange={(event: any, newValue: ActiveOption | null) => {
                    setActive(newValue);
                  }}
                  options={activeOptions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      required
                      fullWidth
                      label="Disciplina ativa?"
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
                placeholder="Digite uma descrição para a disciplina..."
                value={description}
                multiline
                rows={6}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={6} container>
              <Grid item xs={12}>
                <Autocomplete
                  id="edit-subject-teacher-option"
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
              <Grid item xs={12}>
                <Autocomplete
                  id="edit-subject-monitors-options"
                  noOptionsText="Nenhuma opção encontrada"
                  multiple
                  options={monitorsList}
                  value={chosenMonitors}
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
            onClick={handleEditSubject}
            loading={isUpdating || status === 'loading'}
            disabled={
              !name ||
              !chosenKnowledgeArea ||
              !chosenTeacher ||
              isUpdating ||
              status === 'loading'
            }
          >
            Salvar mudanças
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
