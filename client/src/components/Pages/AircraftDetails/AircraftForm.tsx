import React from 'react';

import { Form, Formik, FormikHelpers } from 'formik';

import EnumOptions from '../../Generics/FormGroups/EnumOptions';
import { AircraftData } from '../../../types/Aircraft/Aircraft';
import { EAircraftType, EEngineType, EFuelType, EIcaoWakeCategory, EWeightCategory } from '../../../types/Aircraft/AircraftEnums';
import { aircraftSchema } from '../../../validators/aircraftValidators';

import "./AircraftDetails.scss";
import AircraftActionsButtons, { IAircraftButtonsHandlers } from './AircraftActionsButtons';
import FieldGroup from '../../Generics/FormGroups/FieldGroup';

interface Props {
  aircraft: AircraftData;
  aircraftsSaved: AircraftData[] | null;
  isAircraftOwned: boolean;
  isEditMode: boolean;
  handlers: IAircraftButtonsHandlers;
}

// TODO: fix edit forms not updating on change
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

            <FieldGroup 
              label="ICAO ID" type="text" valueName="icaoId"
              placeholder="ICAO ID" 
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.icaoId}
            />

            <FieldGroup 
              label="Manufacturer" type="text" valueName="manufacturer"
              placeholder="Manufacturer" 
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.manufacturer}
            />

            <FieldGroup 
              label="Model" type="text" valueName="model"
              placeholder="Model" 
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.model}
            />

            <FieldGroup 
              label="Variant" type="text" valueName="variant"
              placeholder="Variant" 
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.variant ? aircraft.variant : ""}
            />

            <FieldGroup 
              label="Registration" type="text" valueName="registration"
              placeholder="Registration" 
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.registration ? aircraft.registration : ""}
            />

            <EnumOptions
              enumerator={EAircraftType}
              labelName="Aircraft Type"
              name="aircraftType"
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.aircraftType}
            />

            <EnumOptions
              enumerator={EEngineType}
              labelName="Engine Type"
              name="engineType"
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.engineType}
            />

            <FieldGroup 
              label="Engine Count" type="number" valueName="engineCount"
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.engineCount}
            />

            <EnumOptions 
              enumerator={EWeightCategory}
              labelName="Weight Category"
              name="weightCategory"
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.weightCategory}
            />

            <EnumOptions 
              enumerator={EIcaoWakeCategory}
              labelName="ICAO Wake Category"
              name="icaoWakeCategory"
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.icaoWakeCategory}
            />

            <EnumOptions 
              enumerator={EFuelType}
              labelName="Fuel Type"
              name="fuelType"
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.fuelType}
            />

            <FieldGroup 
              label="Max Takeoff Weight" type="number" valueName="maxTakeoffWeight"
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.maxTakeoffWeight}
            />

            <FieldGroup 
              label="Cruise Speed" type="number" valueName="cruiseSpeed"
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.cruiseSpeed}
            />

            <FieldGroup 
              label="Fuel Capacity" type="number" valueName="fuelCapacity"
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.fuelCapacity}
            />

            <FieldGroup 
              label="Max Range" type="number" valueName="maxRange"
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.maxRange}
            />

            <FieldGroup 
              label="Service Ceiling" type="number" valueName="serviceCeiling"
              isDisabled={isSubmitting || !isEditMode}
              value={aircraft.serviceCeiling}
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
