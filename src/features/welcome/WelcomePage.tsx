import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { DefaultLayout } from "../../layout/default.layout";
import WelcomeAppBar from "../../layout/welcome.appbar";

export default function WelcomePage() {
  return (
    <Box>
      <WelcomeAppBar />
      <Paper></Paper>
    </Box>
  );
}
