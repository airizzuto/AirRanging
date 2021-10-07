import { AircraftWithSocials } from "../../../types/Aircraft/Aircraft";
import { Filters } from "../../../types/Aircraft/Filter";

import { Button } from "../../Generics/Buttons/Button";
import DropdownSearchbar from "../../Generics/Filters/DropdownSearchbar";
// import aircrafts from "../../data/aircrafts-mock";

import Style from "./AircraftSelectModal.module.scss";

interface Props {
  initialAircrafts: AircraftWithSocials[];
  currentAircrafts: AircraftWithSocials[];
  aircraftSelected: AircraftWithSocials | null;
  filters: Filters;
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void;
  handleAircraftsFilters: (filter: Filters) => void;
  handleSelectClick: () => void;
}

const AircraftSelectModal: React.FC<Props> = ({
  initialAircrafts,
  currentAircrafts,
  aircraftSelected,
  filters,
  handleAircraftSelection,
  handleAircraftsFilters,
  handleSelectClick,
}) => {

  return (
    <div className={Style.AircraftSelect}>
      {/* TODO: toggle owned */}

      <div className={Style.SearchBar}>
        <DropdownSearchbar
          handleSelection={handleAircraftSelection}
          handleFilter={handleAircraftsFilters}
          filters={filters}
          initialOptions={initialAircrafts}
          currentOptions={currentAircrafts}
          placeholder="Search aircrafts..."
        />
      </div>

      {aircraftSelected //TODO: move to a separate component
      ? <div className={Style.AircraftDetails}>
          <h2>Selected Aircraft Details</h2>

          <div className={Style.FieldsContainer}>
            <div className={Style.FieldGroup}>
              <label>Aircraft Type:</label>
              <p>{aircraftSelected.aircraftType}</p>
            </div>

            <div className={Style.FieldGroup}>
              <label>Engine Type:</label>
              <p>{aircraftSelected.engineType}</p>
            </div>

            <div className={Style.FieldGroup}>
              <label>Manufacturer:</label>
              <p>{aircraftSelected.manufacturer}</p>
            </div>

            <div className={Style.FieldGroup}>
              <label>Model:</label>
              <p>{aircraftSelected.model}</p>
            </div>

            <div className={Style.FieldGroup}>
              <label>Variant:</label>
              <p>{aircraftSelected.variant}</p>
            </div>

            <div className={Style.FieldGroup}>
              <label>Fuel Capacity:</label>
              <p>{aircraftSelected.fuelCapacity}</p>
            </div>

            <div className={Style.FieldGroup}>
              <label>Max Range:</label>
              <p>{aircraftSelected.maxRange}</p>
            </div>

            <div className={Style.FieldGroup}>
              <label>Author:</label>
              <p>{aircraftSelected.authorUsername}</p>
            </div>
          </div>
        </div>
      : <div className={Style.AircraftDetails}>
          <p>Select an aircraft to view details and begin planning</p>
        </div>
      }
      
      <div className={Style.Select}>
        <Button handleClick={handleSelectClick} style={"primary"}>
          Select
        </Button>
      </div>
    </div>
  );
};

export default AircraftSelectModal;
