import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { DefaultAppBar } from "../../layout/default.appbar";
import { DefaultLayout } from "../../layout/default.layout";
import WelcomeAppBar from "../../layout/welcome.appbar";
import KnowledgeAreaCard from "./knowledge-area-card";

export default function WelcomePage() {
  return (
    <Box>
      <WelcomeAppBar />

      <Grid container xs={12}>
        <Grid item xs={12}>
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
                <strong>+Ensino</strong>
              </Typography>
              <Typography variant="h4" textAlign={"center"}>
                Onde a educação é um <u>direito</u>.
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item container xs={12} justifyContent="center" mb={5}>
          <Grid
            item
            xs={12}
            md={12}
            lg={3}
            mr={{ lg: 2, md: 0, xs: 0 }}
            mx={{ lg: 0, md: 4, xs: 4 }}
            my={{ lg: 0, md: 3, xs: 3 }}
          >
            <Paper elevation={4}>
              <img
                src="#"
                alt="Pessoa em cima de um livro enquanto mostra capelo"
              />
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            lg={7}
            mx={{ lg: 0, md: 4, xs: 4 }}
            my={{ lg: 0, md: 3, xs: 3 }}
          >
            <Paper elevation={4}>
              <Grid container xs={12} px={5} py={3}>
                <Grid container item xs={12} pb={1}>
                  <Grid item xs={12} pt={1}>
                    <Typography variant="h4">
                      <strong>A educação é um direito de todos.</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} pb={1}>
                    <Typography variant="h5">
                      E por isso, o <u>+Ensino</u> está aqui!
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} pb={1}>
                  <Typography variant="body1">
                    Com o <strong>+Ensino</strong>, você tem acesso{" "}
                    <strong>gratuito</strong> a conteúdo didático para se
                    preparar para suas provas de <strong>vestibular</strong>!
                  </Typography>
                </Grid>
                <Grid item xs={12} pb={1}>
                  <Typography variant="body1">
                    Uma vez cadastrado, você poderá encontrar os mais diversos{" "}
                    <strong>tópicos</strong> nas áreas de conhecimento,{" "}
                    <strong>baixar</strong> materiais de estudo,{" "}
                    <strong>assistir</strong> a videoaulas gravadas por nossos
                    professores e <strong>tirar suas dúvidas</strong> com eles e
                    os monitores disponíveis.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Grid item container xs={12} justifyContent="center" mb={5}>
          <Grid item xs={2} mr={2}>
            <KnowledgeAreaCard
              title={"Lizard"}
              description={` Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica`}
            />
          </Grid>

          <Grid item xs={2} mr={2}>
            <KnowledgeAreaCard
              title={"Lizard"}
              description={` Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica`}
            />
          </Grid>

          <Grid item xs={2} mr={2}>
            <KnowledgeAreaCard
              title={"Lizard"}
              description={` Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica`}
            />
          </Grid>

          <Grid item xs={2} mr={2}>
            <KnowledgeAreaCard
              title={"Lizard"}
              description={` Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica`}
            />
          </Grid>

          <Grid item xs={2} mr={2}>
            <KnowledgeAreaCard
              title={"Lizard"}
              description={` Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica`}
            />
          </Grid>
        </Grid>

        <Grid item container xs={12} justifyContent="center" mb={5}>
          <Grid item xs={7} mr={2}>
            <Paper elevation={4}>
              <Grid container xs={12} px={5} py={3}>
                <Grid container item xs={12} pb={1}>
                  <Grid item xs={12} pt={1}>
                    <Typography variant="h4">
                      <strong>A educação é um direito de todos.</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} pb={1}>
                    <Typography variant="h5">
                      E por isso, o <u>+Ensino</u> está aqui!
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} pb={1}>
                  <Typography variant="body1">
                    Com o <strong>+Ensino</strong>, você tem acesso{" "}
                    <strong>gratuito</strong> a conteúdo didático para se
                    preparar para suas provas de <strong>vestibular</strong>!
                  </Typography>
                </Grid>
                <Grid item xs={12} pb={1}>
                  <Typography variant="body1">
                    Uma vez cadastrado, você poderá encontrar os mais diversos{" "}
                    <strong>tópicos</strong> nas áreas de conhecimento,{" "}
                    <strong>baixar</strong> materiais de estudo,{" "}
                    <strong>assistir</strong> a videoaulas gravadas por nossos
                    professores e <strong>tirar suas dúvidas</strong> com eles e
                    os monitores disponíveis.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper elevation={4}>
              <img
                src="#"
                alt="Pessoa em cima de um livro enquanto mostra capelo"
              />
            </Paper>
          </Grid>
        </Grid>

        <Grid item container xs={12} justifyContent="center" mb={5}>
          <Grid item xs={7} mr={2}>
            <Paper elevation={4}>
              <Grid container xs={12} px={5} py={3}>
                <Grid container item xs={12} pb={1}>
                  <Grid item xs={12} pt={1}>
                    <Typography variant="h4">
                      <strong>A educação é um direito de todos.</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} pb={1}>
                    <Typography variant="h5">
                      E por isso, o <u>+Ensino</u> está aqui!
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} pb={1}>
                  <Typography variant="body1">
                    Com o <strong>+Ensino</strong>, você tem acesso{" "}
                    <strong>gratuito</strong> a conteúdo didático para se
                    preparar para suas provas de <strong>vestibular</strong>!
                  </Typography>
                </Grid>
                <Grid item xs={12} pb={1}>
                  <Typography variant="body1">
                    Uma vez cadastrado, você poderá encontrar os mais diversos{" "}
                    <strong>tópicos</strong> nas áreas de conhecimento,{" "}
                    <strong>baixar</strong> materiais de estudo,{" "}
                    <strong>assistir</strong> a videoaulas gravadas por nossos
                    professores e <strong>tirar suas dúvidas</strong> com eles e
                    os monitores disponíveis.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={3}>
            <Paper elevation={4}>
              <img
                src="#"
                alt="Pessoa em cima de um livro enquanto mostra capelo"
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
