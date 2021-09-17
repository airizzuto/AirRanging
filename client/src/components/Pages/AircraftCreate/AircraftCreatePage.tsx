import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { NewAircraft } from "../../../types/Aircraft/Aircraft";
import { EAircraftType, EEngineType, EFuelType, EIcaoWakeCategory, EWeightCategory } from "../../../types/Aircraft/AircraftEnums";
import { aircraftSchema } from "../../../validators/aircraftValidators";
import AlertBox from "../../Generics/Alerts/AlertBox";

import Style from "./AircraftCreate.module.scss";
import EnumOptions from "./EnumOptions";

interface Props {
  handleCreate: (newAircraft: NewAircraft) => void;
}

const AircraftCreate: React.FC<Props> = ({handleCreate}) => {
  const [alert, setAlert] = React.useState("");

  const history = useHistory();

  const handleSubmit = (newAircraft : NewAircraft) => { 
    try {
      setAlert("");
      handleCreate(newAircraft);
      history.push("/");
    } catch(error: any) {
      console.error(error);
      setAlert(error);
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
          validationSchema={aircraftSchema}
          onSubmit={async (values: NewAircraft, { setSubmitting }: FormikHelpers<NewAircraft>) => {
            await handleSubmit(values);
            setSubmitting(false);
        }}
        >
          {({ isSubmitting }) => 
            //TODO: Field render={ disabled={isSubmitting} }
            <Form className={Style.Form}>
              <div className={Style.Fields}>
                <div className={Style.FieldGroup}>
                  <label>ICAO ID:</label>
                  <Field type="text" name="icaoId" placeholder="ICAO ID"/>
                  <ErrorMessage component="span" name="icaoId" />
                </div>
    
                <div className={Style.FieldGroup}>
                  <label>Manufacturer:</label>
                  <Field type="text" name="manufacturer" placeholder="Manufacturer" disabled={isSubmitting} />
                  <ErrorMessage component="span" name="manufacturer" />
                </div>
    
                <div className={Style.FieldGroup}>
                  <label>Model:</label>
                  <Field type="text" name="model" placeholder="Model" disabled={isSubmitting}/>
                  <ErrorMessage component="span" name="model" />
                </div>
    
                <div className={Style.FieldGroup}>
                  <label>Variant:</label>
                  <Field type="text" name="variant" placeholder="Variant" disabled={isSubmitting}/>
                  <ErrorMessage component="span" name="variant" />
                </div>

                <div className={Style.FieldGroup}>
                  <label>Registration:</label>
                  <Field type="text" name="registration" placeholder="Registration" disabled={isSubmitting}/>
                  <ErrorMessage component="span" name="registration" />
                </div>
    
                <div className={Style.FieldGroup}>
                  <EnumOptions enumerator={EAircraftType} labelName="Aircraft Type" name="aircraftType" isDisabled={isSubmitting}/>
                </div>

                <div className={Style.FieldGroup}>
                  <EnumOptions enumerator={EEngineType} labelName="Engine Type" name="engineType" isDisabled={isSubmitting}/>
                </div>

                <div className={Style.FieldGroup}>
                  <label>Engine Count:</label>
                  <Field type="number" name="engineCount" disabled={isSubmitting}/>
                  <ErrorMessage component="span" name="engineCount" />
                </div>

                <div className={Style.FieldGroup}>
                  <EnumOptions enumerator={EWeightCategory} labelName="Weight Category" name="weightCategory" isDisabled={isSubmitting}/>
                </div>

                <div className={Style.FieldGroup}>
                  <EnumOptions enumerator={EIcaoWakeCategory} labelName="ICAO Wake Category" name="icaoWakeCategory" isDisabled={isSubmitting}/>
                </div>

                <div className={Style.FieldGroup}>
                  <EnumOptions enumerator={EFuelType} labelName="Fuel Type" name="fuelType" isDisabled={isSubmitting}/>
                </div>

                <div className={Style.FieldGroup}>
                  <label>Max Takeoff Weight:</label>
                  <Field type="number" name="maxTakeoffWeight" disabled={isSubmitting}/>
                  <ErrorMessage component="span" name="maxTakeoffWeight" />
                </div>

                <div className={Style.FieldGroup}>
                  <label>Cruise Speed:</label>
                  <Field type="number" name="cruiseSpeed" disabled={isSubmitting}/>
                  <ErrorMessage component="span" name="cruiseSpeed" />
                </div>

                <div className={Style.FieldGroup}>
                  <label>Fuel Capacity:</label>
                  <Field type="number" name="fuelCapacity" disabled={isSubmitting}/>
                  <ErrorMessage component="span" name="fuelCapacity" />
                </div>

                <div className={Style.FieldGroup}>
                  <label>Max Range:</label>
                  <Field type="number" name="maxRange" disabled={isSubmitting}/>
                  <ErrorMessage component="span" name="maxRange" />
                </div>

                <div className={Style.FieldGroup}>
                  <label>Service Ceiling:</label>
                  <Field type="number" name="serviceCeiling" disabled={isSubmitting}/>
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
