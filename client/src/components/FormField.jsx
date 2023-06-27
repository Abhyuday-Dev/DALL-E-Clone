import React from "react";

const FormField = ({
  LabelName,
  name,
  placeholder,
  type,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div>
        <label htmlFor={name}>{LabelName}</label>
        {isSurpriseMe && (
          <button type="button"  className="surprise-button" onClick={handleSurpriseMe}>
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default FormField;
