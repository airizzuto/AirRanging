import React from 'react';

import { AircraftSelected, AircraftWithSocials } from '../../../types/Aircraft/Aircraft';
import { Filters } from '../../../types/Aircraft/Filter';

import SaveActionsButton from '../../AircraftActions/SaveActionsButton';
import DropdownSearchbar from '../../Generics/Filters/DropdownSearchbar';
import { LinkButton } from '../../Generics/Buttons/Button';
import ToggleDataSet from '../../Generics/Filters/ToggleDataSet';

import Style from "./PlanningSelection.module.scss";
import { getUserData } from '../../../helpers/userHelper';

interface Props {
  initialAircrafts: AircraftWithSocials[];
  currentAircrafts: AircraftWithSocials[];
  aircraftsSaved: AircraftWithSocials[] | null;
  aircraftSelected: AircraftSelected | null;
  filters: Filters;
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void;
  handleAircraftsFilters: (filter: Filters) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
}


const PlanningSelection: React.FC<Props> = ({
  initialAircrafts,
  currentAircrafts,
  aircraftsSaved,
  aircraftSelected,
  filters,
  handleAircraftSelection,
  handleAircraftsFilters,
  handleAircraftSave,
  handleAircraftUnsave,
}) => {
  return (
    <div className={Style.Selection}>
      <div className={Style.Toggles}>
        <ToggleDataSet 
          label={"Show saved"}
          set={"saved"}
          unset={"all"}
          handleFilter={handleAircraftsFilters}
          filters={filters}
          disabled={getUserData() === null}
        />

        <ToggleDataSet 
          label={"Show owned"}
          set={"owned"}
          unset={"all"}
          handleFilter={handleAircraftsFilters}
          filters={filters}
          disabled={getUserData() === null}
        />
      </div>

      <div className={Style.Searchbar}>
        <DropdownSearchbar
          handleSelection={handleAircraftSelection}
          handleFilter={handleAircraftsFilters}
          filters={filters}
          initialOptions={initialAircrafts}
          currentOptions={currentAircrafts}
          placeholder="Search aircrafts..."
        />
      </div>

      <div className={Style.AircraftButtons}>
        <LinkButton
          style={"primary"}
          disabled={aircraftSelected === null}
          path={`/aircrafts/${aircraftSelected?.id}`}
        >
          VIEW AIRCRAFT
        </LinkButton>

        <SaveActionsButton
          aircraft={aircraftSelected}
          aircraftsSaved={aircraftsSaved}
          handleAircraftSave={handleAircraftSave}
          handleAircraftUnsave={handleAircraftUnsave}
        />
      </div>
    </div>
  );
};

export default PlanningSelection;
