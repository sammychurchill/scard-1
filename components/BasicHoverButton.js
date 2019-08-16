import React, { useState } from "react";

import { Button } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

function BasicHoverButton(props) {
  const t = props.basicInverted ? false : true;
  const f = !t;
  const [isHover, setHover] = useState(f);
  const handleEnter = () => setHover(t);
  const handleLeave = () => setHover(f);
  return (
    <Button
      basic={!isHover}
      onMouseEnter={() => handleEnter()}
      onMouseLeave={() => handleLeave()}
      {...props}
    >
      {props.children}
    </Button>
  );
}

export default BasicHoverButton;
