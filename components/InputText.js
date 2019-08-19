import React, { useState } from "react";
import { Input, Message, Transition } from "semantic-ui-react";

const TextInput = props => {
  const [isFocused, setIsFocused] = useState(false);
  const handleOnFocus = () => {
    // onFocus(e)
    setIsFocused(true);
  };
  const handleOnBlur = () => {
    // onBlur ? onBlur(e) : null
    setIsFocused(false);
  };

  const [isChanged, setIsChanged] = useState(false);
  const handleOnChange = e => {
    props.onChange ? props.onChange(e) : null;
    e.target.value ? setIsChanged(true) : setIsChanged(false);
  };
  console.log("input", props);
  return (
    <>
      {isChanged || props.isEditing ? (
        <label>{props.label}</label>
      ) : (
        <label>&nbsp;</label>
      )}
      <Input
        label={props.required ? { icon: "asterisk" } : null}
        labelPosition="right corner"
        placeholder={props.placeholder}
        value={props.value}
        error={props.error}
        onFocus={e => handleOnFocus()}
        onBlur={e => handleOnBlur()}
        onChange={e => handleOnChange(e)}
      />

      <Message visible={props.error} negative size="mini">
        {props.errorText}
      </Message>
      <Message visible={props.isEditing} size="mini">
        {props.helperText}
      </Message>
    </>
  );
};

export default TextInput;
