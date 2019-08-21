import React from "react";

import { loadDB } from "../firebase";
import getForm from "../utils/getForm";
import setField from "../utils/setField";

import "semantic-ui-css/semantic.min.css";
import {
  Form,
  Grid,
  Transition,
  Segment,
  Dropdown,
  Input
} from "semantic-ui-react";

import { FormEditContainer } from "../components/FormEditContainer";
import BasicHoverButton from "../components/BasicHoverButton";

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

  async componentDidMount() {
    const db = await loadDB();
    this.unsubscribe = await db
      .firestore()
      .collection("forms")
      .doc(this.props.formID)
      .onSnapshot(snapshot => {
        console.log("snapshot", snapshot);
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
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

  handleNewFieldChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    // this.setState({ fields: Object.values(this.props.fields) });
    const fields = this.state.fields;
    console.log(fields);
    return (
      <>
        <Grid centered textAlign="center" container>
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
                          onChange={this.handleNewFieldChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Field Type</label>
                        <Dropdown
                          name="newFieldType"
                          selection
                          placeholder={"Field Types"}
                          options={fieldTypes}
                          onChange={this.handleNewFieldChange}
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
          <Grid.Row>
            <FormEditContainer {...this.props} {...this.state} />
          </Grid.Row>
        </Grid>
        <style jsx global>{`
          body {
            background-color: #f9fbfd;
          }
        `}</style>
      </>
    );
  }
}
export default FormBuilder;
