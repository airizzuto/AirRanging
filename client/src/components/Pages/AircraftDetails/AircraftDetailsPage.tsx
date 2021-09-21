
import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useHistory, useParams } from "react-router-dom";

import aircraftService from "../../../services/aircraftService";
import { getUserData, isUserOwner } from "../../../helpers/userHelper";
import { isUserAuthenticated } from "../../../helpers/tokenHelper";

import { AircraftData } from "../../../types/Aircraft/Aircraft";
import { EAircraftType, EEngineType, EWeightCategory, EIcaoWakeCategory, EFuelType } from "../../../types/Aircraft/AircraftEnums";
import { aircraftSchema } from "../../../validators/aircraftValidators";
import AlertBox from "../../Generics/Alerts/AlertBox";
import EnumOptions from "../AircraftCreate/EnumOptions";

import "./AircraftDetails.scss";
import Spinner from "../../../styles/components/_spinner.module.scss";
import SaveActionsButton from "../../AircraftActions/SaveActionsButton";
import { Button } from "../../Generics/Buttons/Button";
import propsToLabel from "../../../utils/propsToLabel";

interface Props {
  aircraftsSaved: AircraftData[] | null;
  handleAircraftEdit: (aircraftId: string, editedAircraft: AircraftData) => Promise<void>;
  handleAircraftSelect: (selected: AircraftData | null) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
  handleAircraftDelete: (aircraftId: string) => Promise<void>;
  handleAircraftCloning: (aircraftId: string) => Promise<void>;
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
  const [aircraft, setAircraft] = useState<AircraftData>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAircraftOwned, setIsAircraftOwned] = useState(false);

  useEffect(() => {
    aircraftService.getAircraftById(aircraftId)
      .then(response => setAircraft(response.data))
      .catch(error => console.error(`Fetching aircraft ${aircraftId}:`, error));
  }, [aircraftId]);
  
  useEffect(() => {
    if (aircraft) {
      setIsAircraftOwned(isUserOwner(aircraft));
    }
  }, [aircraft]);

  const handleSubmit = async (editedAircraft : AircraftData) => {
    setAlert("");

    await handleAircraftEdit(editedAircraft.id , editedAircraft)
      .catch(error => {
        console.error(error);
        setAlert(error);
        setTimeout(() => setAlert(""), 10000);
      });
  };

  const handleSelect = (aircraftSelected: AircraftData) => {
    handleAircraftSelect(aircraftSelected);
    history.push("/");
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

  const handleCloning = async (aircraftId: string) => {
    setAlert("");

    if (await isUserAuthenticated()) {
      await handleAircraftCloning(aircraftId)
        .catch(error => {
          console.error(error);
          setAlert(error);
          setTimeout(() => setAlert(""), 10000);
        });
    }
  };

  return (
    <div className={"Container"}>
      <h1>
        Aircraft Page - {isEditMode ? "Edit" : "View"} Mode
      </h1>
      <h2>
        {propsToLabel({
          props: [aircraft?.authorUsername, aircraft?.manufacturer, aircraft?.model, aircraft?.variant],
          separator: " / "
        })}
      </h2>

      <hr />

      <div>
      {aircraft 
        ? <Formik 
            initialValues={aircraft}
            validationSchema={aircraftSchema}
            onSubmit={async (values: AircraftData, { setSubmitting }: FormikHelpers<AircraftData>) => {
              await handleSubmit(values);
              setSubmitting(false);
          }}
          >
            {({ isSubmitting }) => 
              <Form className={"Form"}>
                <div className={"Fields"}>
                  <div className={"FieldGroup"}>
                    <label>ICAO ID:</label>
                    <Field 
                      type="text" 
                      name="icaoId" 
                      placeholder="ICAO ID"
                      disabled={isSubmitting || !isEditMode}
                      value={aircraft.icaoId}
                    />
                    <ErrorMessage component="span" name="icaoId" />
                  </div>
      
                  <div className={"FieldGroup"}>
                    <label>Manufacturer:</label>
                    <Field 
                      type="text"
                      name="manufacturer"
                      placeholder="Manufacturer"
                      disabled={isSubmitting || !isEditMode}
                      value={aircraft.manufacturer}
                    />
                    <ErrorMessage component="span" name="manufacturer" />
                  </div>
      
                  <div className={"FieldGroup"}>
                    <label>Model:</label>
                    <Field
                      type="text"
                      name="model"
                      placeholder="Model"
                      disabled={isSubmitting || !isEditMode}
                      value={aircraft.model}
                    />
                    <ErrorMessage component="span" name="model" />
                  </div>
      
                  <div className={"FieldGroup"}>
                    <label>Variant:</label>
                    <Field
                      type="text"
                      name="variant"
                      placeholder="Variant"
                      disabled={isSubmitting || !isEditMode}
                      value={aircraft.variant}
                    />
                    <ErrorMessage component="span" name="variant" />
                  </div>

                  <div className={"FieldGroup"}>
                    <label>Registration:</label>
                    <Field
                      type="text"
                      name="registration"
                      placeholder="Registration"
                      disabled={isSubmitting || !isEditMode}
                      value={aircraft.registration}
                    />
                    <ErrorMessage component="span" name="registration" />
                  </div>
      
                  <div className={"FieldGroup"}>
                    <EnumOptions
                      enumerator={EAircraftType}
                      labelName="Aircraft Type"
                      name="aircraftType"
                      isDisabled={isSubmitting || !isEditMode}
                      value={aircraft.aircraftType}
                    />
                  </div>

                  <div className={"FieldGroup"}>
                    <EnumOptions
                      enumerator={EEngineType}
                      labelName="Engine Type"
                      name="engineType"
                      isDisabled={isSubmitting || !isEditMode}
                      value={aircraft.engineType}
                    />
                  </div>

                  <div className={"FieldGroup"}>
                    <label>Engine Count:</label>
                    <Field 
                      type="number" 
                      name="engineCount" 
                      disabled={isSubmitting || !isEditMode}
                      value={aircraft.engineCount}
                    />
                    <ErrorMessage component="span" name="engineCount" />
                  </div>

                  <div className={"FieldGroup"}>
                    <EnumOptions 
                      enumerator={EWeightCategory}
                      labelName="Weight Category"
                      name="weightCategory"
                      isDisabled={isSubmitting || !isEditMode}
                      value={aircraft.weightCategory}
                    />
                  </div>

                  <div className={"FieldGroup"}>
                    <EnumOptions 
                      enumerator={EIcaoWakeCategory}
                      labelName="ICAO Wake Category"
                      name="icaoWakeCategory"
                      isDisabled={isSubmitting || !isEditMode}
                      value={aircraft.icaoWakeCategory}
                    />
                  </div>

                  <div className={"FieldGroup"}>
                    <EnumOptions 
                      enumerator={EFuelType}
                      labelName="Fuel Type"
                      name="fuelType"
                      isDisabled={isSubmitting || !isEditMode}
                      value={aircraft.fuelType}
                    />
                  </div>

                  <div className={"FieldGroup"}>
                    <label>Max Takeoff Weight:</label>
                    <Field
                      type="number"
                      name="maxTakeoffWeight"
                      disabled={isSubmitting || !isEditMode}
                      value={aircraft.maxTakeoffWeight}
                    />
                    <ErrorMessage component="span" name="maxTakeoffWeight" />
                  </div>

                  <div className={"FieldGroup"}>
                    <label>Cruise Speed:</label>
                    <Field
                      type="number"
                      name="cruiseSpeed"
                      disabled={isSubmitting || !isEditMode}
                      value={aircraft.cruiseSpeed}
                    />
                    <ErrorMessage component="span" name="cruiseSpeed" />
                  </div>

                  <div className={"FieldGroup"}>
                    <label>Fuel Capacity:</label>
                    <Field
                      type="number"
                      name="fuelCapacity"
                      disabled={isSubmitting || !isEditMode}
                      value={aircraft.fuelCapacity}
                    />
                    <ErrorMessage component="span" name="fuelCapacity" />
                  </div>

                  <div className={"FieldGroup"}>
                    <label>Max Range:</label>
                    <Field
                      type="number"
                      name="maxRange"
                      disabled={isSubmitting || !isEditMode}
                      value={aircraft.maxRange}
                    />
                    <ErrorMessage component="span" name="maxRange" />
                  </div>

                  <div className={"FieldGroup"}>
                    <label>Service Ceiling:</label>
                    <Field
                      type="number"
                      name="serviceCeiling"
                      disabled={isSubmitting || !isEditMode}
                      value={aircraft.serviceCeiling}
                    />
                    <ErrorMessage component="span" name="serviceCeiling" />
                  </div>
                </div>
      
                <div className={"AlertNotification"}>
                  <AlertBox alertText={alert}/>
                </div>

                <div className={"Options"}>
                  {/* TODO: handle delete */}
                  <div>
                  {
                    isAircraftOwned
                    ? <Button style={"danger"} handleClick={() => handleAircraftDelete}>
                        DELETE
                      </Button>
                    : <SaveActionsButton
                        aircraft={aircraft}
                        aircraftsSaved={aircraftsSaved}
                        handleAircraftSave={handleSave}
                        handleAircraftUnsave={handleAircraftUnsave}
                      />
                  }
                  </div>

                  {/* TODO: handle edit mode*/}
                  {/* TODO: handle clone */}
                  {/* TODO: route to cloned aircraft */}
                  <div>
                  {
                    isAircraftOwned
                    ? isEditMode
                      ? <Button handleClick={() => setIsEditMode(true)} style={"primary"}>
                          EDIT
                        </Button>
                      : <Button style={"primary"} handleClick={() => setIsEditMode(false)}>
                          VIEW
                        </Button>
                    // TODO: if user not logged route to login
                    : <Button 
                        style={"primary"}
                        handleClick={() => handleCloning(aircraftId)}
                        disabled={getUserData() === null}
                      >
                        CLONE
                      </Button>
                  }
                  </div>

                  <div>
                    {
                      isEditMode
                      // TODO: on click handle submit and switch edit mode
                      ? <Button type="submit" style={"primary"}>
                          SUBMIT
                        </Button>
                      : <Button style={"primary"} handleClick={() => handleSelect(aircraft)}>
                          SELECT
                        </Button>
                    }
                  </div>
                </div>
            </Form>
            }
          </Formik>
        : <div className={Spinner.spinner}></div>
      }
      </div>
    </div>
  );
};

export default AircraftDetails;
