import React from "react";

import { calculateRange } from "../../../helpers/fuelCalculation";

import { AircraftSelected, AircraftWithSocials } from "../../../types/Aircraft/Aircraft";
import { Filters } from "../../../types/Aircraft/Filter";

import { Button } from "../../Generics/Buttons/Button";
import ModalHeader from "../../Generics/Modals/ModalHeader";
import DraggableModalWrapper from "../../Generics/Modals/DraggableModalWrapper";

import Style from "./Planning.module.scss";
import PlanningSelection from "./PlanningSelection";
import SliderInput from "../../Generics/InputGroups/SliderInput";

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
  show: boolean;
  handleModalClose: React.MouseEventHandler<HTMLButtonElement>;
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
  filters,
  show,
  handleModalClose,
  handleAircraftState,
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
    <DraggableModalWrapper isActive={show}>
      <div className={Style.Container}>
        <ModalHeader
          headerTitle={"Planning"}
          handleClose={handleModalClose}
        />
    
        <hr className={Style.Separator}/>

        <PlanningSelection 
          initialAircrafts={initialAircrafts}
          currentAircrafts={currentAircrafts}
          aircraftsSaved={aircraftsSaved}
          aircraftSelected={aircraftSelected}
          filters={filters}
          handleAircraftSelection={handleAircraftSelection}
          handleAircraftsFilters={handleAircraftsFilters}
          handleAircraftSave={handleAircraftSave}
          handleAircraftUnsave={handleAircraftUnsave}
        />

        <hr className={Style.Separator}/>

        <div className={Style.Inputs}>
          <SliderInput 
            label={"Fuel Loaded:"}
            fieldName={"loadedFuel"}
            currentValue={aircraftSelected ? aircraftSelected.loadedFuel : 0}
            minValue={0}
            maxValue={aircraftSelected ? aircraftSelected.fuelCapacity : 0}
            handleChange={handleFuelChange}
          />

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
    </DraggableModalWrapper>
  );
};

export default PlanningModal;
