import { Link } from "react-router-dom";
import { ButtonStyles } from "../../../types/Buttons/ButtonStyles";
import { Coordinates } from "../../../types/Map/MapTypes";

import "./ButtonStyles.scss";

interface ButtonProps {
  children?: React.ReactElement | string;
  backgroundImage?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  style: ButtonStyles;
}

/**
 * Button component
 * @param children: any ReactElement or string wrapped by this button component.
 * @param handleClick: handler function used by this button.
 * @param disabled: optional conditional check that disables or enables button use.
 * @param type: html button type for use in forms.
 * @param style: button style selected from ButtonStyles.
 * @returns button component.
 */
export const Button: React.FC<ButtonProps> = ({ 
  children, handleClick, disabled, type, style
}) => {
  return (
    <button
      className={style}
      onClick={handleClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

interface LinkProps {
  path: string;
  handleClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children?: React.ReactElement | string;
  style: ButtonStyles;
  disabled?: boolean;
  state?: Coordinates;  // TODO: state ISPs interfaces
}

/**
 * Linked button component used only for routing.
 * @param path: url path to be passed to the Link React Router DOM component for routing.
 * @param children: any ReactElement or string wrapped by this button component.
 * @param handleClick: handler function used by this button.
 * @param disabled: optional conditional check that disables or enables button use.
 * @param style: button style selected from ButtonStyles.
 * @param state: state object to pass with page routing. ex: map coordinates
 * @returns button component.
 */
export const LinkButton: React.FC<LinkProps> = ({path, children, style="primary", handleClick, disabled, state }) => {
  return (
    !disabled
    ? <Link 
        to={{
          pathname: path,
          state: state
        }}
        className={style} 
        onClick={handleClick} 
      >
        {children}
      </Link>
    : <Button style={style} disabled={disabled}>
        {children}
      </Button>
  );
};
