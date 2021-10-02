import React from 'react';

interface Props {
  enumerator: any;
}

const EnumToOptions: React.FC<Props> = ({enumerator}) => {
  return (
    <>
      {Object.keys(enumerator).map((key) => {
        return (
          <option key={key} value={key}>
            {key}
          </option>
        );
      })}
      
    </>
  );
};

export default EnumToOptions;
