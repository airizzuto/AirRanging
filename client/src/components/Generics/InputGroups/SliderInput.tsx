import React from "react";
import Slider from "../Sliders/Slider";

import Style from "./SliderInput.module.scss";

interface Props {
  label: string;
  fieldName: string;
  currentValue: number;
  minValue: number;
  maxValue: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// TODO: SRP for slider input component
const SliderInput: React.FC<Props> = ({
  label,
  fieldName,
  currentValue,
  minValue,
  maxValue,
  handleChange,
}) => {

  const value = currentValue;
  return (
    <div className={Style.SliderInput}>
      <label>{label}</label>
      <div className={Style.ValueBox}>
        {value}
      </div>
      <div className={Style.Range}>
        <Slider
          name={fieldName}
          min={minValue}
          max={maxValue}
          value={value}
          handler={handleChange}
        />
      </div>
      {/* TODO: units selection dropdown */}
    </div>
  );
};

export default SliderInput;
