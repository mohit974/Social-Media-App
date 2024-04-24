import React from "react";

const Input = ({
  name,
  handleChange,
  label,
  type,
  handleShowPassword,
  showPassword,
  value,
}) => (
  <div className="w-full">
    <label className="block text-white text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    {name === "password" ? (
      <div className="flex shadow appearance-none border w-full h-8 leading-tight focus:outline-none focus:shadow-outline rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600">
        <input
          name={name}
          value={value}
          onChange={handleChange}
          type={type}
          className="p-0 size-full flex-grow border-none bg-inherit pl-3 pb-2 shadow appearance-none border w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600"
        />
        {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            className="inline mx-2 mt-1 cursor-pointer"
            onClick={handleShowPassword}
            viewBox="0 0 512 512"
          >
            <path
              fill="white"
              d="m63.998 86.005l21.998-21.998L447.999 426.01l-21.998 21.998zM259.34 192.09l60.57 60.57a64.07 64.07 0 0 0-60.57-60.57m-6.68 127.82l-60.57-60.57a64.07 64.07 0 0 0 60.57 60.57"
            ></path>
            <path
              fill="white"
              d="M256 352a96 96 0 0 1-92.6-121.34l-69.07-69.08C66.12 187.42 39.24 221.14 16 256c26.42 44 62.56 89.24 100.2 115.18C159.38 400.92 206.33 416 255.76 416A233.47 233.47 0 0 0 335 402.2l-53.61-53.6A95.84 95.84 0 0 1 256 352m0-192a96 96 0 0 1 92.6 121.34L419.26 352c29.15-26.25 56.07-61.56 76.74-96c-26.38-43.43-62.9-88.56-101.18-114.82C351.1 111.2 304.31 96 255.76 96a222.92 222.92 0 0 0-78.21 14.29l53.11 53.11A95.84 95.84 0 0 1 256 160"
            ></path>
          </svg>
        ) : (
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
        )}
      </div>
    ) : (
      <input
        name={name}
        value={value}
        onChange={handleChange}
        className="shadow appearance-none border w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-neutral-400 placeholder-neutral-500 focus:ring-neutral-600"
        type={type}
        required
      />
    )}
  </div>
);

export default Input;
