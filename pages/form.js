import React from "react";

import getForm from "../utils/getForm";

import BasicHoverButton from "../components/BasicHoverButton";
import MainContainer from "../components/MainContainer";
import FieldEditContainer from "../components/FieldEditContainer";

import "semantic-ui-css/semantic.min.css";
import { Form, Grid } from "semantic-ui-react";

//QUESTION: what is a good way of handling these repetitive db lookups? Should the data access be in the util function?
// Should it resolve references? If so, how far?

class FormBuilder extends React.Component {
  static async getInitialProps({ query }) {
    const formDoc = await getForm(query.id);
    const form = formDoc.data();
    const fieldsRef = await form.fields.get();
    const fields = Object.values(fieldsRef.data());
    return { displayName: form.displayName, fields };
  }

  constructor(props) {
    super(props);
    this.state = { fields: props.fields };
  }

  handleSaveClick(data) {
    console.log("data", data);
  }

  handleFieldChange(idx, fieldName, value) {
    let fields = [...this.state.fields];
    let fieldData = { ...fields[idx], [fieldName]: value };
    fields[idx] = fieldData;
    this.setState({ fields });
  }

  render() {
    console.log("state", this.state);
    return (
      <>
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
              onClick={() => this.newOrg()}
            >
              New Field
            </BasicHoverButton>
          </Grid.Row>
          {this.state.fields.map((fieldData, idx) => {
            return (
              <Grid.Row>
                <FieldEditContainer
                  {...fieldData}
                  handleFieldChange={(fieldName, value) =>
                    this.handleFieldChange(idx, fieldName, value)
                  }
                  handleSaveClick={data => this.handleSaveClick(data)}
                />
              </Grid.Row>
            );
          })}
        </Grid>
        <style jsx>{``}</style>
      </>
    );
  }
}
export default FormBuilder;
