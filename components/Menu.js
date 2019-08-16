import React, { useState } from "react";
import Link from "next/link";

import { Button, Icon } from "semantic-ui-react";

const Menu = props => {
  return (
    <div className="floatingMenu">
      <Link href="/">
        <Button circular icon="home" color="blue" />
      </Link>
      <style jsx>{`
        .floatingMenu {
            top: 1em;
            left: 1em;
            position: fixed;
            z-index: 10;
          }
        }
      `}</style>
    </div>
  );
};

export default Menu;
