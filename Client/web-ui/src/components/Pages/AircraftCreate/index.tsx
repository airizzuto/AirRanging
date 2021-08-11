import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import aircraftService from "../../../services/aircraftService";
import { NewAircraft } from "../../../types/Aircraft/Aircraft";
import { EAircraftType, EEngineType, EFuelType, EIcaoWakeCategory, EWeightCategory } from "../../../types/enums/AircraftEnums";
import { aircraftCreationSchema } from "../../../validators/aircraftValidators";
import AlertBox from "../../Alerts/AlertBox";

import Style from "./AircraftCreate.module.scss";
import EnumOptions from "./EnumOptions";

const AircraftCreate: React.FC = () => {
  const [alert, setAlert] = React.useState("");

  const history = useHistory();

  const handleSubmit = async (newAircraft : NewAircraft) => { 
    try {
      setAlert("");
      await aircraftService.createAircraft(newAircraft);
      history.push("/");
    } catch(error) {
      console.log(error.message);
      setAlert(error.message);
      setTimeout(() => setAlert(""), 10000);
    }
  };

  const initialFormValues: NewAircraft = {
    icaoId: "",
    manufacturer: "",
    model: "",
    variant: "",
    registration: "",
    aircraftType: EAircraftType.SingleEngineLand,
    engineType: EEngineType.Piston,
    engineCount: 1,
    weightCategory: EWeightCategory.Small,
    icaoWakeCategory: EIcaoWakeCategory.Light,
    fuelType: EFuelType.AvGas,
    maxTakeoffWeight: 0,
    cruiseSpeed: 0,
    fuelCapacity: 0,
    maxRange: 0,
    serviceCeiling: 0,
  };

  return (
      <div className={Style.FormContainer}>
        <h1 className={Style.FormTitle}>Create Aircraft</h1>
  
        <hr className={Style.Separator}/>

        <Formik 
          initialValues={initialFormValues}
          validationSchema={aircraftCreationSchema}
          onSubmit={async (values: NewAircraft, { setSubmitting }: FormikHelpers<NewAircraft>) => {
            await handleSubmit(values);
            setSubmitting(false);
        }}
        >
          {({ isSubmitting }) => 
            <Form className={Style.Form}>
              <div className={Style.Fields}>
                <div className={Style.FieldGroup}>
                  <label>ICAO ID:</label>
                  <Field type="text" name="icaoId" placeholder="ICAO ID"/>
                  <ErrorMessage component="span" name="icaoId" />
                </div>
    
                <div className={Style.FieldGroup}>
                  <label>Manufacturer:</label>
                  <Field type="text" name="manufacturer" placeholder="Manufacturer"/>
                  <ErrorMessage component="span" name="manufacturer" />
                </div>
    
                <div className={Style.FieldGroup}>
                  <label>Model:</label>
                  <Field type="text" name="model" placeholder="Model"/>
                  <ErrorMessage component="span" name="model" />
                </div>
    
                <div className={Style.FieldGroup}>
                  <label>Variant:</label>
                  <Field type="text" name="variant" placeholder="Variant"/>
                  <ErrorMessage component="span" name="variant" />
                </div>

                <div className={Style.FieldGroup}>
                  <label>Registration:</label>
                  <Field type="text" name="registration" placeholder="Registration"/>
                  <ErrorMessage component="span" name="registration" />
                </div>
    
                <div className={Style.FieldGroup}>
                  <EnumOptions enumerator={EAircraftType} labelName="Aircraft Type" name="aircraftType" />
                </div>

                <div className={Style.FieldGroup}>
                  <EnumOptions enumerator={EEngineType} labelName="Engine Type" name="engineType" />
                </div>

                <div className={Style.FieldGroup}>
                  <label>Engine Count:</label>
                  <Field type="number" name="engineCount"/>
                  <ErrorMessage component="span" name="engineCount" />
                </div>

                <div className={Style.FieldGroup}>
                  <EnumOptions enumerator={EWeightCategory} labelName="Weight Category" name="weightCategory" />
                </div>

                <div className={Style.FieldGroup}>
                  <EnumOptions enumerator={EIcaoWakeCategory} labelName="ICAO Wake Category" name="icaoWakeCategory" />
                </div>

                <div className={Style.FieldGroup}>
                  <EnumOptions enumerator={EFuelType} labelName="Fuel Type" name="fuelType" />
                </div>

                <div className={Style.FieldGroup}>
                  <label>Max Takeoff Weight:</label>
                  <Field type="number" name="maxTakeoffWeight" />
                  <ErrorMessage component="span" name="maxTakeoffWeight" />
                </div>

                <div className={Style.FieldGroup}>
                  <label>Cruise Speed:</label>
                  <Field type="number" name="cruiseSpeed" />
                  <ErrorMessage component="span" name="cruiseSpeed" />
                </div>

                <div className={Style.FieldGroup}>
                  <label>Fuel Capacity:</label>
                  <Field type="number" name="fuelCapacity" />
                  <ErrorMessage component="span" name="fuelCapacity" />
                </div>

                <div className={Style.FieldGroup}>
                  <label>Max Range:</label>
                  <Field type="number" name="maxRange" />
                  <ErrorMessage component="span" name="maxRange" />
                </div>

                <div className={Style.FieldGroup}>
                  <label>Service Ceiling:</label>
                  <Field type="number" name="serviceCeiling" />
                  <ErrorMessage component="span" name="serviceCeiling" />
                </div>
              </div>
    
              <div className={Style.AlertNotification}>
                <AlertBox alertText={alert}/>
              </div>

              <div className={Style.SubmitButton}>
                <button type="submit" disabled={isSubmitting}>
                  Create
                </button>
              </div>
          </Form>
          }
        </Formik>

      </div>
  );
};

export default AircraftCreate;
