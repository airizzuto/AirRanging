import React from 'react';
import { ErrorMessage, Field } from 'formik';

import "./FormGroup.scss";

interface FieldProps {
  label: string;
  type: "text" | "number" | "password" | "email";
  valueName: string;
  placeholder?: string;
  isDisabled?: boolean;
  autoComplete?: "on" | "off";
  value?: any;
}

const FieldGroup: React.FC<FieldProps> = ({
   label, type, valueName, value, placeholder, isDisabled, autoComplete
 }) => {
  return (
    <div className={"FormGroup"}>
      <label>{label}:</label>
      <Field 
        type={type}
        name={valueName}
        placeholder={placeholder}
        disabled={isDisabled}
        value={value}
        autocomplete={autoComplete}
      />
      <ErrorMessage component="span" name={valueName} />
    </div>
  );
};

export default FieldGroup;
