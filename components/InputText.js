import React, { useState } from "react";
import { Input, Message, Transition } from "semantic-ui-react";

const TextInput = props => {
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = () => {
    setIsFocused(true);
  };
  const handleOnBlur = () => {
    setIsFocused(false);
  };

  const [isChanged, setIsChanged] = useState(false);
  const handleOnChange = e => {
    props.onChange(e);
    e.target.value ? setIsChanged(true) : setIsChanged(false);
  };

  const fieldData = props.fieldData;
  return (
    <>
      {isChanged || props.isEditing ? (
        <label>{fieldData.label}</label>
      ) : (
        <label>&nbsp;</label>
      )}
      <Input
        label={fieldData.required ? { icon: "asterisk" } : null}
        labelPosition="right corner"
        placeholder={fieldData.placeholder}
        value={props.value}
        error={props.error}
        onFocus={e => handleOnFocus()}
        onBlur={e => handleOnBlur()}
        onChange={e => handleOnChange(e)}
      />

      <Transition visible={props.error || props.isEditing} unmountOnHide>
        <Message visible negative size="mini">
          {fieldData.errorText}
        </Message>
      </Transition>
      <Transition visible={isFocused || props.isEditing} unmountOnHide>
        <Message visible size="mini">
          {fieldData.helperText}
        </Message>
      </Transition>
    </>
  );
};

export default TextInput;
