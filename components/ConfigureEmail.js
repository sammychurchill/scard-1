import React, { useState } from "react";
import { Form, Input, Transition, Button } from "semantic-ui-react";

export default function ConfigureEmail(props) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveClick = () => {
    props.handleSaveClick(props);
    setIsEditing(false);
  };

  return (
    <>
      <Form.Group unstackable>
        <Form.Field>
          <label>Field Name</label>
          <Form.Input
            id="name"
            readOnly={!isEditing}
            placeholder="Name"
            value={props.name}
            onChange={e => props.handleChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <label>&nbsp;</label>
          <Transition.Group>
            {isEditing ? (
              <>
                <Button onClick={() => handleSaveClick()} color="green">
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)} basic>
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} basic>
                Edit
              </Button>
            )}
          </Transition.Group>
        </Form.Field>
      </Form.Group>
      {!isEditing ? null : (
        <>
          <Form.Field>
            <label>Label</label>
            <Input placeholder="Label" value={props.label} />
          </Form.Field>
          <Form.Field>
            <label>Placeholder</label>
            <Input
              placeholder="Placeholder"
              value={props.placeholder}
              onChange={e => {
                props.handleFieldChange("placeholder", e.target.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Helper Text</label>
            <Input
              placeholder="Helper Text"
              value={props.helperText}
              onChange={e => {
                props.handleFieldChange("helperText", e.target.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Error Text</label>
            <Input
              placeholder="Error Text"
              value={props.errorText}
              onChange={e => {
                props.handleFieldChange("errorText", e.target.value);
              }}
            />
          </Form.Field>
        </>
      )}
    </>
  );
}
