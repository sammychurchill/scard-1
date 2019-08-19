import React, { useState } from "react";
import { Form, Message, Transition } from "semantic-ui-react";
import InputText from "./InputText";

import emailValidation from "../validations/emailValidation";

const FieldEmail = props => {
  const [value, setValue] = useState(props.value);
  const [error, setError] = useState(false);

  const onChange = e => {
    const eventData = e.target.value;
    setValue(eventData);
    emailValidation(eventData) ? setError(false) : setError(true);
  };

  console.log("email props", props);

  return (
    <Form.Field error={error}>
      <InputText
        {...props}
        onChange={e => onChange(e)}
        error={error}
        value={value}
        type="email"
      />
    </Form.Field>
  );
};

export default FieldEmail;
