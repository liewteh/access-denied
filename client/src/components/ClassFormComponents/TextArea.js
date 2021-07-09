import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const TextArea = ({ defaultValue, disabled, onChange }) => {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={1}
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={onChange}
      placeholder={""}
    />
  );
};

export default TextArea;
