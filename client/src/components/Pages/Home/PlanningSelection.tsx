import React, { useEffect, useState } from 'react';

import { AircraftSelected, AircraftWithSocials } from '../../../types/Aircraft/Aircraft';
import { FilterSearch } from '../../../types/Aircraft/Filter';
import { AircraftSearchOptions } from '../../../types/Aircraft/AircraftEnums';
import { getUserData } from '../../../helpers/userHelper';

import SaveActionsButton from '../../AircraftActions/SaveActionsButton';
import DropdownSearchbar from '../../Generics/Filters/DropdownSearchbar';
import { LinkButton } from '../../Generics/Buttons/Button';
import ToggleDataSet from '../../Generics/Filters/ToggleDataSet';

import Style from "./PlanningSelection.module.scss";
import useDebounce from '../../../hooks/useDebounce';
import aircraftService from '../../../services/aircraftService';

interface Props {
  aircraftsSaved: AircraftWithSocials[] | null;
  aircraftSelected: AircraftSelected | null;
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
}

const PlanningSelection: React.FC<Props> = ({
  aircraftsSaved,
  aircraftSelected,
  handleAircraftSelection,
  handleAircraftSave,
  handleAircraftUnsave,
}) => {
  const [aircrafts, setAircrafts] = useState<AircraftWithSocials[]>([]);
  const [filters, setFilters] = useState<FilterSearch>({
    set: "all",
    searchField: AircraftSearchOptions.Model,
    search: ""
  });
  const debouncedFilter = useDebounce(filters, 500);

  // FIXME: looping effect
  useEffect(() => {
    console.debug("EFFECT - filter: ", debouncedFilter);
    
    aircraftService.searchAircrafts(debouncedFilter)
      .then((response) => setAircrafts([...response.data]))
      .catch(error => console.error("Filtering aicrafts - ", error));

    return () => {
      setAircrafts([]);
    };
  },[debouncedFilter]);

  const handleAircraftsFilters = (filters: FilterSearch) => {
    setFilters({...filters});
  };

  return (
    <div className={Style.Selection}>
      <div className={Style.Toggles}>
        <ToggleDataSet
          id={"checkboxShowSaved"}
          description={"Show saved"}
          set={"saved"}
          unset={"all"}
          handleFilter={handleAircraftsFilters}
          filters={debouncedFilter}
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

      <div className={Style.Searchbar}>
        <label>Selected Aircraft:</label>
        <DropdownSearchbar
          handleSelection={handleAircraftSelection}
          handleFilter={handleAircraftsFilters}
          filters={filters}
          options={aircrafts}
          placeholder="Search aircrafts..."
        />
      </div>

      <div className={Style.AircraftButtons}>
        <LinkButton
          style={"primary"}
          disabled={!aircraftSelected}
          path={`/aircrafts/details/${aircraftSelected?.id}`}
        >
          VIEW AIRCRAFT
        </LinkButton>

        <SaveActionsButton
          aircraft={aircraftSelected}
          aircraftsSaved={aircraftsSaved}
          handleAircraftSave={handleAircraftSave}
          handleAircraftUnsave={handleAircraftUnsave}
          disabled={getUserData() === null || !aircraftSelected}
        />
      </div>
    </div>
  );
};

export default PlanningSelection;
