import React, { useState } from "react";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AircraftWithSocials, AircraftSelected } from "../../../types/Aircraft/Aircraft";

import TabButton from "../../Generics/Buttons/ModalTab";
import AircraftModal from "./AircraftsModal/AircraftModal";
import InfoOverlay from "../../InformationOverlays/InfoOverlay";

import Style from "./Home.module.scss";

interface Props {
  aircraftsSaved: AircraftWithSocials[] | null;
  selectedAircraft: AircraftSelected | null;
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void ;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
  handleAircraftState: React.Dispatch<React.SetStateAction<AircraftSelected | null>>;
}

const Home: React.FC<Props> = ({
  aircraftsSaved,
  selectedAircraft,
  handleAircraftSelection,
  handleAircraftSave,
  handleAircraftUnsave,
  handleAircraftState
}) => {
  const [displayInfoOverlay, setDisplayInfoOverlay] = useState(true);
  const [displayPlanningModal, setDisplayPlanningModal] = useState(true);

  return (
    <div className={Style.Home}>
      <div className={Style.Main}>
        {/* Properties Modals Activation Tabs */}
        <div className={Style.ModalTabs}>
          <TabButton
            handleTabClick={() => setDisplayPlanningModal(!displayPlanningModal)}
          >
            <span>AIRCRAFT</span><FontAwesomeIcon icon={faPaperPlane} />
          </TabButton>
          <TabButton
            handleTabClick={() => setDisplayInfoOverlay(!displayInfoOverlay)}
          >
            <span>INFO</span><FontAwesomeIcon icon={faInfoCircle} />
          </TabButton>
        </div>

        {/* Map View Properties Modals */}
        <AircraftModal
          show={displayPlanningModal}
          handleModalClose={() => setDisplayPlanningModal(false)}
          handleAccept={() => setDisplayPlanningModal(false)} // TODO: same as close or other function
          aircraftsSaved={aircraftsSaved}
          aircraftSelected={selectedAircraft}
          handleAircraftState={handleAircraftState}
          handleAircraftSelection={handleAircraftSelection}
          handleAircraftSave={handleAircraftSave}
          handleAircraftUnsave={handleAircraftUnsave}
        />
      </div>
      
      <div className={Style.Info}>
        <InfoOverlay 
          show={displayInfoOverlay}
          aircraftSelected={selectedAircraft}
        />
      </div>

    </div>
  );
};

export default Home;
