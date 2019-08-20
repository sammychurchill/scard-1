import React from "react";
import FieldEmail from "./FieldEmail";
import FieldText from "./FieldText";
import ConfigureEmail from "./ConfigureEmail";
import { Form, Grid } from "semantic-ui-react";

import setField from "../utils/setField";
class FieldEditContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      fieldData: this.props.fieldData
    };
  }

  previewField(fieldType) {
    const ftype = "email";
    switch (fieldType.toLowerCase()) {
      case "text": //TODO: Use types
        return { preview: FieldText, edit: ConfigureEmail };

      case "email":
        return { preview: FieldEmail, edit: ConfigureEmail };

      default:
        throw new Error("Unrecognised field type");
    }
  }

  async handleSaveClick(data) {
    console.log("data", data);
    console.log("props", this.props);
    const dbRes = await setField(this.props.formID, {
      [data.fieldData.name]: data.fieldData
    });
  }

  handleEditClick(val) {
    this.setState({ isEditing: val });
  }

  handleFieldChange(fieldName, value) {
    const fieldData = { ...this.state.fieldData };
    fieldData[fieldName] = value;
    this.setState({ fieldData });
  }

  render() {
    const fieldData = this.state.fieldData;
    const PreviewField = this.previewField(fieldData.type).preview;
    const EditField = this.previewField(fieldData.type).edit;
    return (
      <Grid columns={2}>
        <Grid.Column>
          <Form>
            <PreviewField {...this.state} />
          </Form>
        </Grid.Column>
        <Grid.Column>
          <Form>
            <EditField
              {...this.state}
              handleFieldChange={(fieldName, value) =>
                this.handleFieldChange(fieldName, value)
              }
              handleEditClick={val => this.handleEditClick(val)}
              handleSaveClick={data => this.handleSaveClick(data)}
            />
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default FieldEditContainer;
