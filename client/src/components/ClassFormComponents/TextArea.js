import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const TextArea = ({ defaultValue, disabled, onChange, className }) => {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={1}
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={onChange}
      placeholder={""}
      className={className}
    />
  );
};

export default TextArea;
