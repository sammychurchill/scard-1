import React from "react";
import FieldEmail from "./FieldEmail";
import FieldText from "./FieldText";
import ConfigureEmail from "./ConfigureEmail";
import { Form, Grid } from "semantic-ui-react";

class FieldEditContainer extends React.Component {
  setItem(fieldType) {
    switch (fieldType) {
      case "text": //TODO: Use types
        return FieldText;

      case "email":
        return FieldEmail;

      default:
        throw new Error("Unrecognised field type");
    }
  }

  handleEditClick(val) {
    this.setState({ isEditing: val });
  }

  render() {
    const Field = this.setItem(this.props.type);
    return (
      <Grid columns={2}>
        <Grid.Column>
          <Form>{<Field {...this.props} />}</Form>
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
