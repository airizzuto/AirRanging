import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import aircraftService from "../../../services/aircraftService";
import { NewAircraft } from "../../../types/Aircraft/Aircraft";
import { EAircraftType, EEngineType, EFuelType, EIcaoWakeCategory, EWeightCategory } from "../../../types/enums/AircraftEnums";
import { aircraftCreationSchema } from "../../../validators/aircraftValidators";
import AlertBox from "../../Alerts/AlertBox";

import Style from "./AircraftCreate.module.scss";

const enumsToOptions = (enumerator: any) => {
  return enumerator.map(
    (entry: any) => <option value={entry}>{entry}</option>
  );
};

const AircraftCreate = () => {
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
      <div className={Style.RegistrationView}>
        <h1 className={Style.RegistrationTitle}>User Registration</h1>
  
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
            <Form className={Style.RegistrationForm}>
            <div className={Style.RegistrationFields}>
              <div className={Style.FormGroup}>
                <label>ICAO ID:</label>
                <Field type="text" name="icaoId" placeholder="ICAO ID"/>
                <ErrorMessage component="span" name="icaoId" />
              </div>
  
              <div className={Style.FormGroup}>
                <label>Manufacturer:</label>
                <Field type="text" name="manufacturer" placeholder="Manufacturer"/>
                <ErrorMessage component="span" name="manufacturer" />
              </div>
  
              <div className={Style.FormGroup}>
                <label>Model:</label>
                <Field type="text" name="model" placeholder="Model"/>
                <ErrorMessage component="span" name="model" />
              </div>
  
              <div className={Style.FormGroup}>
                <label>Variant:</label>
                <Field type="text" name="variant" placeholder="Variant"/>
                <ErrorMessage component="span" name="variant" />
              </div>

              <div className={Style.FormGroup}>
                <label>Registration:</label>
                <Field type="text" name="registration" placeholder="Registration"/>
                <ErrorMessage component="span" name="registration" />
              </div>
  
              <div className={Style.FormGroup}>
                <label>Aircraft Type:</label>
                <Field 
                  name="aircraftType" 
                  placeholder="Aircraft Type" 
                  component="select"
                >
                  {enumsToOptions(EAircraftType)}
                </Field>
                <ErrorMessage component="span" name="aircraftType" />
              </div>

              <div className={Style.FormGroup}>
                <label>Engine Type:</label>
                <Field 
                  name="engineType" 
                  placeholder="Engine Type" 
                  component="select"
                >
                  {enumsToOptions(EEngineType)}
                </Field>
                <ErrorMessage component="span" name="engineType" />
              </div>

              <div className={Style.FormGroup}>
                <label>Engine Count:</label>
                <Field type="number" name="engineCount" placeholder="0"/>
                <ErrorMessage component="span" name="engineCount" />
              </div>

              <div className={Style.FormGroup}>
                <label>Weight Category:</label>
                <Field 
                  name="weightCategory" 
                  placeholder="Weight Category" 
                  component="select"
                >
                  {enumsToOptions(EWeightCategory)}
                </Field>
                <ErrorMessage component="span" name="weightCategory" />
              </div>

              <div className={Style.FormGroup}>
                <label>ICAO Wake Category:</label>
                <Field 
                  name="icaoWakeCategory" 
                  placeholder="Wake Category" 
                  component="select"
                >
                  {enumsToOptions(EIcaoWakeCategory)}
                </Field>
                <ErrorMessage component="span" name="icaoWakeCategory" />
              </div>

              <div className={Style.FormGroup}>
                <label>Fuel Type:</label>
                <Field 
                  name="fuelType" 
                  placeholder="Fuel Type" 
                  component="select"
                >
                  {enumsToOptions(EFuelType)}
                </Field>
                <ErrorMessage component="span" name="fuelType" />
              </div>

              <div className={Style.FormGroup}>
                <label>Max Takeoff Weight:</label>
                <Field type="number" name="maxTakeoffWeight" placeholder="0"/>
                <ErrorMessage component="span" name="maxTakeoffWeight" />
              </div>

              <div className={Style.FormGroup}>
                <label>Cruise Speed:</label>
                <Field type="number" name="cruiseSpeed" placeholder="0"/>
                <ErrorMessage component="span" name="cruiseSpeed" />
              </div>

              <div className={Style.FormGroup}>
                <label>Fuel Capacity:</label>
                <Field type="number" name="fuelCapacity" placeholder="0"/>
                <ErrorMessage component="span" name="fuelCapacity" />
              </div>

              <div className={Style.FormGroup}>
                <label>Max Range:</label>
                <Field type="number" name="maxRange" placeholder="0"/>
                <ErrorMessage component="span" name="maxRange" />
              </div>

              <div className={Style.FormGroup}>
                <label>Service Ceiling:</label>
                <Field type="number" name="serviceCeiling" placeholder="0"/>
                <ErrorMessage component="span" name="serviceCeiling" />
              </div>
            </div>
  
            <div className={Style.Alert}>
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
