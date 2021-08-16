import { ErrorMessage, Field } from 'formik';

interface Props {
  enumerator: any;
  labelName: string;
  name: string;
}

/**
 * 
 * @param enumerator: Enumerator with the members to be passed as options
 * @param labelName: Label to be displayed
 * @param name: Name reference
 * @returns Iterates enum member and passes them as options for the form selector dropdown
 */
const EnumOptions: React.FC<Props> = ({enumerator, labelName, name}) => {

  return (
    <>
      <label>{labelName}</label>
      <Field 
        name={name}
        placeholder={labelName}
        component="select"
      >
        {Object.keys(enumerator).map(key => {
          return <option value={key} key={key}>{enumerator[key]}</option>;
        })}
      </Field>
      <ErrorMessage component="span" name={name} />
    </>

  );
};

export default EnumOptions;
