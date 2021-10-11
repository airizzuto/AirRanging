import React from 'react';

import Style from "./ValueInput.module.scss";

interface Props {
  label: string;
  value: number;
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * Value input box component
 * @param label
 * @param value
 * @param handleChange
 * @returns React component
 */
const ValueInput: React.FC<Props> = ({
  label,
  value,
  handleChange,
}) => {
  return (
    <div className={Style.ValueInput}>
      <label>{label}</label>
      <input
        value={value}
        onChange={handleChange}
      />
      {/* TODO: units dropdown */}
    </div>
  );
};

export default ValueInput;
