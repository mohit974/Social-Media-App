import React from "react";

const Input = ({ name, handleChange, label, type, handleShowPassword }) => (
  <div className={`mb-4 w-full`}>
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      name={name}
      onChange={handleChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
