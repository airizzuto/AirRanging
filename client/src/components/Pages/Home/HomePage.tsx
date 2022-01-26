import React from "react";

import useToggle from "../../../hooks/useToggle";
import { AircraftWithSocials, AircraftSelected } from "../../../types/Aircraft/Aircraft";

import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tab from "../../Generics/Buttons/Tab";
import AircraftModal from "../../../components/AircraftsModal/AircraftModal";
import InfoOverlay from "../../../components/InfoOverlay/InfoOverlay";

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
  const [displayInfoOverlay, setDisplayInfoOverlay] = useToggle(true);
  const [displayPlanningModal, setDisplayPlanningModal] = useToggle(true);

  return (
    <div className={Style.Home}>
      <div className={Style.Main}>
        {/* Properties Modals Activation Tabs */}
        <div className={Style.ModalTabs}>
          <Tab
            handleTabClick={setDisplayPlanningModal}
            style={"ModalTab"}
          >
            <span>AIRCRAFT</span><FontAwesomeIcon icon={faPaperPlane} />
          </Tab>
          <Tab
            handleTabClick={setDisplayInfoOverlay}
            style={"ModalTab"}
          >
            <span>INFO</span><FontAwesomeIcon icon={faInfoCircle} />
          </Tab>
        </div>

        {/* Map View Properties Modals */}
        <AircraftModal
          show={displayPlanningModal}
          handleModalClose={setDisplayPlanningModal}
          handleAccept={setDisplayPlanningModal}
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
