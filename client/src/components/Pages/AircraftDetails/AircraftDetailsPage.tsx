
import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useHistory, useParams } from "react-router-dom";

import aircraftService from "../../../services/aircraftService";
import { isUserOwner } from "../../../helpers/userHelper";

import { AircraftData } from "../../../types/Aircraft/Aircraft";
import { EAircraftType, EEngineType, EWeightCategory, EIcaoWakeCategory, EFuelType } from "../../../types/Aircraft/AircraftEnums";
import { aircraftSchema } from "../../../validators/aircraftValidators";
import AlertBox from "../../Alerts/AlertBox";
import EnumOptions from "../AircraftCreate/EnumOptions";

import "./AircraftDetails.scss";
import Spinner from "../../../styles/components/_spinner.module.scss";

interface Props {
  aircraftsSaved: AircraftData[] | null;
  handleAircraftEdit: (aircraftId: string, editedAircraft: AircraftData) => Promise<void>;
  handleAircraftSelect: (selected: AircraftData | null) => void;
}

const AircraftDetails: React.FC<Props> = ({ aircraftsSaved, handleAircraftEdit, handleAircraftSelect }) => {
  const { aircraftId }: any = useParams();
  const history = useHistory();

  const [alert, setAlert] = useState("");
  const [aircraft, setAircraft] = useState<AircraftData>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAircraftOwned, setIsAircraftOwned] = useState(false);
  const [isAircraftSaved, setIsAircraftSaved] = useState(false);

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

  useEffect(() => {
    if (aircraft) {
      setIsAircraftSaved(aircraftsSaved?.find(a => a.id == aircraft.id) != null);
    }
  }, [aircraft, aircraftsSaved]);

  useEffect(() => {
    if (aircraft && isAircraftOwned) {
      setIsEditMode(true);
    }

    setIsEditMode(false);
  }, [aircraft, isAircraftOwned]);

  {/* TODO: user logged check on save/clone handlers. Route to login */}

  const handleSubmit = (editedAircraft : AircraftData) => { 
    try {
      setAlert("");

      if (isEditMode) {
        handleAircraftEdit(editedAircraft.id , editedAircraft);
      }

      handleAircraftSelect(editedAircraft);
      history.push("/");
    } catch(error: any) {
      console.error(error);
      setAlert(error);
      setTimeout(() => setAlert(""), 10000);
    }
  };

  return (
    <div className={"Container"}>
      <h1>Aircraft Details: {aircraft?.model} {aircraft?.variant}</h1>

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
                  {/* TODO: handle save/unsave */}
                  <div>
                  {
                    isAircraftOwned
                    ? <button className={"Delete"}>
                        DELETE
                      </button>
                    : isAircraftSaved
                      ? <button>
                          SAVED
                        </button>
                      // TODO: disable if user not logged
                      : <button>
                          SAVE
                        </button>
                  }
                  </div>

                  {/* TODO: handle edit mode*/}
                  {/* TODO: handle clone */}
                  {/* TODO: route to cloned aircraft */}
                  <div>
                  {
                    isEditMode
                    ? <button onClick={() => setIsEditMode(true)}>
                        EDIT
                      </button>
                    // TODO: disable if user not logged
                    : <button>
                        CLONE
                      </button>
                      
                  }
                  </div>

                  <div>
                    {
                      isEditMode
                      // TODO: on click handle submit and switch edit mode
                      ? <button type="submit" >
                          SUBMIT
                        </button>
                      : <button>
                          SELECT
                        </button>
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