
import React from "react";
import { useParams } from "react-router-dom";
import aircraftService from "../../../services/aircraftService";

import { AircraftData } from "../../../types/Aircraft/Aircraft";

import Style from "./AircraftDetailsPage.module.scss";


const AircraftDetails: React.FC = () => {
  const { id }: any = useParams();
  const [aircraft, setAircraft] = React.useState<AircraftData>();
  // const [isEditMode, setIsEditMode] = useState(false);

  // edit button activates edit mode if user is owner. if user not owner clones aircraft and activates edit mode

  React.useEffect(() => {
    aircraftService.getAircraftById(id)
      .then(response => setAircraft(response));
  }, []);

  return (
    <div className={Style.AircraftDetailsContainer}>
      <h1>Aircraft Details: {aircraft?.model} - {aircraft?.variant}</h1>

      <hr />

      <div className={Style.Details}>
        {/* TODO:
          Mix of formik create, and constant fields. formik fields disabled={isEditMode}
        */}
      </div>

      {/* TODO: EDIT/CLONE button */}
      {/* TODO: DELETE button */}
      {/* TODO: SELECT button */}
    </div>
  );
};

export default AircraftDetails;
