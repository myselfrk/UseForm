import React from "react";
import { FormGroup, Label, Input, FormText } from "reactstrap";

function InputFormGroup(props) {
  const { label, name, errors, inputData, ...rest } = props;

  return (
    <FormGroup className="mb-3">
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} value={inputData[name]} id={name} {...rest} />
      <FormText color="danger">{errors[name]}</FormText>
    </FormGroup>
  );
}

export default InputFormGroup;
