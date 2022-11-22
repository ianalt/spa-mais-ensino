import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { DefaultAppBar } from "../../layout/default.appbar";
import { DefaultLayout } from "../../layout/default.layout";
import WelcomeAppBar from "../../layout/welcome.appbar";
import Image1 from "../../../public/images/undraw_education_f8ru.svg";

export default function WelcomePage() {
  return (
    <Box>
      <WelcomeAppBar />

      <Grid container xs={12}>
        <Grid item xs={12} sx={{ border: "1px solid red" }}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            height={"30vh"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography mb={1} variant="h1">
                +Ensino
              </Typography>
              <Typography variant="h4" textAlign={"center"}>
                Onde a educação é um <u>direito</u>.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item container xs={12} sx={{ border: "1px solid green" }}>
          <Grid item xs={4} spacing={2}>
            <Paper elevation={2}>
              <img
                src=""
                alt="Pessoa em cima de um livro enquanto mostra capelo"
              />
            </Paper>
          </Grid>
          <Grid item xs={8} spacing={2}>
            <Paper elevation={2}>
              A educação é um direito de todos. Com o +Ensino, você terá acesso
              gratuito a conteúdo didático para se preparar para suas provas de
              vestibular!
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
