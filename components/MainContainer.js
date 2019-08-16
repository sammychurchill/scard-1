import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

function MainContainer(props) {
  return (
    <div className="container">
      <Container>{props.children}</Container>
      <style jsx>{`
        .container {
          margin-top: 2em;
        }
      `}</style>
    </div>
  );
}

export default MainContainer;
