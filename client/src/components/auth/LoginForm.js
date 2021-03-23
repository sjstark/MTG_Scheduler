import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";

import {
  TextField,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  Typography
} from "@material-ui/core"

import {
  Alert
} from '@material-ui/lab'

import Image from 'material-ui-image'

import MTGLogo from '../../media/MTG Logo Black.png'

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (

    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >

      <Paper elevation={3}>
        <Box
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="300px">
            <Image src={MTGLogo} />
          </Box>
          <Typography
            variant="h3"
          >
            Labor Scheduling Utility
      </Typography>

          <div>
            {errors.map((error) => (
              <Alert
                severity="error"
              >
                {error}
              </Alert>
            ))}
          </div>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={updateEmail}
            margin="normal"
          />

          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={updatePassword}
            margin="normal"
          />
          <Box m={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={onLogin}
              m={3}
            >
              Login
            </Button>
          </Box>
          <Box m={1}>
            <Button
              type="submit"
              variant="contained"
              disabled
              margin="normal"
            >
              New Member
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;
