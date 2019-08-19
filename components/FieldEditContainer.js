import React from "react";
import FieldEmail from "./FieldEmail";
import FieldText from "./FieldText";
import ConfigureEmail from "./ConfigureEmail";
import { Form, Grid } from "semantic-ui-react";

class FieldEditContainer extends React.Component {
  previewField(fieldType) {
    switch (fieldType) {
      case "text": //TODO: Use types
        return { preview: FieldText, edit: ConfigureEmail };

      case "email":
        return { preview: FieldEmail, edit: ConfigureEmail };

      default:
        throw new Error("Unrecognised field type");
    }
  }

  handleEditClick(val) {
    this.setState({ isEditing: val });
  }

  render() {
    const PreviewField = this.previewField(this.props.type).preview;
    const EditField = this.previewField(this.props.type).edit;
    return (
      <Grid columns={2}>
        <Grid.Column>
          <Form>
            <PreviewField {...this.props} />
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Form>
            <EditField
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
