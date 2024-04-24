import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import snapsText from "../../images/snaps-text.png";
import { googlesignup, logout, signin, signup } from "../../reducers/auth";
import Input from "./Input";

const Auth = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [IsSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authData = useSelector((state) => state.auth.authData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (IsSignup) {
      dispatch(signup({ formData, navigate }));
    } else {
      dispatch(signin({ formData, navigate }));
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
    const token = res?.credential;
    const result = jwt_decode(token);

    try {
      dispatch(googlesignup({ result, token }));
      navigate("/");
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full px-6 space-y-6 bg-neutral-900 border border-neutral-700 rounded-xl shadow-sm">
          <div className="fixed top-1 left-10">
            <Link to="/" className="-mb-2">
              <img
                src={snapsText}
                alt="icon"
                className="md:size-[120px] invert"
              />
            </Link>
          </div>
          <div>
            <div className="text-center text-2xl font-bold text-white">
              {IsSignup ? "Sign up" : "Sign in"}
            </div>
          </div>
          <div className="flex justify-center items-center">
            {IsSignup ? (
              <div class="inline text-sm text-neutral-400">
                Already have an account? &nbsp;
                <div
                  class="inline decoration-2 hover:underline font-medium text-blue-500 hover:cursor-pointer"
                  onClick={switchMode}
                >
                  Sign in here
                </div>
              </div>
            ) : (
              <div class="inline text-sm text-neutral-400">
                Don't have an account yet? &nbsp;
                <div
                  class="inline decoration-2 hover:underline font-medium text-blue-500 hover:cursor-pointer"
                  onClick={switchMode}
                >
                  Sign up here
                </div>
              </div>
            )}
          </div>
          <div className="mt-2 flex justify-center items-center">
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign in with Google"
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          <div class="py-2 flex items-center text-xs uppercase before:flex-1 before:border-t  before:me-6 after:flex-1 after:border-t after:ms-6 text-neutral-500 before:border-neutral-600 after:border-neutral-600">
            Or
          </div>

          <form className="space-y-2" onSubmit={handleSubmit}>
            {IsSignup && (
              <div className="flex space-x-2">
                <Input
                  name="firstName"
                  handleChange={handleChange}
                  label="First Name"
                />
                <Input
                  name="lastName"
                  handleChange={handleChange}
                  label="Last Name"
                />
              </div>
            )}
            <Input
              name="email"
              handleChange={handleChange}
              label="Email Address"
            />
            <Input
              name="password"
              handleChange={handleChange}
              label="Password"
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {IsSignup && (
              <Input
                name="confirmPassword"
                handleChange={handleChange}
                label="Confirm Password"
                type="password"
              />
            )}
            <div>
              <button
                type="submit"
                class="w-full py-3 px-4 mb-6 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                {IsSignup ? "Sign up" : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Auth;
