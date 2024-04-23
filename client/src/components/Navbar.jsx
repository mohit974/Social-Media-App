import decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../reducers/auth";

import snapsText from "../images/snaps-text.png";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const accountLogout = () => {
    dispatch(logout());
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) accountLogout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const getInitials = (name) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return initials.toUpperCase();
  };

  return (
    <div className="bg-[#1B1A55] mt-5 mx-4 mb-0 rounded-2xl flex flex-col items-center justify-center">
      <div>
        <Link to="/" className="flex items-center -mb-2">
          <img src={snapsText} alt="icon" className="md:size-[120px] invert" />
        </Link>
      </div>
      {user?.result ? (
        <div className="mb-4 flex flex-col justify-center items-center">
          <div className="flex items-center justify-center space-x-8">
            {user?.result.imageUrl ? (
              <img
                className="h-12 w-12 rounded-full"
                src={user?.result.imageUrl}
                alt={user?.result.name.charAt(0)}
              />
            ) : (
              <span className="h-12 w-12 rounded-full bg-gray-200 text-gray-700 flex justify-center items-center text-center font-bold text-xl">
                {getInitials(user?.result.name)}
              </span>
            )}
            <span className="text-white text-2xl font-bold">
              {user?.result.name}
            </span>
          </div>
          <button
            onClick={accountLogout}
            className="bg-red-500 text-white rounded-md px-4 py-2 mt-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="mb-4 flex flex-col justify-center items-center">
          <Link
            to="/auth"
            className="bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
