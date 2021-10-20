import React from 'react';

import Style from "./AircraftCard.module.scss";

interface Props {
  property: string;
  value: string | number | undefined;
}

const PropertyField: React.FC<Props> = ({property, value}) => {
  return (
    <div className={Style.Field}>
      <label>
        {property}: <span> {value}</span>
      </label>
    </div>
  );
};

export default PropertyField;
