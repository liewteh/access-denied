import React, {useState} from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const TextArea = ({ inputValue }) => {

  return (
    <TextareaAutosize
      aria-label="minimum height"
      rowsMin={1}
      placeholder="other comments"
      onChange={inputValue}
      // onChange={(e) => handleUpdate(e.target.value, "comments")}
    />
  );
};

export default TextArea;
