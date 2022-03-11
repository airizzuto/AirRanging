import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { isUserAuthenticated } from "../../../../helpers/tokenHelper";
import { isUserOwner } from "../../../../helpers/userHelper";
import propsToLabel from "../../../../utils/propsToLabel";

import { AircraftWithSocials, CloneAircraft } from "../../../../types/Aircraft/Aircraft";

import AlertBox from "../../../Generics/Alerts/AlertBox";
import AircraftForm from "./AircraftForm";

import "./AircraftDetails.scss";
import Spinner from "../../../../styles/components/_spinner.module.scss";
import aircraftService from "../../../../services/aircraftService";

interface Props {
  aircraftsSaved: AircraftWithSocials[] | null;
  handleAircraftEdit: (aircraftId: string, editedAircraft: AircraftWithSocials) => Promise<void>;
  handleAircraftSelect: (selected: AircraftWithSocials | null) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
  handleAircraftDelete: (aircraftId: string) => Promise<void>;
  handleAircraftCloning: (aircraftToClone: CloneAircraft) => Promise<void>;
}

const AircraftDetails: React.FC<Props> = ({
  aircraftsSaved,
  handleAircraftEdit,
  handleAircraftSelect,
  handleAircraftSave,
  handleAircraftUnsave,
  handleAircraftDelete,
  handleAircraftCloning
}) => {
  const { aircraftId }= useParams<{aircraftId: string}>();
  const history = useHistory();

  const [alert, setAlert] = useState("");
  const [aircraft, setAircraft] = useState<AircraftWithSocials>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAircraftOwned, setIsAircraftOwned] = useState(false);

  useEffect(() => {
    aircraftService.getAircraftById(aircraftId).then(response => {
      setAircraft(response.data);
    }).catch(error => console.error(`Getting aircraft ID: ${aircraftId} - `,error));
  }, [aircraftId]);
  
  useEffect(() => {
    if (aircraft) {
      setIsAircraftOwned(isUserOwner(aircraft));
    }
  }, [aircraft]);

  const handleSubmit = async (editedAircraft: AircraftWithSocials) => {
    try {
      setAlert("");
      await isUserAuthenticated()
        .then(async () => await handleAircraftEdit(editedAircraft.id , editedAircraft));
  
      setIsEditMode(false);
    } catch(error: any) {
      console.error(error);
      setAlert(error);
      setTimeout(() => setAlert(""), 10000);
    }
  };

  const handleSelect = (aircraftSelected: AircraftWithSocials) => {
    handleAircraftSelect(aircraftSelected);
    history.push("/");
  };

  const handleEditModeSwitch = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = async (aircraftId: string) => {
    setAlert("");

    if (await isUserAuthenticated()) {
      await handleAircraftSave(aircraftId)
        .catch(error => {
          console.error(error);
          setAlert(error);
          setTimeout(() => setAlert(""), 10000);
        });
    }
  };

  const handleCloning = async (aircraftToClone: AircraftWithSocials) => {
    setAlert("");

    if (await isUserAuthenticated()) {
      await handleAircraftCloning(aircraftToClone)
        .catch(error => {
          console.error(error);
          setAlert(error);
          setTimeout(() => setAlert(""), 10000);
        });
    }
  };

  const handleDelete = async (aircraftId: string, aircraftModel: string, aircraftVariant?: string) => {
    if (window.confirm(
      `Are you sure you want to delete ${aircraftModel} - ${aircraftVariant} aircraft?`)
      ) {
        await handleAircraftDelete(aircraftId);
        history.push("/");
      }
  };

  return (
    <div className={"Container"}>
      <h1>
        Aircraft Page - {isEditMode ? "Edit" : "View"} Mode
      </h1>
      {aircraft
      ? <div>
          <h2>
            {propsToLabel({
              props: [aircraft?.authorUsername, aircraft?.manufacturer, aircraft?.model, aircraft?.variant],
              separator: " / "
            })}
          </h2>

          <div className={"Image"}>
            <image href={aircraft.imageUrl}/>
          </div>

          <hr />

          <div className={"AlertNotification"}>
            <AlertBox alertText={alert}/>
          </div>

          <AircraftForm 
            aircraft={aircraft} 
            isEditMode={isEditMode}
            isAircraftOwned={isAircraftOwned}
            aircraftsSaved={aircraftsSaved}
            handlers={{
              handleSelect,
              handleSubmit,
              handleEdit: handleAircraftEdit,
              handleEditModeSwitch,
              handleDelete,
              handleSave,
              handleAircraftUnsave,
              handleCloning,
            }}
          />
        </div>
      : <div className={Spinner.spinner}></div>
      }
    </div>
  );
};

export default AircraftDetails;
