import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const TextArea = ({ comment }) => {
  return (
    <TextareaAutosize aria-label="minimum height" rowsMin={1} value={comment} />
  );
};

export default TextArea;
