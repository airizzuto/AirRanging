
import { AircraftData } from "../../types/Aircraft/Aircraft";
import Style from "./InfoOverlay.module.scss";

/* TODO: Information overlay
  1. TODO: Aircraft selected or none

  2. TODO: Aircraft selected states (fuel, weight, speed, range)

  3. TODO: Map center coordinates

  4. TODO: Map point selected coordinates
*/

interface Props {
  aircraftSelected: AircraftData[] | null;
  // mapInformation: MapInfo;
  // pointsInformation: PointInfo[];
}

const InfoOverlay: React.FC<Props> = () => {
  return (
    <div className={Style.InfoContainer}>
      {/*
        <AircraftSection 
          aircraftSelected={aircraftSelected} 
        />
      */}
      {/*
        <MapInfo 
          mapInformation={mapInformation}
          pointsInformation={pointsInformation}
        />
      */}
      {/* 
        <GeneralInfo />
      */}
    </div>
  );
};

export default InfoOverlay;

