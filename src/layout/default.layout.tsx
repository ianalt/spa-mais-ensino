import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Outlet } from "react-router-dom";
import { DefaultAppBar } from "./default.appbar";
// import { DefaultAppBar } from "./default.appbar";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" textAlign={"center"}>
      Copyright ©{" "}
      <strong>
        Ian Alt de Oliveira - Universidade Católica de Petrópolis{" "}
        {new Date().getFullYear()}.
      </strong>
    </Typography>
  );
}

export const DefaultLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <DefaultAppBar />
      <Container
        component="main"
        sx={{ mt: 2, mb: 2 }}
        maxWidth="xl"
        disableGutters
      >
        <Outlet />
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
};
