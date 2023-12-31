import React from "react";
import { styled } from "@mui/system";

const SelectButton = ({ children, selected, onClick }) => {
  const StyleSpan = styled("span")({
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
    margin: 5,
  });

  return <StyleSpan onClick={onClick}>{children}</StyleSpan>;
};

export default SelectButton;
