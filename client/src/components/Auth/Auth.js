import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import dotenv from "dotenv";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";
import Input from "./Input";
import Icon from "./icon";
import useStyles from "./styles";

dotenv.config();

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [IsSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (IsSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    // const result = res?.profileObj;
    // const token = res?.tokenId;
    const token = res?.credential;
    const result = jwt_decode(token);

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => {
    alert("Google Sign In was unsuccessful. Try again later");
  };

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {IsSignup ? "Sign up" : "Sign in"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {IsSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {IsSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {IsSignup ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {IsSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Auth;
