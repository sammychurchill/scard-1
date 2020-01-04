import React from "react";

import { loadDB } from "../firebase";
import getForm from "../utils/getForm";
import setField from "../utils/setField";

import "semantic-ui-css/semantic.min.css";
import { Grid } from "semantic-ui-react";

import { FormEditContainer } from "../components/FormEditContainer";
import BasicHoverButton from "../components/BasicHoverButton";
import NewFormSegment from "../components/NewFormSegment";

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
      isLoading: false,
      isCreating: false,
      isAnimating: false,
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
    console.log("handleNew", e);
    this.setState({ [name]: value });
  };

  handleAnimationFinish = () => {
    this.setState({ isAnimating: false });
  };

  handleCancelClick = () => {
    this.setState({ isCreating: false });
    this.setState({ isAnimating: true });
  };

  handleNewButtonClick = () => {
    if (this.state.isCreating) {
      this.newFieldSubmit();
      this.setState({ isCreating: false });
      this.setState({ isAnimating: true });
      return;
    }
    this.setState({ isCreating: true });
    this.setState({ isAnimating: true });
  };

  render() {
    const fields = this.state.fields;
    return (
      <>
        <Grid centered textAlign="center" container>
          <Grid.Row only="tablet computer">
            <div className="desktopPadding" />
          </Grid.Row>
          <Grid.Row>
            <NewFormSegment
              fieldTypes={fieldTypes}
              isCreating={this.state.isCreating}
              onChange={(e, { name, value }) =>
                this.handleNewFieldChange(e, { name, value })
              }
              onCancelClick={() => this.handleCancelClick()}
            />
          </Grid.Row>
          <Grid.Row>
            <BasicHoverButton // Should this create a new row in the database
              // or should it create an empty field that on save creates a new row in the database
              // If it creates an empty field, how does the database client know to update some but create a new one
              basicInverted
              loading={this.state.isLoading}
              size="massive"
              color="black"
              onClick={() => this.handleNewButtonClick()}
            >
              {this.state.isCreating ? "Save New Field" : "New Field"}
            </BasicHoverButton>
          </Grid.Row>
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
