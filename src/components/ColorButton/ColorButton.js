import React from "react";

const ColorButton = ({ color, handleButtonClick }) => {
  return (
    <button
      className="square buttonSquare"
      style={{ backgroundColor: color }}
      onClick={handleButtonClick}
    />
  );
};

export default ColorButton;
