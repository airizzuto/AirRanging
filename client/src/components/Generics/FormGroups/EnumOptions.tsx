import { ErrorMessage, Field } from 'formik';
import "./formGroup.scss";

interface Props {
  enumerator: any;
  labelName: string;
  name: string;
  isDisabled?: boolean;
  value?: any;
}

/**
 * 
 * @param enumerator: Enumerator with the members to be passed as options
 * @param labelName: Label to be displayed
 * @param name: Name reference
 * @returns Iterates enumerator members and passes them as options for the form selector dropdown
 */
const EnumOptions: React.FC<Props> = ({
  enumerator, labelName, name, isDisabled, value
}) => {

  return (
    <div className="formGroup">
      <label>{labelName}</label>
      <Field 
        name={name}
        placeholder={labelName}
        component="select"
        disabled={isDisabled}
        value={value}
      >
        {Object.keys(enumerator).map(key => {
          return <option value={key} key={key}>{enumerator[key]}</option>;
        })}
      </Field>
      <ErrorMessage component="span" name={name} />
    </div>

  );
};

export default EnumOptions;
