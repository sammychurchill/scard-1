import React, { useState } from "react";
import { Form, Input, Transition, Button } from "semantic-ui-react";

export default function ConfigureEmail(props) {
  const handleSaveClick = () => {
    props.handleSaveClick(props);
    props.handleEditClick(false);
  };

  const fieldData = props.fieldData;
  return (
    <>
      <Form.Input
        width="auto"
        inline
        label="Field Name"
        readOnly={!props.isEditing}
        placeholder="Name"
        value={fieldData.name}
        onChange={e => {
          props.handleFieldChange("name", e.target.value);
        }}
      />
      <Form.Field>
        {!props.isEditing && (
          <Button
            className="edit"
            color="black"
            basic
            onClick={() => props.handleEditClick(true)}
          >
            Edit
          </Button>
        )}
      </Form.Field>
      {props.isEditing && (
        <>
          <Form.Field>
            <label>Label</label>
            <Input
              placeholder="Label"
              value={fieldData.label}
              onChange={e => {
                props.handleFieldChange("label", e.target.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Placeholder</label>
            <Input
              placeholder="Placeholder"
              value={fieldData.placeholder}
              onChange={e => {
                props.handleFieldChange("placeholder", e.target.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Helper Text</label>
            <Input
              placeholder="Helper Text"
              value={fieldData.helperText}
              onChange={e => {
                props.handleFieldChange("helperText", e.target.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Error Text</label>
            <Input
              placeholder="Error Text"
              value={fieldData.errorText}
              onChange={e => {
                props.handleFieldChange("errorText", e.target.value);
              }}
            />
          </Form.Field>
          <Form.Group inline>
            <Button onClick={() => handleSaveClick()} color="green">
              Save
            </Button>
            <Button onClick={() => props.handleEditClick(false)} basic>
              Cancel
            </Button>
          </Form.Group>
        </>
      )}
      <style jsx>{`
        .edit {
          background-color: red;
        }
      `}</style>
    </>
  );
}
