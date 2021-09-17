import { Link } from "react-router-dom";
import { ButtonStyles } from "../../../types/Buttons/ButtonStyles";

import "./ButtonStyles.scss";

interface ButtonProps {
  children?: React.ReactElement | string;
  backgroundImage?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style: ButtonStyles;
}

interface LinkProps {
  buttonSettings: ButtonProps;
  path: string;
  children?: React.ReactElement | string;
}


export const Button: React.FC<ButtonProps> = ({ children, handleClick, disabled, style }) => {
  return (
    <button className={style} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};

export const LinkButton: React.FC<LinkProps> = ({buttonSettings, path, children}) => {
  return (
    <Button {...buttonSettings}>
      <Link to={path} className={"undecorated"}>
        {children}
      </Link>
    </Button>
  );
};
