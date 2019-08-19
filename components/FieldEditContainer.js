import React from "react";
import FieldEmail from "./FieldEmail";
import FieldText from "./FieldText";
import ConfigureEmail from "./ConfigureEmail";
import { Form, Grid } from "semantic-ui-react";

class FieldEditContainer extends React.Component {
  setItem() {
    let item;
    switch (this.props.type) {
      case "text": //TODO: Use types
        item = <FieldText {...this.props} />;
        break;

      case "email": //TODO: Use types
        item = <FieldEmail {...this.props} />;
        break;

      default:
        break;
    }
    return item;
  }

  handleEditClick(val) {
    this.setState({ isEditing: val });
  }

  render() {
    const item = this.setItem();
    return (
      <Grid columns={2}>
        <Grid.Column>
          <Form>{item}</Form>
        </Grid.Column>
        <Grid.Column>
          <Form>
            <ConfigureEmail
              {...this.props}
              {...this.state}
              handleEditClick={val => this.handleEditClick(val)}
            />
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default FieldEditContainer;
