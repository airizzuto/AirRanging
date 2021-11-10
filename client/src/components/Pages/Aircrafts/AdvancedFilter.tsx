import React from 'react';
import { getUserData } from '../../../helpers/userHelper';

import { Filters } from '../../../types/Aircraft/Filter';
import { UserPublic } from '../../../types/User/User';

import ToggleDataSet from '../../Generics/Filters/ToggleDataSet';

import Style from "./AdvancedFilter.module.scss";

interface Props {
  user: UserPublic | null;
  filters: Filters;
  handleAircraftsFilters: (filter: Filters) => void;
}

{/* TODO: Filter handling */}
{/* TODO: multi term query */}
const AdvancedFilter: React.FC<Props> = ({
  filters,
  handleAircraftsFilters,
}) => {
  return (
    <div className={Style.Container}>
      <div className={Style.FilterBySet}>
          <ToggleDataSet
            id={"checkboxShowSaved"}
            description={"Show saved"}
            set={"saved"}
            unset={"all"}
            handleFilter={handleAircraftsFilters}
            filters={filters}
            disabled={getUserData() === null}
          />

          <ToggleDataSet
            id={"checkboxShowOwned"}
            description={"Show owned"}
            set={"owned"}
            unset={"all"}
            handleFilter={handleAircraftsFilters}
            filters={filters}
            disabled={getUserData() === null}
          />
        </div>

        <div className={Style.FilterPropery}>
          {/* Aircraft type filter */}
        </div>

        <div className={Style.FilterPropery}>
          {/* Fuel type filter */}
        </div>

        <div className={Style.FilterPropery}>
          {/* Weight category filter */}
        </div>

        <div className={Style.FilterPropery}>
          {/* Min fuel capacity */}
        </div>

        <div className={Style.FilterPropery}>
          {/* Min range */}
        </div>
    </div>
  );
};

export default AdvancedFilter;
