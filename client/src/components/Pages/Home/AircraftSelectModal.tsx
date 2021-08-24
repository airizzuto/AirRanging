import { mapAircraftToFilter } from "../../../helpers/aircraftHelper";
import aircraftService from "../../../services/aircraftService";
import { AircraftData } from "../../../types/Aircraft/Aircraft";

import DecoratedButton from "../../Buttons/DecoratedButton";
import SearchbarDropdown from "../../Searchbar/SearchbarDropdown";
// import aircrafts from "../../data/aircrafts-mock";

import Style from "./AircraftSelectModal.module.scss";

interface Props {
  aircraftSelected: AircraftData | null;
  handleAircraftSelection: (selected: AircraftData | null) => void;
  handleSelectClick: () => void;
}

const AircraftSelectModal: React.FC<Props> = ({
  aircraftSelected, 
  handleAircraftSelection,
  handleSelectClick,
}) => {

  const handleAircraftsSelectionFilter = async (input: string) => {
    const aircraftsFiltered = await aircraftService
      .searchAircraftByModel(input)
      .then(aircrafts => mapAircraftToFilter(aircrafts, "model"));
    
      return aircraftsFiltered;
  };

  return (
    <div className={Style.AircraftSelect}>
      {/* TODO: toggle owned */}

      <div className={Style.SearchBar}>
        <SearchbarDropdown
          handleSelection={handleAircraftSelection}
          handleFilter={handleAircraftsSelectionFilter}
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
        <DecoratedButton onClick={handleSelectClick} style="primary">Select</DecoratedButton>
      </div>
    </div>
  );
};

export default AircraftSelectModal;
