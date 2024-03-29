import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";

import { landmarkSchema } from "../../../../validators/landmarkValidators";
import { LandmarkWithoutIDs } from "../../../../types/Landmark/Landmark";

import AlertBox from "../../../Generics/Alerts/AlertBox";
import FieldGroup from "../../../Generics/FormGroups/FieldGroup";

import Style from "../../../Generics/FormGroups/FormPage.module.scss";
import { Coordinates } from "../../../../types/Map/MapTypes";

interface Props {
  handleCreate: (newLandmark: LandmarkWithoutIDs) => void;
}

const LandmarkCreate: React.FC<Props> = ({handleCreate}) => {
  const [alert, setAlert] = React.useState("");
  const history = useHistory();

  const coordinates: Coordinates = history.location.state as Coordinates;
  console.log("Coordinates from history:", coordinates);

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
    icaoId: "",
    iataId: "",
    name: "",
    description: "",
    latitude: coordinates ? Number(coordinates.latitude) : 0,
    longitude: coordinates ? Number(coordinates.longitude) : 0,
    altitude: 0,
    imageUrl: "",
  };

  // TODO: refactor with aircraft create page
  // TODO: preview image
  return (
      <div className={Style.FormContainer}>
        <h1 className={Style.FormTitle}>Create Landmark</h1>
  
        <hr className={Style.Separator}/>

        <Formik 
          initialValues={initialFormValues}
          validationSchema={landmarkSchema}
          onSubmit={async (values: LandmarkWithoutIDs, { setSubmitting }: FormikHelpers<LandmarkWithoutIDs>) => {
            await handleSubmit(values);
            setSubmitting(false);
        }}
        >
          {({ values, isSubmitting }) => 
            <Form className={Style.Form}>
              <div className={Style.Fields}>
                <FieldGroup 
                  label="IcaoID" type="text"
                  value={values.icaoId}
                  valueName="icaoId"
                  placeholder="ICAO ID"
                  isDisabled={isSubmitting}
                />
                <FieldGroup 
                  label="IataID" type="text" 
                  value={values.iataId}
                  valueName="iataId"
                  placeholder="IATA ID"
                  isDisabled={isSubmitting}
                />
                <FieldGroup 
                  label="name" type="text" 
                  value={values.name}
                  valueName="name"
                  placeholder="Location name"
                  isDisabled={isSubmitting}
                />
                <FieldGroup 
                  label="description" type="text" 
                  value={values.description}
                  valueName="description"
                  placeholder="Location description"
                  isDisabled={isSubmitting}
                />
                <FieldGroup 
                  label="latitude" type="number" 
                  value={values.latitude}
                  valueName="latitude"
                  isDisabled={isSubmitting}
                />
                <FieldGroup 
                  label="longitude" type="number" 
                  value={values.longitude}
                  valueName="longitude"
                  isDisabled={isSubmitting}
                />
                <FieldGroup 
                  label="altitude" type="number" 
                  value={values.altitude}
                  valueName="altitude"
                  placeholder="Altitude"
                  isDisabled={isSubmitting}
                />
                <FieldGroup 
                  label="imageUrl" type="text" 
                  value={values.imageUrl}
                  valueName="imageUrl"
                  placeholder="Image URL"
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

export default LandmarkCreate;
