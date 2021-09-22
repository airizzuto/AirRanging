import React from 'react';

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';

import EnumOptions from '../AircraftCreate/EnumOptions';
import { AircraftData } from '../../../types/Aircraft/Aircraft';
import { EAircraftType, EEngineType, EFuelType, EIcaoWakeCategory, EWeightCategory } from '../../../types/Aircraft/AircraftEnums';
import { aircraftSchema } from '../../../validators/aircraftValidators';

import "./AircraftDetails.scss";
import AircraftActionsButtons, { IAircraftButtonsHandlers } from './AircraftActionsButtons';

interface Props {
  aircraft: AircraftData;
  aircraftsSaved: AircraftData[] | null;
  isAircraftOwned: boolean;
  isEditMode: boolean;
  handlers: IAircraftButtonsHandlers;
}

const AircraftForm: React.FC<Props> = ({
  aircraft, aircraftsSaved, isEditMode, isAircraftOwned, handlers
}) => {
  return (
    <Formik 
      initialValues={aircraft}
      validationSchema={aircraftSchema}
      onSubmit={async (values: AircraftData, { setSubmitting }: FormikHelpers<AircraftData>) => {
        await handlers.handleSubmit(values);
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
                value={aircraft.variant ? aircraft.variant : ""}
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
                value={aircraft.registration ? aircraft.registration : ""}
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

          <AircraftActionsButtons
            aircraft={aircraft}
            isEditMode={isEditMode}
            isAircraftOwned={isAircraftOwned}
            aircraftsSaved={aircraftsSaved}
            handlers={handlers}
          />
      </Form>
      }
    </Formik>
  );
};

export default AircraftForm;
