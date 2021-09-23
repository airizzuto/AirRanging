import React from 'react';
import { ErrorMessage, Field } from 'formik';

import "./formGroup.scss";

interface FieldProps {
  label: string;
  type: "text" | "number";
  valueName: string;
  placeholder?: string;
  isDisabled?: boolean;
  value?: any;
}

const FieldGroup: React.FC<FieldProps> = ({
   label, type, valueName, value, placeholder, isDisabled
 }) => {
  return (
    <div className={"formGroup"}>
      <label>{label}:</label>
      <Field 
        type={type}
        name={valueName}
        placeholder={placeholder}
        disabled={isDisabled}
        value={value}
      />
      <ErrorMessage component="span" name={valueName} />
    </div>
  );
};

export default FieldGroup;
