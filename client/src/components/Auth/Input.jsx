import React from "react";

const Input = ({ name, handleChange, label, type, handleShowPassword }) => (
  <div className="w-full">
    <label className="block text-white text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    {name === "password" ? (
      <div className="flex shadow appearance-none border w-full h-8 leading-tight focus:outline-none focus:shadow-outline rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600">
        <input
          name={name}
          onChange={handleChange}
          type={type}
          className="p-0 size-full flex-grow border-none bg-inherit pl-3 pb-2 shadow appearance-none border w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
          className="inline mx-2 mt-1 cursor-pointer"
          onClick={handleShowPassword}
        >
          <path
            fill="white"
            d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
          ></path>
        </svg>
      </div>
    ) : (
      <input
        name={name}
        onChange={handleChange}
        className="shadow appearance-none border w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600"
        type={type}
        required
      />
    )}
  </div>
);

export default Input;
