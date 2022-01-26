import { useState } from "react";
import { AircraftSelected } from "../../types/Aircraft/Aircraft";
import { displayComponent } from "../../utils/displayComponent";

import Tab from "../Generics/Buttons/Tab";
import InfoSection from "./InfoSection";
import AircraftInfoSection from "./AircraftInfoSection";
import PointsInfoSection from "./PointsInfoSection";
import RouteInfoSection from "./RouteInfoSection";

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

type Tabs = "aircraft" | "points" | "route";

const InfoOverlay: React.FC<Props> = ({show, aircraftSelected}) => {
  const [tabSelected, setTabSelected] = useState<Tabs>("aircraft");

  return (
    <div className={Style.Container} style={displayComponent(show)}>
      <div className={Style.Tabs}>
        <Tab handleTabClick={() => setTabSelected("aircraft")} style="MenuTab">AIRCRAFT</Tab>
        <Tab handleTabClick={() => setTabSelected("points")} style="MenuTab">POINTS</Tab>
        <Tab handleTabClick={() => setTabSelected("route")} style="MenuTab">ROUTE</Tab>
      </div>
      <div className={Style.Sections}>
        <InfoSection
          selected={tabSelected}
          route={"aircraft"}
        >
          <AircraftInfoSection aircraftSelected={aircraftSelected} />
        </InfoSection>
        <InfoSection
          selected={tabSelected}
          route={"points"}
        >
          <PointsInfoSection />
        </InfoSection>
        <InfoSection selected={tabSelected} route={"route"}>
          <RouteInfoSection />
        </InfoSection>
      </div>
    </div>
  );
};

export default InfoOverlay;

