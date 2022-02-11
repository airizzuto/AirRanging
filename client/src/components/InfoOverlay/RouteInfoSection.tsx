import { calculateTotalDistance } from "../../helpers/mapCalculation";
import { Coordinates } from "../../types/Map/MapTypes";

import Style from "./InfoSection.module.scss";

interface Props {
  mapPoints: Coordinates[];
}

const RouteInfoSection: React.FC<Props> = ({mapPoints}) => {
  return (
    !mapPoints.length
      ? <>
          <div className={Style.Header}>
            <h1>NO POIs SELECTED</h1>
          </div>
          <div className={Style.Main}>
            <span>SELECT A POINT IN MAP TO GET INFORMATION</span>
          </div>
        </>
      : <>
          <div className={Style.Header}>
            <h1></h1> {/* TODO: parse name or coordinates */}
          </div>
          <div className={Style.Main}>
            <tbody>
              <tr>
                <td className={Style.Label}>Total Distance:</td>
                <td>{calculateTotalDistance(mapPoints).toFixed(1)}</td>
              </tr>
            </tbody>
          </div>
        </>
  );
};

export default RouteInfoSection;
