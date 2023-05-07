import {
  Chip,
  Divider,
  Grid,
  Input,
  InputLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import dayjs, { Dayjs } from 'dayjs';
import {
  Dispatch,
  Fragment,
  SetStateAction,
  forwardRef,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { selectUsersTable, setSelected } from '../../usersTableSlice';
import EducationInfoDetails from '../components/education-info-details';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useNavigate } from 'react-router-dom';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CreateUserProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

const steps = [
  'Dados para criação da conta',
  'Dados pessoais',
  'Dados de moradia',
  'Dados educacionais',
];

export default function CreateUser({ open, onClose }: CreateUserProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const usersTable = useAppSelector(selectUsersTable);

  const [step, setStep] = useState<number>(0);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  // const [ethnicity, setEthnicity] = useState<EthnicityOption | null>();
  // const [gender, setGender] = useState<GenderOption | null>();
  const [generalIncome, setGeneralIncome] = useState<number>(0);
  const [totalHouseHoldMembers, setTotalHouseHoldMembers] = useState<number>(0);
  const [phoneNumber1, setPhoneNumber1] = useState<string>('');
  const [phoneNumber2, setPhoneNumber2] = useState<string>('');

  const handleClose = () => {
    onClose(true);
    setSelected(undefined);
  };

  // const formatRole = () => {
  //   return selected?.role.split('').reduce((acc, val, i) => {
  //     return (acc += `${i === 0 ? val.toUpperCase() : val}`);
  //   }, '');
  // };

  // const formatCpf = () => {
  //   return `${selected?.cpf.substring(0, 3)}.${selected?.cpf.substring(
  //     3,
  //     6
  //   )}.${selected?.cpf.substring(6, 9)}-${selected?.cpf.substring(9, 11)}`;
  // };

  // const formatBirthDate = () => {
  //   if (!selected) return '—';

  //   const date = dayjs(selected.birthDate).format('DD/MM/YYYY');

  //   return date;
  // };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => onClose(true)}
        aria-describedby="create-user-dialog-slide-description"
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>{'Adicionar novo usuário'}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="create-user-dialog-slide-description">
            {'Preencha as informações abaixo para criar o novo usuário: '}
          </DialogContentText>

          <Grid container justifyContent={'flex-start'}>
            <Grid item xs={12} my={2}>
              <Divider>
                <Chip label="Dados para acesso" />
              </Divider>
            </Grid>

            <Grid item xs={12} container my={1}>
              <Grid item xs={4} p={1}>
                <TextField
                  id="email"
                  margin="normal"
                  required
                  autoFocus
                  fullWidth
                  label="E-mail"
                  name="email"
                  value={email}
                  variant="outlined"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                />
              </Grid>

              <Grid item xs={4} container p={1}>
                <Grid item xs={9}>
                  <TextField
                    id="password"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    variant="outlined"
                    placeholder="Digite sua senha..."
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                  />
                </Grid>

                <Grid
                  item
                  xs={1}
                  p={1}
                  container
                  alignItems="flex-start"
                  justifyContent="center"
                >
                  <Tooltip
                    title="A senha precisa conter entre 8 e 16 caracteres, com 1 letra minúscula, 1 maiúscula, 1 número e 1 caracter especial"
                    arrow
                  >
                    <HelpOutlineOutlinedIcon fontSize="small" color="action" />
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container justifyContent={'flex-start'}>
            <Grid item xs={12} my={2}>
              <Divider>
                <Chip label="Dados pessoais" />
              </Divider>
            </Grid>

            <Grid item xs={12} container my={1}>
              <Grid item xs={4} p={1}>
                <TextField
                  id="first-name"
                  margin="normal"
                  required
                  fullWidth
                  label="Nome"
                  name="first-name"
                  autoFocus
                  value={firstName}
                  variant="outlined"
                  placeholder="Digite seu nome..."
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={3} container p={1}>
                <Grid item xs={12}>
                  <TextField
                    id="last-name"
                    margin="normal"
                    required
                    fullWidth
                    name="last-name"
                    label="Sobrenome(s)"
                    variant="outlined"
                    placeholder="Digite seu(s) sobrenome(s)..."
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={4} container p={1}>
                <Grid item xs={12} px={1} py={2}>
                  <InputLabel htmlFor="formatted-cpf-mask-input">
                    CPF *
                  </InputLabel>
                  <Input
                    id="formatted-cpf-mask-input"
                    name="cpf"
                    required
                    value={cpf}
                    // inputComponent={CpfMaskCustom as any}
                    placeholder="XXX.XXX.XXX-XX"
                    // onChange={convertCpf}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      // convertCpf(event);
                    }}
                  />
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
