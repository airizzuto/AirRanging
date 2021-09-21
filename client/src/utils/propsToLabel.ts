
const propsParser = (props: any[], replacement?: string) => {
  return props.map(property => !property ? replacement : property);
};

interface UtilProps {
  props: any[];
  undefinedReplacement?: string,
  separator?: string
}

const propsToLabel = ({
  props, undefinedReplacement, separator
}: UtilProps): string => {
  return propsParser(props, undefinedReplacement).join(separator);
};

export default propsToLabel;
