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
      isEditing: false
    };
  }

  async handleSaveClick(data) {
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
    this.props.updateFields(fieldData);
  }

  render() {
    const EditField = this.props.field;
    return (
      <Form>
        <EditField
          {...this.props}
          isEditing={this.state.isEditing}
          handleFieldChange={(fieldName, value) =>
            this.handleFieldChange(fieldName, value)
          }
          handleEditClick={val => this.handleEditClick(val)}
          handleSaveClick={data => this.handleSaveClick(data)}
        />
      </Form>
    );
  }
}

export default FieldEditContainer;
