import React from "react";

import { calculateRange } from "../../../helpers/fuelCalculation";

import { AircraftSelected, AircraftWithSocials } from "../../../types/Aircraft/Aircraft";

import Slider from "../../Generics/Sliders/Slider";
import { Button, LinkButton } from "../../Generics/Buttons/Button";

import Style from "./PlanningModal.module.scss";
import DropdownSearchbar from "../../Generics/Filters/DropdownSearchbar";
import { Filters } from "../../../types/Aircraft/Filter";
import ToggleDataSet from "../../Generics/Filters/ToggleDataSet";
import SaveActionsButton from "../../AircraftActions/SaveActionsButton";

/* TODO: Refactor style:

  1. Aircraft selection section:
    - TODO: Show owned.
    - TODO: Show saved.
    - DONE: Searchbar.
    - TODO: Aircraft Detail Button. (routes to aircraft page)
    - TODO: Save Aircraft Button.
  
  2. Planning section:
    - TODO: Unit conversion.
    - DONE: Fuel slider.
    - TODO: Max Range input / result.
    - TBD: Cruise Speed.
    - TBD: Cruise Altitude.
    - TBD: PNR.

*/

interface Props {
  handleAircraftState: React.Dispatch<React.SetStateAction<AircraftSelected | null>>;
  initialAircrafts: AircraftWithSocials[];
  currentAircrafts: AircraftWithSocials[];
  aircraftsSaved: AircraftWithSocials[] | null;
  aircraftSelected: AircraftSelected | null;
  filters: Filters;
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void;
  handleAircraftsFilters: (filter: Filters) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
  handleAccept: () => void;
}

const PlanningModal: React.FC<Props> = ({
  initialAircrafts,
  currentAircrafts,
  aircraftSelected,
  aircraftsSaved,
  handleAircraftState,
  filters,
  handleAircraftSelection,
  handleAircraftsFilters,
  handleAircraftSave,
  handleAircraftUnsave,
  handleAccept,
  
}: Props) => {
  const handleFuelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (aircraftSelected) {
      const parsedValue = Number(value);

      const maxRangeValue = Number(calculateRange({
        maxRange: aircraftSelected.maxRange,
        fuelCapacity: aircraftSelected.fuelCapacity,
        fuelLoaded: parsedValue
      }).toFixed(2));

      handleAircraftState({
        ...aircraftSelected,
        loadedFuel: parsedValue,
        currentMaxRange: maxRangeValue
      });
    }
  };

  // TODO: abstract input fields into components
  return (
    <div className={Style.Container}>
      <div className={Style.Selection}>
        <div className={Style.Toggles}>
          <ToggleDataSet 
            label={"Show saved"}
            set={"saved"}
            handleFilter={handleAircraftsFilters}
            filters={filters}
          />
          <ToggleDataSet 
            label={"Show owned"}
            set={"owned"}
            handleFilter={handleAircraftsFilters}
            filters={filters}
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
          {/* TODO: view details button */}
          <LinkButton
            style={"primary"}
            disabled={aircraftSelected === null}
            path={`/aircrafts/${aircraftSelected?.id}`}
          >
            Details
          </LinkButton>
          {/* TODO: save button */}
          <SaveActionsButton
            aircraft={aircraftSelected}
            aircraftsSaved={aircraftsSaved}
            handleAircraftSave={handleAircraftSave}
            handleAircraftUnsave={handleAircraftUnsave}
          />
        </div>
      </div>

      <hr className={Style.Separator}/>

      <div className={Style.Inputs}>
        <div className={Style.SliderInput}>
          <label>Fuel Loaded:</label>
          <div className={Style.ValueBox}>
            {aircraftSelected ? aircraftSelected.loadedFuel : 0}
          </div>
          <div className={Style.Range}>
            <Slider name="loadedFuel"
              min={0}
              max={aircraftSelected ? aircraftSelected.fuelCapacity : 0}
              value={aircraftSelected ? aircraftSelected.loadedFuel : 0}
              handler={handleFuelChange}
            />
          </div>
          {/* TODO: fuel units selection dropdown */}
        </div>

        <div className={Style.ValueInput}>
          <label>Range:</label>
          <span className={Style.ValueBox}>
            {aircraftSelected ? aircraftSelected.currentMaxRange : 0}
          </span>
          {/* TODO: distance unit selection dropdown */}
        </div>

        <div className={Style.ValueInput}>
          <label>Cruise Speed:</label>
          <span className={Style.ValueBox}>
            {/*TODO:*/}*WIP*
          </span>
          {/* TODO: velocity unit selection dropdown */}
        </div>

        <div className={Style.ValueInput}>
          <label>Cruise Altitude:</label>
          <span className={Style.ValueBox}>
            {/*TODO:*/}*WIP*
          </span>
          {/* TODO: altitude unit selection dropdown */}
        </div>
      </div>

      <hr className={Style.Separator} />

      <div className={Style.Accept}>
        <Button handleClick={handleAccept} style="primary">
          Accept
        </Button>
      </div>
    </div>
  );
};

export default PlanningModal;
