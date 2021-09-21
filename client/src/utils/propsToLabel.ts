
const propsParser = (props: any[], replacement?: string) => {
  return props.map(property => !property ? replacement : property);
};

interface UtilProps {
  props: any[];
  undefinedReplacement?: string,
  separator?: string
}

/**
 * Converts passed props to a single string.
 * @param props Props to be concatenated into a single string.
 * @param undefinedReplacement String to replace the prop with in case the prop element is undefined.
 * @param separator String to be used as separator in between properties
 * @returns All the properties in a single string.
 */
const propsToLabel = ({
  props, undefinedReplacement, separator
}: UtilProps): string => {
  return propsParser(props, undefinedReplacement).join(separator);
};

export default propsToLabel;
