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
    <div className="bg-neutral-900 border border-neutral-700 lg:mt-5 lg:mx-4 lg:mb-0 rounded-2xl flex lg:flex-col flex-row lg:items-center lg:justify-center justify-between">
      <div>
        <Link to="/" className="flex items-center -mb-2 ml-2">
          <img
            src={snapsText}
            alt="icon"
            className="size-20 md:size-[120px] invert"
          />
        </Link>
      </div>
      {user?.result ? (
        <div className="lg:mb-4 flex justify-between items-center lg:w-full px-4 mt-1 lg:mt-0">
          <div className="flex items-center space-x-2 mr-2 lg:mr-0">
            {user?.result.imageUrl ? (
              <img
                className="h-12 w-12 rounded-full"
                src={user?.result.imageUrl}
                alt={user?.result.name.charAt(0)}
              />
            ) : (
              <span className="md:h-12 md:w-12 h-8 w-8 rounded-full bg-gray-200 text-gray-700 flex justify-center items-center text-center font-bold text-xl">
                {getInitials(user?.result.name)}
              </span>
            )}
            <span className="text-white md:text-2xl text-lg font-bold">
              {user?.result.name}
            </span>
          </div>
          <button onClick={accountLogout} className="mt-1 mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="#ff0000"
                d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
              ></path>
            </svg>
          </button>
        </div>
      ) : (
        <div className="lg:mb-4 lg:flex flex-col justify-center items-center my-6 mr-3 md:mt-12 lg:my-0 lg:mr-0">
          <Link
            to="/auth"
            className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
