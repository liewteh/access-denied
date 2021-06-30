import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const TextArea = ({ comment, disabledComment }) => {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      rowsMin={1}
      value={comment}
      disabled={!disabledComment}
    />
  );
};

export default TextArea;
