import {
  forwardRef,
  Dispatch,
  SetStateAction,
  useState,
  Fragment,
} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useAppSelector } from "../../../../../../app/hooks";
import { selectUsersTable, setSelected } from "../../usersTableSlice";
import { Divider, Grid, Typography } from "@mui/material";
import { User } from "../../types/user";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import EducationInfoDetails from "./components/education-info-details";
import List from "@mui/material/List";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface UserDetailsProps {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export default function UserDetails({ open, onClose }: UserDetailsProps) {
  const usersTable = useAppSelector(selectUsersTable);
  const { selected } = usersTable;

  const handleClose = () => {
    onClose(true);
    setSelected(undefined);
  };

  const formatRole = () => {
    return selected?.role.split("").reduce((acc, val, i) => {
      return (acc += `${i === 0 ? val.toUpperCase() : val}`);
    }, "");
  };

  const formatCpf = () => {
    return `${selected?.cpf.substring(0, 3)}.${selected?.cpf.substring(
      3,
      6
    )}.${selected?.cpf.substring(6, 9)}-${selected?.cpf.substring(9, 11)}`;
  };

  // não usando date-fns porque n tá funcionando
  const formatBirthDate = () => {
    if (!selected) return "—";

    const date = format(selected.birthDate, "DD/MM/YYYY");

    // const year = selected.birthDate.getFullYear();
    // const month = selected.birthDate.getMonth() + 1;
    // const day = selected.birthDate.getDate();

    // return `${day}/${month}/${year}`;

    return date;
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => onClose(true)}
        aria-describedby="user-details-dialog-slide-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>{"Detalhes do usuário"}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="user-details-dialog-slide-description">
            {"Aqui estão as informações sobre este usuário: "}
          </DialogContentText>

          <Grid container>
            {/* Nome */}
            <Grid item container xs={6}>
              <Grid item xs={12}>
                <Typography fontWeight={700}>{"Nome:"} </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{selected?.firstName}</Typography>
              </Grid>
            </Grid>

            {/* Sobrenome */}
            <Grid item container xs={6}>
              <Grid item xs={12}>
                <Typography fontWeight={700}>{"Sobrenome(s):"} </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{selected?.lastName}</Typography>
              </Grid>
            </Grid>

            {/* E-mail */}
            <Grid item container xs={6}>
              <Grid item xs={12}>
                <Typography fontWeight={700}>{"E-mail:"} </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{selected?.email}</Typography>
              </Grid>
            </Grid>

            {/* Acesso */}
            <Grid item container xs={6}>
              <Grid item xs={12}>
                <Typography fontWeight={700}>{"Acesso:"} </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{formatRole()}</Typography>
              </Grid>
            </Grid>

            {/* CPF */}
            <Grid item container xs={6}>
              <Grid item xs={12}>
                <Typography fontWeight={700}>{"CPF:"} </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{formatCpf()}</Typography>
              </Grid>
            </Grid>

            {/* Data de nascimento */}
            <Grid item container xs={6}>
              <Grid item xs={12}>
                <Typography fontWeight={700}>
                  {"Data de nascimento:"}{" "}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {/* <Typography>{formatBirthDate()}</Typography> */}
                <Typography>{selected?.birthDate}</Typography>
              </Grid>
            </Grid>

            {/* Disciplina pertencente */}
            {selected?.role === "monitor" || selected?.role === "professor" ? (
              <Grid item container xs={6}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>{"Disciplina:"} </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{selected?.subjects}</Typography>
                </Grid>
              </Grid>
            ) : null}

            {/* Informações educacionais */}
            {selected?.role !== "admin" ? (
              <Grid item container xs={6}>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>
                    {selected?.role === "estudante"
                      ? "Informações educacionais: "
                      : "Formação: "}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {selected ? (
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                      }}
                    >
                      {selected.educationInfoList.map((educationInfo, i) => {
                        return (
                          <Fragment>
                            <EducationInfoDetails
                              educationInfo={educationInfo}
                            />
                            {i + 1 !== selected.educationInfoList.length ? (
                              <Divider variant="fullWidth" component="li" />
                            ) : null}
                          </Fragment>
                        );
                      })}
                    </List>
                  ) : null}
                </Grid>
              </Grid>
            ) : null}

            {/* Comentários */}
            <Grid item container xs={6}>
              <Grid item xs={12}>
                <Typography fontWeight={700}>
                  {"Comentários publicados:"}{" "}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {selected?.comments.map((comment) => {
                  return (
                    <Typography key={comment.id}>{`${comment}`}</Typography>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// firstName: string;
// lastName: string;
// email: string;
// role: "estudante" | "monitor" | "professor" | "admin";
// cpf: string;
// birthDate: Date;
// comments: any[];
// subjects: any;

// educationInfoList: EducationInfo[];
