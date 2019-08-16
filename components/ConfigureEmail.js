import React, { Component } from "react";
import { Form, Input, Label } from "semantic-ui-react";

export default class ConfigureEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  handleOnFocus(e) {
    this.setState({ editing: true });
  }

  handleOnBlur(e) {
    this.setState({ editing: false });
  }

  render() {
    console.log(this.props);
    const fieldData = this.props.fieldData;
    return (
      <>
        <Form.Field>
          <label>Name</label>
          <Input
            placeholder="Name"
            value={""}
            onFocus={() => this.handleOnFocus()}
            onBlur={() => this.handleOnBlur()}
          />
        </Form.Field>
        {!this.state.editing ? null : (
          <>
            <Form.Field>
              <label>Label</label>
              <Input placeholder="Label" value={fieldData.label} />
            </Form.Field>
            <Form.Field>
              <label>Placeholder</label>
              <Input placeholder="Placeholder" />
            </Form.Field>
            <Form.Field>
              <label>Helper Text</label>
              <Input placeholder="Helper Text" />
            </Form.Field>
            <Form.Field>
              <label>Error Text</label>
              <Input placeholder="Error Text" />
            </Form.Field>
          </>
        )}
      </>
    );
  }
}
