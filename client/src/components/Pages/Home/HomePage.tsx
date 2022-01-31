import React from "react";

import useToggle from "../../../hooks/useToggle";
import { AircraftWithSocials, AircraftSelected } from "../../../types/Aircraft/Aircraft";

import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tab from "../../Generics/Buttons/Tab";
import AircraftModal from "../../../components/AircraftsModal/AircraftModal";
import InfoOverlay from "../../../components/InfoOverlay/InfoOverlay";

import Style from "./Home.module.scss";
import PlanningModal from "../../PlanningModal/PlanningModal";

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
  const [displayAircraftModal, setDisplayAircraftModal] = useToggle(true);
  const [displayPlanningModal, setDisplayPlanningModal] = useToggle(false);

  return (
    <div className={Style.Home}>
      <div className={Style.Main}>

        {/* Modals Activation Tabs */}
        <div className={Style.ModalTabs}>
          <Tab
            handleTabClick={setDisplayAircraftModal}
            style={"ModalTab"}
            isActive={displayAircraftModal}
          >
            <span>AIRCRAFT</span><FontAwesomeIcon icon={faPaperPlane} />
          </Tab>
          <Tab
            handleTabClick={setDisplayPlanningModal}
            style={"ModalTab"}
            isActive={displayPlanningModal}
          >
            <span>PLANNING</span><FontAwesomeIcon icon={faMap} />
          </Tab>
          <Tab
            handleTabClick={setDisplayInfoOverlay}
            style={"ModalTab"}
            isActive={displayInfoOverlay}
          >
            <span>INFO</span><FontAwesomeIcon icon={faInfoCircle} />
          </Tab>
        </div>

        {/* Modals */}
        <AircraftModal
          show={displayAircraftModal}
          handleModalClose={setDisplayAircraftModal}
          handleAccept={setDisplayAircraftModal}
          aircraftsSaved={aircraftsSaved}
          aircraftSelected={selectedAircraft}
          handleAircraftState={handleAircraftState}
          handleAircraftSelection={handleAircraftSelection}
          handleAircraftSave={handleAircraftSave}
          handleAircraftUnsave={handleAircraftUnsave}
        />

        <PlanningModal 
          show={displayPlanningModal}
          handleModalClose={setDisplayPlanningModal}
          handleAccept={setDisplayPlanningModal}
          // pass map points state
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
