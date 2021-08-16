import { mapAircraftToFilter } from "../../../helpers/aircraftHelper";
import { AircraftData } from "../../../types/Aircraft/Aircraft";

import DecoratedButton from "../../Buttons/DecoratedButton";
import SearchbarDropdown from "../../Searchbar/SearchbarDropdown";
// import aircrafts from "../../data/aircrafts-mock";

import Style from "./AircraftSelectModal.module.scss";  // TODO: style

interface Props {
  aircrafts: AircraftData[];
  aircraftSelected: AircraftData | null;
  handleAircraftSelection: (selected: AircraftData | null) => void;
  handleAircraftsFiltering: (input: string) => Promise<any>;
}

const AircraftSelectModal: React.FC<Props> = ({
  aircrafts,
  aircraftSelected, 
  handleAircraftSelection,
  handleAircraftsFiltering
}) => {

  return (
    <div className={Style.AircraftSelect}>
      <div className={Style.SearchBar}>
        <SearchbarDropdown 
          defaultOptions={mapAircraftToFilter(aircrafts, "model")}
          handleSelection={handleAircraftSelection}
          handleFilter={handleAircraftsFiltering}
        />
      </div>
      {/* TODO: toggle owned */}
      {aircraftSelected
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
              <label>ICAO Id:</label>
              <p>{aircraftSelected.icaoId}</p>
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

            {/* TODO: fields */}
          </div>
        </div>
      : <div className={Style.AircraftNotSelected}>
          <p>Select an aircraft to view details and begin planning</p>
        </div>
      }
      
      <div className={Style.Buttons}>
        <DecoratedButton onClick={() => null}>Select</DecoratedButton>
      </div>
    </div>
  );
};

export default AircraftSelectModal;
