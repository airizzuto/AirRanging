
import { AircraftSelected } from "../../types/Aircraft/Aircraft";
import { displayComponent } from "../../utils/displayComponent";

import AircraftInfoSection from "./AircraftInfoSection";
import MapInfoSection from "./MapInfoSection";
import GeneralInfoSection from "./GeneralInfoSection";

import Style from "./InfoOverlay.module.scss";

/* TODO: Information overlay
  1. TODO: Aircraft selected or none
    A. Header:
      - Display Aircraft Selected *MANUFACTURER* - *Model*
      - Display NO AIRCRAFT SELECTED
    B. Main:
      - Aircraft state properties
      - NOT AVAILABLE

  2. TODO: Aircraft selected info (fuel, weight, speed, range)

  3. TODO: Map points info. WIP
    - Coordinates
    - Name
    - Elevation
    - Type

  4. TODO: General Info. WIP
    - Z Time
    - Center coordinates
    - Elevation at center. WIP
    - L Time
*/

interface Props {
  show: boolean;
  aircraftSelected: AircraftSelected | null;
  // mapInformation: MapInfo;
  // pointsInformation: PointInfo[];
}

const InfoOverlay: React.FC<Props> = ({show, aircraftSelected}) => {
  return (
    <div className={Style.Container} style={displayComponent(show)}>
      <div className={Style.Container}>
        <AircraftInfoSection
          aircraftSelected={aircraftSelected} 
        />
        <MapInfoSection
          // TODO
          // mapInformation={mapInformation}
          // pointsInformation={pointsInformation}
        />
        <GeneralInfoSection 
          // TODO
        />
      </div>
    </div>
  );
};

export default InfoOverlay;

