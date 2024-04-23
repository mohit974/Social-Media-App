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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="fixed top-1 left-10">
            <Link to="/" className="-mb-2">
              <img src={snapsText} alt="icon" className="md:size-[120px]" />
            </Link>
          </div>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {IsSignup ? "Sign up" : "Sign in"}
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {IsSignup && (
              <>
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
              </>
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
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {IsSignup ? "Sign up" : "Sign in"}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  {" "}
                  Or continue with{" "}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className="mt-6">
              <button
                onClick={switchMode}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {IsSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Auth;
