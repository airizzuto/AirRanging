import {useState, useCallback} from "react";

// https://usehooks.com/useToggle/
// Parameter is the boolean, with default "false" value
const useToggle = (initialState = false): [boolean, any] => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState);
  
  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback((): void => setState(state => !state), []);
  
  return [state, toggle];
};

export default useToggle;
