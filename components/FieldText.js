import React, { useState } from "react";

import { Form } from "semantic-ui-react";

import InputText from "./InputText";
import requiredValidation from "../validations/requiredValidation";

const FieldText = props => {
  const [value, setValue] = useState(props.value);
  const [error, setError] = useState(false);

  const onChange = e => {
    const eventData = e.target.value;
    setValue(eventData);
    requiredValidation(eventData) ? setError(false) : setError(true);
  };

  return (
    <Form.Field error={error}>
      <InputText
        {...props}
        onChange={e => onChange(e)}
        error={error}
        value={value}
        type="text"
      />
    </Form.Field>
  );
};

export default FieldText;
