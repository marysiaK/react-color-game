import React from "react";

const ColorSquare = ({ absorbed, color, tileKey }) => {
  return (
    <div
      className={absorbed ? "absorbed square" : "square"}
      style={{ backgroundColor: color }}
      data-key={tileKey}
    ></div>
  );
};

export default ColorSquare;
