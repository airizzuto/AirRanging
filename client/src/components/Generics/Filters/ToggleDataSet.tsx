import React from 'react';

import { BaseModelSets } from '../../../types/BaseModel';
import { LandmarksFilterSearch } from '../../../types/Landmark/Landmark';
import { AircraftsFilterSearch } from '../../../types/Aircraft/Aircraft';

import Style from "./ToggleDataSet.module.scss";
import CheckboxStyle from "../../../styles/components/_checkbox.module.scss";

interface Props {
  id: string;
  description: string;
  set: BaseModelSets;
  unset: BaseModelSets;
  handleFilter: (filter: any) => void;
  filters: AircraftsFilterSearch | LandmarksFilterSearch;
  disabled: boolean;
}

/**
 * Toggle for data set selection.
 * @param id
 * @param label
 * @param set
 * @param unset
 * @param handleFilter
 * @param filters
 * @param disabled
 * @returns React component
 */
const ToggleDataSet: React.FC<Props> = ({id, description, set, unset, handleFilter, filters, disabled}) => {
  const isToggled = filters.set === set;

  const handleSetToggle = () => {
    isToggled
    ? handleFilter({...filters, set: unset})
    : handleFilter({...filters, set: set});
  };

  return (
    <div className={Style.Toggle}>
      <label htmlFor={id} className={CheckboxStyle.checkbox}>{description}
        <input
          id={id}
          type="checkbox"
          checked={isToggled}
          onChange={() => handleSetToggle()}
          disabled={disabled}
        />
        <span className={CheckboxStyle.checkmark}></span>
      </label>
    </div>
  );
};

export default ToggleDataSet;
