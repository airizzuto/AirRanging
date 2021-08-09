import { ErrorMessage, Field } from 'formik';

interface Props {
  enumerator: any;
  labelName: string;
  name: string;
}

const EnumSelector = ({enumerator, labelName, name}: Props) => {
  const enumsToOptions = (enumerator: any) => {
    return enumerator.map(
      (entry: any) => <option value={entry}>{entry}</option>
    );
  };

  return (
    <>
      <label>{labelName}</label>
      <Field 
        name={name}
        placeholder={labelName}
        component="select"
      >
        {enumsToOptions(enumerator)}
      </Field>
      <ErrorMessage component="span" name={name} />
    </>

  );
};

export default EnumSelector;
