import { Coordinates } from "../../types/Map/MapTypes";
import Style from "../Generics/Modals/ModalInputs.module.scss";

interface Props {
  points: Coordinates[];
}

const PlanningModalSelection: React.FC<Props> = ({points}) => {
  const departure: [number, number] | string = points.length 
    ? [points[0].latitude, points[0].longitude] 
    : "Not selected";
  const arrival: [number, number] | string = points.length > 1 
    ? [points[points.length - 1].latitude, points[points.length - 1].longitude]
    : "Not selected";

  return (
    <div className={Style.Selection}>
      <div>
        <label>Departure: </label>
        <span>{departure[0]},{departure[1]}</span>
      </div>
      <div>
        <label>Arrival: </label>
        <span>{arrival[0]},{arrival[1]}</span>
      </div>
    </div>
  );
};

export default PlanningModalSelection;
