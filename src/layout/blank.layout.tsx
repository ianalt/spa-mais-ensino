import React from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
export const BlankLayout = () => {
  return (
    <Container component="main" sx={{ mt: 2, mb: 2 }} maxWidth="xl">
      <Outlet />
    </Container>
  );
};
