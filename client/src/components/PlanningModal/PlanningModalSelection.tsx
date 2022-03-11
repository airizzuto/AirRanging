import { Coordinates } from "../../types/Map/MapTypes";

import Style from "../Generics/Modals/ModalInputs.module.scss";

interface Props {
  points: Coordinates[];
}

const PlanningModalSelection: React.FC<Props> = ({points}) => {
  const departure: [number, number] | string = points.length
    ? `${points[0].latitude.toFixed(8)}, ${points[0].longitude.toFixed(8)}`
    : "Not selected";
  const arrival: [number, number] | string = points.length > 1
    ? `${points[points.length - 1].latitude.toFixed(8)}, ${points[points.length - 1].longitude.toFixed(8)}`
    : "Not selected";

  return (
    <div className={Style.Selection}>
      <div>
        <label>Departure: </label>
        <span>{departure}</span>
      </div>
      <div>
        <label>Arrival: </label>
        <span>{arrival}</span>
      </div>
    </div>
  );
};

export default PlanningModalSelection;
