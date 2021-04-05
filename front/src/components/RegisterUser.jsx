import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import { registerRequest } from "../state/user";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Link, useHistory } from "react-router-dom";

import useStyles from "../utils/stylesRegister";
import Copyright from "../utils/Copyright";
import { useSnackbar } from "notistack";

export const Cadete = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const history = useHistory();

  const [input, setInput] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    console.log(e.target.value);
    setInput({ ...input, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerRequest(input))
      .then(({ payload }) => {
        const r = payload.errors[0].message;
        if (payload.errors)
          enqueueSnackbar(`${r}`, {
            variant: "error",
          });
      })
      .catch((err) => {
        enqueueSnackbar("Usuario registrado", {
          variant: "success",
        }) && history.push("/login");
      });
  };

  return (
    <div style={{ paddingTop: "2rem" }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de Cadete
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="lname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  labelId="demo-simple-select-filled-label"
                  name="vehicle"
                  id="demo-simple-select-filled"
                  onChange={handleChange}
                >
                  <MenuItem value="moto" key={1}>
                    Moto
                  </MenuItem>
                  <MenuItem value="bicicleta" key={2}>
                    Bicicleta
                  </MenuItem>
                  <MenuItem value="auto" key={3}>
                    Auto
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="company"
                  label="Cadeteria afiliada"
                  name="company"
                  autoComplete="company"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNum"
                  label="phoneNum"
                  name="phoneNum"
                  autoComplete="phoneNum"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrarse
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login">Ya tienes una cuenta? Logueate.</Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};
