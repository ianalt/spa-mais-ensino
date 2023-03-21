import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import WelcomeAppBar from "../../layout/welcome.appbar";
import { knowledgeAreas } from "../../utils/constants";
import KnowledgeAreaCard from "./knowledge-area-card";

export default function WelcomePage() {
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

      <Grid container>
        <Grid item container xs={12} my={5} justifyContent="space-between">
          <Grid item xs={5}>
            <Paper elevation={4}>
              <img src="#" alt="Imagem" width="300" height="300" />
            </Paper>
          </Grid>

          <Grid item container xs={6.5}>
            <Paper elevation={4}>
              <Grid item container xs={12}>
                <Grid item container xs={12}>
                  <Grid item xs={12} px={2} my={1}>
                    <Typography variant="h4">
                      <strong>A educação é um direito de todos.</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} px={2} mb={1}>
                    <Typography variant="h5">
                      E por isso, o <u>+Ensino</u> está aqui!
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} px={2} my={1}>
                  <Typography variant="body1">
                    Com o <strong>+Ensino</strong>, você tem acesso{" "}
                    <strong>gratuito</strong> a conteúdo didático para se
                    preparar para suas provas de <strong>vestibular</strong>!
                  </Typography>
                </Grid>
                <Grid item xs={12} px={2} mt={1} mb={2}>
                  <Typography variant="body1">
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
          <Grid item container xs={6.5}>
            <Paper elevation={4}>
              <Grid item container xs={12}>
                <Grid item container xs={12}>
                  <Grid item xs={12} px={2} my={1}>
                    <Typography variant="h4">
                      <strong>Organização para um melhor aprendizado.</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} px={2} mb={1}>
                    <Typography variant="h5">
                      No <u>+Ensino</u>, todo conteúdo é organizado e pensado
                      para você!
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} px={2} my={1}>
                  <Typography variant="body1">
                    Sabemos que conteúdo de qualidade não se encontra com
                    facilidade, tão pouco de forma centralizada...
                  </Typography>
                </Grid>
                <Grid item xs={12} px={2} mt={1} mb={2}>
                  <Typography variant="body1">
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

          <Grid item xs={5}>
            <Paper elevation={4}>
              <img src="#" alt="Imagem" width="300" height="300" />
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" textAlign={"center"} my={5}>
            As áreas de conhecimento:
          </Typography>
        </Grid>

        {/* //TODO quando clicar na área de conhecimento, apresentar dialog com categorias etc */}
        <Grid item container xs={12} justifyContent="space-between" mb={5}>
          {knowledgeAreas.map((knowledgeArea) => {
            const { id, title, description } = knowledgeArea;

            return (
              <Grid item xs={2} key={id}>
                <KnowledgeAreaCard
                  title={title}
                  description={`${
                    description.length >= 60
                      ? `${description.substring(0, 61)}...`
                      : description
                  }`}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
}
