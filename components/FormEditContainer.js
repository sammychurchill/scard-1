import React, { Component } from "react";

import FieldEditContainer from "../components/FieldEditContainer";
import FieldEmail from "./FieldEmail";
import FieldText from "./FieldText";
import ConfigureEmail from "./ConfigureEmail";

import {
  Form,
  Grid,
  Transition,
  Segment,
  Dropdown,
  Input,
  Container,
  Header,
  Icon
} from "semantic-ui-react";

export class FormEditContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { fields: this.props.fields };
  }

  getFieldComponent(fieldType) {
    switch (fieldType.toLowerCase()) {
      case "text": //TODO: Use types
        return { preview: FieldText, edit: ConfigureEmail };

      case "email":
        return { preview: FieldEmail, edit: ConfigureEmail };

      default:
        throw new Error("Unrecognised field type");
    }
  }

  updateFields(idx, field) {
    const newFields = [...this.state.fields];
    newFields[idx] = field;
    this.setState({ fields: newFields });
  }

  render() {
    const fields = this.state.fields;
    return (
      <>
        <Grid columns="equal" container textAlign="left">
          <Grid.Column>
            <Segment basic className="preview">
              <Header as="h2" textAlign="center">
                <Header.Content>Preview</Header.Content>
              </Header>
              <Form>
                {fields.map((fieldData, idx) => {
                  console.log("FieldData", fieldData);
                  const PreviewField = this.getFieldComponent(fieldData.type)
                    .preview;
                  return (
                    <Grid.Row>
                      <PreviewField fieldData={fieldData} />
                    </Grid.Row>
                  );
                })}
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column width="2" />
          <Grid.Column floated="right">
            <Segment basic>
              <Header as="h2" textAlign="center">
                <Header.Content>Edit Form</Header.Content>
              </Header>
              {fields.map((fieldData, idx) => {
                const EditField = this.getFieldComponent(fieldData.type).edit;
                return (
                  <Grid.Row>
                    <FieldEditContainer
                      field={EditField}
                      fieldData={fieldData}
                      formID={this.props.formID}
                      updateFields={field => this.updateFields(idx, field)}
                    />
                    <br />
                    <br />
                  </Grid.Row>
                );
              })}
            </Segment>
          </Grid.Column>
        </Grid>
        <style jsx>{`
          .preview {
            background-color: blue;
            margin: 50px;
          }
        `}</style>
      </>
    );
  }
}

export default FormEditContainer;
