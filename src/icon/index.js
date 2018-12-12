import React from "react";

import Lens from "./Lens";
import Note from "./Note";

const randomFill = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const Icon = React.memo(props => {
  let color = props.fill || randomFill();

  switch (props.name) {
    case "lens":
      return <Lens {...props} fill={color} />;
    case "note":
      return <Note {...props} fill={color} />;
    default:
      return;
  }
});

export default Icon;
