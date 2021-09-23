import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";

import { aircraftSchema } from "../../../validators/aircraftValidators";
import { NewAircraft } from "../../../types/Aircraft/Aircraft";
import { EAircraftType, EEngineType, EFuelType, EIcaoWakeCategory, EWeightCategory } from "../../../types/Aircraft/AircraftEnums";

import AlertBox from "../../Generics/Alerts/AlertBox";
import EnumOptions from "../../Generics/FormGroups/EnumOptions";
import FieldGroup from "../../Generics/FormGroups/FieldGroup";

import Style from "./AircraftCreate.module.scss";

interface Props {
  handleCreate: (newAircraft: NewAircraft) => void;
}

const AircraftCreate: React.FC<Props> = ({handleCreate}) => {
  const [alert, setAlert] = React.useState("");

  const history = useHistory();

  const handleSubmit = (newAircraft: NewAircraft) => { 
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
                <FieldGroup 
                  label="ICAO ID" type="text" 
                  valueName="icaoId"
                  placeholder="ICAO ID" 
                  isDisabled={isSubmitting}
                />

                <FieldGroup 
                  label="Manufacturer" type="text" 
                  valueName="manufacturer"
                  placeholder="Manufacturer"
                  isDisabled={isSubmitting}
                />

                <FieldGroup 
                  label="Model" type="text" 
                  valueName="model"
                  placeholder="Model" 
                  isDisabled={isSubmitting}
                />

                <FieldGroup 
                  label="Variant" type="text" 
                  valueName="variant"
                  placeholder="Variant" 
                  isDisabled={isSubmitting}
                />

                <FieldGroup 
                  label="Registration" type="text" 
                  valueName="registration"
                  placeholder="Registration" 
                  isDisabled={isSubmitting}
                />

                <EnumOptions
                  enumerator={EAircraftType}
                  labelName="Type"
                  name="ype"
                  isDisabled={isSubmitting}
                />

                <EnumOptions
                  enumerator={EEngineType}
                  labelName="Engine Type"
                  name="engineType"
                  isDisabled={isSubmitting}
                />

                <FieldGroup 
                  label="Engine Count" type="number" 
                  valueName="engineCount"
                  isDisabled={isSubmitting}
                />

                <EnumOptions 
                  enumerator={EWeightCategory}
                  labelName="Weight Category"
                  name="weightCategory"
                  isDisabled={isSubmitting}
                />

                <EnumOptions 
                  enumerator={EIcaoWakeCategory}
                  labelName="ICAO Wake Category"
                  name="icaoWakeCategory"
                  isDisabled={isSubmitting}
                />

                <EnumOptions 
                  enumerator={EFuelType}
                  labelName="Fuel Type"
                  name="fuelType"
                  isDisabled={isSubmitting}
                />

                <FieldGroup 
                  label="Max Takeoff Weight" type="number" 
                  valueName="maxTakeoffWeight"
                  isDisabled={isSubmitting}
                />

                <FieldGroup 
                  label="Cruise Speed" type="number" 
                  valueName="cruiseSpeed"
                  isDisabled={isSubmitting}
                />

                <FieldGroup 
                  label="Fuel Capacity" type="number" 
                  valueName="fuelCapacity"
                  isDisabled={isSubmitting}
                />

                <FieldGroup 
                  label="Max Range" type="number" 
                  valueName="maxRange"
                  isDisabled={isSubmitting}
                />

                <FieldGroup 
                  label="Service Ceiling" type="number" 
                  valueName="serviceCeiling"
                  isDisabled={isSubmitting}
                />
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
