import React from 'react';

import { Form, Formik, FormikHelpers } from 'formik';

import FieldSelect from '../../../Generics/FormGroups/FieldSelect';
import { AircraftWithSocials } from '../../../../types/Aircraft/Aircraft';
import { EAircraftType, EEngineType, EFuelType, EIcaoWakeCategory, EWeightCategory } from '../../../../types/Aircraft/AircraftEnums';
import { aircraftSchema } from '../../../../validators/aircraftValidators';

import "./AircraftDetails.scss";
import AircraftActionsButtons, { IAircraftButtonsHandlers } from './AircraftActionsButtons';
import FieldGroup from '../../../Generics/FormGroups/FieldGroup';

interface Props {
  aircraft: AircraftWithSocials;
  aircraftsSaved: AircraftWithSocials[] | null;
  isAircraftOwned: boolean;
  isEditMode: boolean;
  handlers: IAircraftButtonsHandlers;
}

const AircraftForm: React.FC<Props> = ({
  aircraft, aircraftsSaved, isEditMode, isAircraftOwned, handlers
}) => {
  
  return (
    <Formik
      initialValues={{...aircraft}}
      validationSchema={aircraftSchema}
      onSubmit={async (values: AircraftWithSocials, { setSubmitting }: FormikHelpers<AircraftWithSocials>) => {
        await handlers.handleSubmit(values);
        setSubmitting(false);
      }
    }
    >
      {({ values, isSubmitting }) => 
        <Form className={"Form"}>
          <div className={"Fields"}>
            <FieldGroup 
              label="ICAO ID" type="text"
              value={values.icaoId}
              valueName="icaoId"
              placeholder="ICAO ID"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldGroup 
              label="Manufacturer" type="text"
              value={values.manufacturer}
              valueName="manufacturer"
              placeholder="Manufacturer"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldGroup 
              label="Model" type="text"
              value={values.model}
              valueName="model"
              placeholder="Model"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldGroup 
              label="Variant" type="text"
              value={values.variant}
              valueName="variant"
              placeholder="Variant"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldGroup 
              label="Registration" type="text"
              value={values.registration}
              valueName="registration"
              placeholder="Registration"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldSelect
              enumerator={EAircraftType}
              value={values.aircraftType}
              labelName="Aircraft Type"
              name="aircraftType"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldSelect
              enumerator={EEngineType}
              value={values.engineType}
              labelName="Engine Type"
              name="engineType"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldGroup 
              label="Engine Count" type="number"
              value={values.engineCount}
              valueName="engineCount"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldSelect 
              enumerator={EWeightCategory}
              value={values.weightCategory}
              labelName="Weight Category"
              name="weightCategory"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldSelect 
              enumerator={EIcaoWakeCategory}
              value={values.icaoWakeCategory}
              labelName="ICAO Wake Category"
              name="icaoWakeCategory"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldSelect 
              enumerator={EFuelType}
              value={values.fuelType}
              labelName="Fuel Type"
              name="fuelType"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldGroup 
              label="Fuel Capacity" type="number"
              value={values.fuelCapacity}
              valueName="fuelCapacity"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldGroup 
              label="Max Range" type="number"
              value={values.maxRange}
              valueName="maxRange"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldGroup 
              label="Max Takeoff Weight" type="number"
              value={values.maxTakeoffWeight}
              valueName="maxTakeoffWeight"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldGroup 
              label="Min. Runway Length" type="number"
              valueName="minRunwayLength"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldGroup 
              label="Cruise Speed" type="number"
              value={values.cruiseSpeed}
              valueName="cruiseSpeed"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldGroup 
              label="Service Ceiling" type="number"
              value={values.serviceCeiling}
              valueName="serviceCeiling"
              isDisabled={isSubmitting || !isEditMode}
            />

            <FieldGroup 
              label="Entered Service Year" type="number"
              valueName="enteredServiceAtYear"
              isDisabled={isSubmitting || !isEditMode}
            />
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
