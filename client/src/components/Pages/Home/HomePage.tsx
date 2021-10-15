import React, { useState } from "react";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Filters } from "../../../types/Aircraft/Filter";
import { AircraftWithSocials, AircraftSelected } from "../../../types/Aircraft/Aircraft";

import TabButton from "../../Generics/Buttons/ModalTab";
import PlanningModal from "./PlanningModal";
import InfoOverlay from "../../InformationOverlays/InfoOverlay";

import Style from "./Home.module.scss";

interface Props {
  initialAircrafts: AircraftWithSocials[];
  currentAircrafts: AircraftWithSocials[];
  aircraftsSaved: AircraftWithSocials[] | null;
  selectedAircraft: AircraftSelected | null;
  filters: Filters;
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void ;
  handleAircraftsFilters: (filter: Filters) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
  handleAircraftState: React.Dispatch<React.SetStateAction<AircraftSelected | null>>;
}

const Home: React.FC<Props> = ({
  initialAircrafts,
  currentAircrafts,
  aircraftsSaved,
  selectedAircraft,
  filters,
  handleAircraftSelection,
  handleAircraftsFilters,
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
            <FontAwesomeIcon icon={faMap} />
          </TabButton>
          <TabButton
            handleTabClick={() => setDisplayInfoOverlay(!displayInfoOverlay)}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </TabButton>
        </div>

        {/* Map View Properties Modals */}
        <PlanningModal
          show={displayPlanningModal}
          handleModalClose={() => setDisplayPlanningModal(false)}
          handleAccept={() => setDisplayPlanningModal(false)} // TODO: same as close or other function
          initialAircrafts={initialAircrafts}
          currentAircrafts={currentAircrafts}
          aircraftsSaved={aircraftsSaved}
          aircraftSelected={selectedAircraft}
          filters={filters}
          handleAircraftState={handleAircraftState}
          handleAircraftSelection={handleAircraftSelection}
          handleAircraftsFilters={handleAircraftsFilters}
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
