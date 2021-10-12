
import { AircraftSelected } from "../../types/Aircraft/Aircraft";
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
  aircraftSelected: AircraftSelected | null;
  // mapInformation: MapInfo;
  // pointsInformation: PointInfo[];
}

const InfoOverlay: React.FC<Props> = ({aircraftSelected}) => {
  return (
    <div className={Style.InfoContainer}>
      <AircraftInfoSection 
        aircraftSelected={aircraftSelected} 
      />
      <MapInfoSection
        // mapInformation={mapInformation}
        // pointsInformation={pointsInformation}
      />
      <GeneralInfoSection />
    </div>
  );
};

export default InfoOverlay;

