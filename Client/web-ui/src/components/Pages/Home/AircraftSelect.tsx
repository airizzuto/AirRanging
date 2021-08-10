import { AircraftState } from "../../../types/Aircraft/Aircraft";

import DecoratedButton from "../../Buttons/DecoratedButton";
// import SelectDropdown from "../Filters/SelectDropdown";
// import SearchbarDropdown from "../../Filters/SearchbarDropdown"
// import aircrafts from "../../data/aircrafts-mock";

import Style from "./AircraftSelect.module.scss";

interface Props {
  aircraftSelected: AircraftState | null;
}

const AircraftSelect: React.FC<Props> = ({aircraftSelected}) => {
  return (
    <div className={Style.AircraftSelect}>
      <div className={Style.SearchBar}>
        {/* TODO: <SearchbarDropdown /> */}
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
