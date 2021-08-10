import { ErrorMessage, Field } from 'formik';

interface Props {
  enumerator: any;
  labelName: string;
  name: string;
}

const EnumSelector: React.FC<Props> = ({enumerator, labelName, name}) => {

  return (
    <>
      <label>{labelName}</label>
      <Field 
        name={name}
        placeholder={labelName}
        component="select"
      >
        {Object.keys(enumerator).map(key => {
          return <option value={key}>{enumerator[key]}</option>;
        })}
      </Field>
      <ErrorMessage component="span" name={name} />
    </>

  );
};

export default EnumSelector;
