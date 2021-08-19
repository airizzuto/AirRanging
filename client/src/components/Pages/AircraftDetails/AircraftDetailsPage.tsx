
import Style from "./AircraftDetailsPage.module.scss";

const AircraftDetails = () => {
  
  // const [isEditMode, setIsEditMode] = useState(false);

  // edit button activates edit mode if user is owner. if user not owner clones aircraft and activates edit mode

  // 

  return (
    <div className={Style.AircraftDetailsContainer}>
      <h1>Aircraft *MODEL* Details</h1>

      <hr />

      <div className={Style.Details}>
        
      </div>

      {/* TODO: EDIT/CLONE button */}
      {/* TODO: DELETE button */}
      {/* TODO: SELECT button */}
    </div>
  );
};

export default AircraftDetails;
