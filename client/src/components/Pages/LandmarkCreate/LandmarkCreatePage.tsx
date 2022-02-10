import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";

import { LandmarkWithoutIDs } from "../../../types/Landmark/Landmark";

import AlertBox from "../../Generics/Alerts/AlertBox";
import FieldSelect from "../../Generics/FormGroups/FieldSelect";
import FieldGroup from "../../Generics/FormGroups/FieldGroup";

import Style from "../../Generics/FormGroups/FormPage.module.scss";

interface Props {
  handleCreate: (newAircraft: LandmarkWithoutIDs) => void;
}

const AircraftCreate: React.FC<Props> = ({handleCreate}) => {
  const [alert, setAlert] = React.useState("");

  const history = useHistory();

  const handleSubmit = (newLandmark: LandmarkWithoutIDs) => { 
    try {
      setAlert("");
      handleCreate(newLandmark);
      history.push("/");
    } catch(error: any) {
      console.error(error);
      setAlert(error);
      setTimeout(() => setAlert(""), 10000);
    }
  };

  const initialFormValues: LandmarkWithoutIDs = {
  };

  return (
      <div className={Style.FormContainer}>
        <h1 className={Style.FormTitle}>Create Landmark</h1>
  
        <hr className={Style.Separator}/>

        <Formik 
          initialValues={initialFormValues}
          validationSchema={landmarkSchemas}
          onSubmit={async (values: LandmarkWithoutIDs, { setSubmitting }: FormikHelpers<LandmarkWithoutIDs>) => {
            await handleSubmit(values);
            setSubmitting(false);
        }}
        >
          {({ isSubmitting }) => 
            <Form className={Style.Form}>
              <div className={Style.Fields}>
                {/* TODO: field groups */}
                {/* <FieldGroup 
                  label="Manufacturer" type="text" 
                  valueName="manufacturer"
                  placeholder="Manufacturer"
                  isDisabled={isSubmitting}
                  />
                  
                  <FieldSelect
                  enumerator={EAircraftType}
                  labelName="Type"
                  name="type"
                  isDisabled={isSubmitting}
                /> */}
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
