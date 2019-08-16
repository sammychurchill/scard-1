import React, { useState } from "react";
import { Input } from "semantic-ui-react";

const TextInput = ({ fieldData, onChange, onFocus, onBlur, value, error }) => {
  return (
    <Input
      label={fieldData.required ? { icon: "asterisk" } : null}
      labelPosition="right corner"
      placeholder={fieldData.placeholder}
      value={value}
      error={error}
      onFocus={onFocus ? e => onFocus(e) : null}
      onBlur={onBlur ? e => onBlur(e) : null}
      onChange={onChange ? e => onChange(e) : null}
    />
  );
};

export default TextInput;
