import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { login } from "../../api/users/login";
import { useAppDispatch } from "../../app/hooks";
import { login as reduxLogin } from "../../user/userSlice";
import { checkFieldErrors, FieldErrors } from "../../utils/checkFieldErrors";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors[]>([]);
  const [requestError, setRequestError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFieldErrors([]);
    setRequestError("");

    let fieldErrors: FieldErrors[] = [];

    if (validator.isEmpty(email, { ignore_whitespace: true }))
      fieldErrors.push({ field: "email", message: "Insira um e-mail válido." });
    if (validator.isEmpty(password, { ignore_whitespace: true }))
      fieldErrors.push({
        field: "password",
        message: "Insira uma senha válida.",
      });
    if (fieldErrors.length !== 0) return setFieldErrors(fieldErrors);

    try {
      setLoading(true);
      const req = await login(email, password);

      const decodedToken: { id: number; email: string } = jwt_decode(
        req.data.access_token
      );

      dispatch(
        reduxLogin({
          id: decodedToken.id,
          email: decodedToken.email,
          role: "aluno",
        })
      );

      localStorage.setItem(
        process.env.REACT_APP_TOKEN_NAME!,
        req.data.access_token
      );

      navigate("/");
    } catch (e: any) {
      if (e.isAxiosError) {
        setRequestError(e.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Box p={4}>
                  <Typography variant="h4" sx={{ marginTop: "6px" }}>
                    {process.env.REACT_APP_NAME}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="subtitle1"
                    align="left"
                    style={{ marginBottom: "12px" }}
                  >
                    {process.env.REACT_APP_DESCRIPTION}
                  </Typography>

                  {loading && (
                    <Box>
                      <LinearProgress color="primary" />
                    </Box>
                  )}
                  {requestError !== "" && (
                    <Alert severity="error">{requestError}</Alert>
                  )}
                  <form noValidate onSubmit={submitData}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="E-mail"
                      name="email"
                      autoFocus
                      value={email}
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      placeholder="Digite seu e-mail..."
                      onChange={(e) => setEmail(e.target.value)}
                      error={checkFieldErrors(fieldErrors, "email") !== ""}
                      helperText={checkFieldErrors(fieldErrors, "email")}
                      disabled={loading}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Senha"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      placeholder="Digite sua senha..."
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      error={checkFieldErrors(fieldErrors, "password") !== ""}
                      helperText={checkFieldErrors(fieldErrors, "password")}
                      disabled={loading}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      color="primary"
                      disabled={loading}
                    >
                      Login
                    </Button>
                  </form>
                  <Box mt={4}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="center"
                    >
                      {"Copyright © "}
                      Ian Alt de Oliveira - Universidade Católica de Petrópolis{" "}
                      {new Date().getFullYear()}
                      {"."}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <img
                    src="#"
                    alt="Jovem sentada na cadeira enquanto olha para o notebook."
                    style={{ maxWidth: "100%", maxHeight: "250px" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
