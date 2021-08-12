import { AircraftData } from "../../../types/Aircraft/Aircraft";

import DecoratedButton from "../../Buttons/DecoratedButton";
import SearchbarDropdown from "../../Searchbar/SearchbarDropdown";
// import SelectDropdown from "../Filters/SelectDropdown";
// import SearchbarDropdown from "../../Filters/SearchbarDropdown"
// import aircrafts from "../../data/aircrafts-mock";

import Style from "./AircraftSelect.module.scss";

interface Props {
  aircrafts: AircraftData[];
  aircraftSelected: AircraftData | null;
  handleAircraftSelection: (selected: AircraftData | null) => void;
  handleAircraftsFiltering: (input: string) => Promise<void>;
}

const AircraftSelect: React.FC<Props> = ({
  aircrafts,
  aircraftSelected, 
  handleAircraftSelection,
  handleAircraftsFiltering
}) => {
  return (
    <div className={Style.AircraftSelect}>
      <div className={Style.SearchBar}>
        <SearchbarDropdown 
          defaultOptions={aircrafts.map(a => ({
            "value": a, "label": a.model
          }))}
          handleSelection={handleAircraftSelection}
          handleFilter={handleAircraftsFiltering}
        />
      </div>
      {/* TODO: toggle owned */}
      {aircraftSelected
      ? <div className={Style.AircraftDetails}>
          <h2>Selected Aircraft Details</h2>
          <div className={Style.FieldGroup}>
            <label>ICAO Id:</label>
            <p>{aircraftSelected.icaoId}</p>
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

export default AircraftSelect;
