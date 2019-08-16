import React, { useState } from "react";

import { Form } from "semantic-ui-react";

import InputText from "./InputText";

const FieldText = props => {
  const error = false;
  return (
    <Form.Field error={error}>
      <InputText
        {...props}
        FieldData={{ ...props.FieldData, required: false }}
      />
    </Form.Field>
  );
};

export default FieldText;
