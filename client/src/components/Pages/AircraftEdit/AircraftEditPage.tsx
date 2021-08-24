
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUserData } from "../../../helpers/userHelper";
import aircraftService from "../../../services/aircraftService";

import { AircraftData } from "../../../types/Aircraft/Aircraft";
import { EAircraftType, EEngineType, EWeightCategory, EIcaoWakeCategory, EFuelType } from "../../../types/Aircraft/AircraftEnums";
import { aircraftSchema } from "../../../validators/aircraftValidators";
import AlertBox from "../../Alerts/AlertBox";
import EnumOptions from "../AircraftCreate/EnumOptions";

import "./AircraftEditPage.scss";
import Spinner from "../../../styles/components/_spinner.module.scss";


interface Props {
  handleAircraftEdit: (aircraftId: string, editedAircraft: AircraftData) => Promise<void>;
  handleAircraftSelect: (selected: AircraftData | null) => void;
}

const AircraftEdit: React.FC<Props> = ({ handleAircraftEdit, handleAircraftSelect }) => {
  const { id }: any = useParams();
  const history = useHistory();

  const [alert, setAlert] = React.useState("");

  const [aircraft, setAircraft] = React.useState<AircraftData>();
  React.useEffect(() => {
    aircraftService.getAircraftById(id)
      .then(response => setAircraft(response));

  }, []);

  const [isEditMode, setIsEditMode] = React.useState(false);
  React.useEffect(() => {
    if (aircraft) {
      const user = getUserData();
      setIsEditMode(user?.username === aircraft?.authorUsername);
    }
  }, [aircraft]);


  const handleSubmit = (editedAircraft : AircraftData) => { 
    try {
      setAlert("");

      if (isEditMode) {
        handleAircraftEdit(editedAircraft.id , editedAircraft);
      }

      handleAircraftSelect(editedAircraft);
      history.push("/");
    } catch(error) {
      console.log(error.message);
      setAlert(error.message);
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

                <div className={"SubmitButton"}>
                  <button type="submit" >
                    Accept
                  </button>
                </div>
            </Form>
            }
          </Formik>
        : <div className={Spinner.spinner}></div>
      }
      </div>
      

      {/* TODO: EDIT/CLONE button */}
      {/* TODO: DELETE button */}
      {/* TODO: SELECT button */}
    </div>
  );
};

export default AircraftEdit;
