import React from "react";

const Input = ({ name, handleChange, label, type, handleShowPassword }) => (
  <div className={`w-full`}>
    <label className="block text-white text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      name={name}
      onChange={handleChange}
      className="shadow appearance-none border w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 border-neutral-700 text-neutral-400 dark:placeholder-neutral-500 focus:ring-neutral-600"
      type={type}
      required
    />
    {name === "password" && (
      <div className="flex justify-end">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          onClick={handleShowPassword}
        />
      </div>
    )}
  </div>
);

export default Input;
