import React from 'react';

import Style from "./EnumToOptions.module.scss";

interface Props {
  enumerator: any;
  handleChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const EnumToOptions: React.FC<Props> = ({enumerator, handleChange}) => {
  return (
    <select onChange={handleChange} className={Style.Container}>
      {Object.keys(enumerator).map((key) => {
        return (
          <option key={key} value={key}>
            {key}
          </option>
        );
      })}
      
    </select>
  );
};

export default EnumToOptions;
