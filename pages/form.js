import React from "react";

import getForm from "../utils/getForm";
import setField from "../utils/setField";

import BasicHoverButton from "../components/BasicHoverButton";
import FieldEditContainer from "../components/FieldEditContainer";

import "semantic-ui-css/semantic.min.css";
import {
  Form,
  Grid,
  Transition,
  Segment,
  Dropdown,
  Container,
  Input
} from "semantic-ui-react";

const fieldTypes = [
  {
    key: "Name",
    text: "Name",
    value: "Name"
  },
  {
    key: "Email",
    text: "Email",
    value: "Email"
  }
];

class FormBuilder extends React.Component {
  static async getInitialProps({ query }) {
    const formDoc = await getForm(query.id);
    const form = formDoc.data();
    const fieldsRef = await form.fields.get();
    const fields = Object.values(fieldsRef.data());
    return { displayName: form.displayName, fields, formID: query.id };
  }

  constructor(props) {
    super(props);
    this.state = {
      fields: this.props.fields,
      isCreating: false,
      newFieldName: "",
      newFieldType: ""
    };
  }

  async getFields(docID) {
    const formDoc = await getForm(docID);
    const form = formDoc.data();
    const fieldsRef = await form.fields.get();
    return Object.values(fieldsRef.data());
  }

  async newFieldSubmit() {
    const newField = {
      [this.state.newFieldName]: {
        name: this.state.newFieldName,
        type: this.state.newFieldType
      }
    };
    try {
      const dbRes = await setField(this.props.formID, newField);

      const fields = await this.getFields(this.props.formID);
      console.log(fields);

      this.setState({
        fields: fields,
        isCreating: false,
        newFieldName: "",
        newFieldType: ""
      });
    } catch (error) {
      throw new Error("There was a problem writing to the database");
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    // this.setState({ fields: Object.values(this.props.fields) });
    const fields = this.state.fields;
    console.log(fields);
    return (
      <Container>
        <Grid centered textAlign="center">
          <Grid.Row only="tablet computer">
            <div className="desktopPadding" />
          </Grid.Row>
          <Grid.Row>
            <BasicHoverButton // Should this create a new row in the database
              // or should it create an empty field that on save creates a new row in the database
              // If it creates an empty field, how does the database client know to update some but create a new one
              basicInverted
              loading={this.state.isCreating}
              size="massive"
              color="black"
              onClick={() => this.setState({ isCreating: true })}
            >
              New Field
            </BasicHoverButton>
          </Grid.Row>
          <Transition visible={this.state.isCreating} unmountOnHide>
            <Grid.Row>
              <Grid.Column>
                <Segment padded="very">
                  <Form>
                    <Form.Group>
                      <Form.Field>
                        <label>Field Name</label>
                        <Input
                          name="newFieldName"
                          placeholder="Field Name"
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Field Type</label>
                        <Dropdown
                          name="newFieldType"
                          selection
                          placeholder={"Field Types"}
                          options={fieldTypes}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Button
                      disabled={
                        !this.state.newFieldName || !this.state.newFieldType
                      }
                      onClick={() => this.newFieldSubmit()}
                    >
                      Add New Field
                    </Form.Button>
                  </Form>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Transition>
          {fields.map((fieldData, idx) => {
            return (
              <Grid.Row>
                <FieldEditContainer
                  fieldData={fieldData}
                  formID={this.props.formID}
                />
              </Grid.Row>
            );
          })}
        </Grid>
        <style jsx>{``}</style>
      </Container>
    );
  }
}
export default FormBuilder;
