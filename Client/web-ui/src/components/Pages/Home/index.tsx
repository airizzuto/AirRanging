import React, { useState } from "react";
import { useModalClose } from "../../../hooks/useModalClose";
import { faMap, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

import ModalTab from "../../Buttons/ModalTab";
import DraggableModal from "../../Modals/DraggableModal";
import PlanningModal from "./Planning";

import { AircraftData, AircraftState } from "../../../types/Aircraft/Aircraft";

import Style from "./Home.module.scss";
import AircraftSelect from "./AircraftSelect";
import aircraftService from "../../../services/aircraftService";
// import InfoFooter from "./InfoFooter";

interface Props {
  initialAircrafts: AircraftData[];
}

const Home: React.FC<Props> = ({initialAircrafts}) => {
  const [isModalActive, setIsModalActive] = useState(true); // One active modal at once
  const [displayPlanningModal, setDisplayPlanningModal] = useState(false);
  const [displayAircraftsModal, setDisplaySelectionModal] = useState(true);

  const [aircraft, setAircraft] = useState<AircraftState | null>(null);
  const [aircrafts, setAircrafts] = useState<AircraftData[]>(initialAircrafts);

  const handleAircraftsFiltering = async (input: string) => {
    await aircraftService.searchAircraftByModel(input)
      .then(aircrafts => setAircrafts(aircrafts));
  };

  // FIXME:
  const handleAircraftSelection = (selected: AircraftData | null) => {
    selected 
    ? setAircraft({...selected, loadedFuel: selected.fuelCapacity})
    : setAircraft(null);
  };

  // TODO: move to a custom hook?
  const handleModalDisplay = (
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>,
    display: boolean
  ) => {
    if (isModalActive) {
      setDisplayPlanningModal(false);
      setDisplaySelectionModal(false);
    }

    setDisplayModal(display ? false : true);
    setIsModalActive(true);
  };

  return (
    <div className={Style.Home}>

      {/* Properties Modals Activation Tabs */}
      <div className={Style.ModalTabs}>
        <ModalTab
          icon={faMap}
          handleTabClick={() => handleModalDisplay(
            setDisplayPlanningModal, displayPlanningModal
          )}
        />

        <ModalTab
          icon={faPaperPlane}
          handleTabClick={() => handleModalDisplay(
            setDisplaySelectionModal, displayAircraftsModal
          )}
        />
      </div>

      {/* Map View Properties Modals */}
      <DraggableModal 
        show={displayPlanningModal}
        
        label="Planning"
        handleClose={() => useModalClose(setDisplayPlanningModal)}
      >
        <PlanningModal 
          handleAccept={() => useModalClose(setDisplayPlanningModal)}
          aircraft={aircraft}
          aircraftState={setAircraft}
        />
      </DraggableModal>

      <DraggableModal 
        show={displayAircraftsModal}
        label="Selection"
        handleClose={() => useModalClose(setDisplaySelectionModal)}
      >
        <AircraftSelect 
          aircraftSelected={aircraft} 
          aircrafts={aircrafts}
          handleAircraftSelection={handleAircraftSelection}
          handleAircraftsFiltering={handleAircraftsFiltering}/>
      </DraggableModal>

      {/* TODO:
      <div className={Style.Info}>
        <InfoOverlay />
      </div> 
      */}

    </div>
  );
};

export default Home;
