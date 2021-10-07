import React from 'react';
import { AircraftsDataSets, Filters } from '../../../types/Aircraft/Filter';

import Style from "./ToggleDataSet.module.scss";

interface Props {
  label: string;
  set: AircraftsDataSets;
  handleFilter: (filter: Filters) => void;
  filters: Filters;
}

const ToggleDataSet: React.FC<Props> = ({label, set, handleFilter, filters}) => {

  const handleSetToggle = (set: AircraftsDataSets) => {
    handleFilter({...filters, set: set});
  };

  return (
    <div className={Style.CheckboxItem}> {/* TODO: filter saved */}
      <label>{label}</label>
      <input
        type="checkbox"
        checked={filters.set === set}
        onChange={() => handleSetToggle}
      />
    </div>
  );
};

export default ToggleDataSet;
