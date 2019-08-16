import React, { useState } from "react";
import { Form, Message } from "semantic-ui-react";
import InputText from "./InputText";

import emailValidation from "../validations/emailValidation";

const FieldEmail = props => {
  const [value, setValue] = useState(props.fieldData.value);
  const [error, setError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const onChange = e => {
    const eventData = e.target.value;
    setValue(eventData);
    emailValidation(eventData) ? setError(false) : setError(true);
  };

  const onFocus = e => {
    setIsFocused(true);
  };

  const onBlur = e => {
    setIsFocused(false);
  };

  return (
    <Form.Field error={error}>
      <label>{props.fieldData.label}</label>
      <InputText
        {...props}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        error={error}
        value={value}
        type="email"
      />
      <Message hidden={!error} negative={error} size="mini">
        {props.fieldData.error}
      </Message>
      <Message hidden={!isFocused} size="mini">
        {props.fieldData.helperText}
      </Message>
    </Form.Field>
  );
};

export default FieldEmail;
