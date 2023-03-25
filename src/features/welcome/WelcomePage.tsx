import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import WelcomeAppBar from "../../layout/welcome.appbar";
import {
  getKnowledgeAreasWelcome,
  selectKnowledgeAreas,
} from "../../slices/knowledgeAreasSlice";
// import { knowledgeAreas } from "../../utils/constants";
import { Link } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import KnowledgeAreaCard from "./knowledge-area-card";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const knowledgeAreas = useAppSelector(selectKnowledgeAreas);

  useEffect(() => {
    dispatch(getKnowledgeAreasWelcome());
  }, []);

  return (
    <Box>
      <WelcomeAppBar />

      <Grid container justifyContent="center" alignItems="center" my={5}>
        <Grid item xs={12}>
          <Typography mb={1} variant="h1" textAlign={"center"}>
            <strong>+Ensino</strong>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" textAlign={"center"}>
            Porque a educação é um <u>direito</u>.
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent={{ md: "center" }} px={{ xs: 2 }}>
        <Grid item container xs={12} my={5} justifyContent="space-between">
          <Grid item xs={12} md={5} mb={{ xs: 3, md: 0 }}>
            <Paper elevation={4}>
              <img
                src="images/undraw_road_to_knowledge_m8s0.png"
                alt="Imagem"
                height="350"
                width="100%"
              />
            </Paper>
          </Grid>

          <Grid item container xs={12} md={6.5}>
            <Paper
              component={"div"}
              elevation={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item container xs={12}>
                <Grid item container xs={12}>
                  <Grid item xs={12} px={2} my={1}>
                    <Typography
                      variant="h4"
                      textAlign={{ xs: "center", md: "right" }}
                    >
                      <strong>A educação é um direito de todos.</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} px={2} mb={1}>
                    <Typography
                      variant="h5"
                      textAlign={{ xs: "center", md: "right" }}
                    >
                      E por isso, o <u>+Ensino</u> está aqui!
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} px={2} my={1}>
                  <Typography
                    variant="body1"
                    textAlign={{ xs: "center", md: "right" }}
                  >
                    Com o <strong>+Ensino</strong>, você tem acesso{" "}
                    <strong>gratuito</strong> a conteúdo didático para se
                    preparar para suas provas de <strong>vestibular</strong>!
                  </Typography>
                </Grid>
                <Grid item xs={12} px={2} mt={1} mb={2}>
                  <Typography
                    variant="body1"
                    textAlign={{ xs: "center", md: "right" }}
                  >
                    Uma vez cadastrado, você poderá encontrar os mais diversos{" "}
                    <strong>tópicos</strong> das áreas de conhecimento,{" "}
                    <strong>baixar</strong> materiais de estudo,{" "}
                    <strong>assistir</strong> às videoaulas gravadas por nossos
                    professores e <strong>tirar suas dúvidas</strong> com eles e
                    os monitores disponíveis.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={12}
          my={5}
          justifyContent="space-between"
          alignContent="center"
        >
          <Grid item container xs={12} md={6.5} mb={{ xs: 3, md: 0 }}>
            <Paper
              elevation={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item container xs={12}>
                <Grid item container xs={12}>
                  <Grid item xs={12} px={2} my={1}>
                    <Typography
                      variant="h4"
                      textAlign={{ xs: "center", md: "left" }}
                    >
                      <strong>Organização para um melhor aprendizado.</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} px={2} mb={1}>
                    <Typography
                      variant="h5"
                      textAlign={{ xs: "center", md: "left" }}
                    >
                      No <u>+Ensino</u>, todo conteúdo é organizado e pensado
                      para você!
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} px={2} my={1}>
                  <Typography
                    variant="body1"
                    textAlign={{ xs: "center", md: "left" }}
                  >
                    Sabemos que conteúdo de qualidade não se encontra com
                    facilidade, tão pouco de forma centralizada...
                  </Typography>
                </Grid>
                <Grid item xs={12} px={2} mt={1} mb={2}>
                  <Typography
                    variant="body1"
                    textAlign={{ xs: "center", md: "left" }}
                  >
                    Porém, o <strong>+Ensino</strong> se preocupa em organizar o
                    material didático disponível. Separando o conteúdo pelas
                    áreas de conhecimento do{" "}
                    <strong>Exame Nacional do Ensino Médio (ENEM)</strong>, você
                    poderá buscar pelas <strong>5 áreas</strong>, cada uma com
                    diversas categorias para <strong>facilitar</strong> seu
                    planejamento de estudos.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper elevation={4}>
              <img
                src="images/undraw_road_to_knowledge_m8s0.png"
                alt="Imagem"
                height="350"
                width="100%"
              />
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" textAlign={"center"} my={5}>
            <strong>As áreas de conhecimento:</strong>
          </Typography>
        </Grid>

        {/* //TODO quando clicar na área de conhecimento, apresentar dialog com categorias etc */}
        <Grid
          item
          container
          xs={12}
          justifyContent={{ xs: "space-evenly" }}
          mb={5}
        >
          {knowledgeAreas.list.map((knowledgeArea) => {
            const { id, name } = knowledgeArea;

            return (
              <Grid item key={id} xs={12} md={5} lg={3} xl={2} m={2}>
                {knowledgeAreas.status === "loading" ? (
                  <Skeleton variant="rectangular" width={350} height={350} />
                ) : (
                  <KnowledgeAreaCard name={name} />
                )}
              </Grid>
            );
          })}
        </Grid>

        <Grid
          item
          container
          xs={12}
          my={5}
          justifyContent="space-between"
          alignContent="center"
        >
          <Grid item container xs={12} md={6.5} mb={{ xs: 3, md: 0 }}>
            <Paper
              elevation={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item container xs={12}>
                <Grid item container xs={12}>
                  <Grid item xs={12} px={2} my={1}>
                    <Typography
                      variant="h4"
                      textAlign={{ xs: "center", md: "left" }}
                    >
                      <strong>Dúvidas sobre algum conteúdo?</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} px={2} mb={1}>
                    <Typography
                      variant="h5"
                      textAlign={{ xs: "center", md: "left" }}
                    >
                      Nós te ajudamos, basta publicá-la!
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} px={2} mt={1} mb={2}>
                  <Typography
                    variant="body1"
                    textAlign={{ xs: "center", md: "left" }}
                  >
                    Com a <strong>sessão de comentários</strong> em cada aula
                    das disciplinas, <strong>professores</strong> e{" "}
                    <strong>monitores</strong> do <strong>+Ensino</strong> se
                    responsabilizam não apenas a criarem o conteúdo que você irá
                    consumir, como também a{" "}
                    <strong>sanarem suas dúvidas</strong>.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper elevation={4}>
              <img
                src="images/undraw_road_to_knowledge_m8s0.png"
                alt="Imagem"
                height="350"
                width="100%"
              />
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" textAlign={"center"} my={3}>
            <strong>O conhecimento é um direito seu e de todos!</strong>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" textAlign={"center"}>
            <Link href="#">Cadastre-se</Link> e tenha acesso ao que sempre foi
            um direito seu!
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
