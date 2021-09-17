import { Link } from "react-router-dom";
import { ButtonStyles } from "../../../types/Buttons/ButtonStyles";

import "./ButtonStyles.scss";

interface ButtonProps {
  children?: React.ReactElement | string;
  backgroundImage?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  style: ButtonStyles;
}

interface LinkProps {
  path: string;
  handleClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children?: React.ReactElement | string;
  style: ButtonStyles;
}


export const Button: React.FC<ButtonProps> = ({ children, handleClick, disabled, type, style }) => {
  return (
    <button className={style} onClick={handleClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

export const LinkButton: React.FC<LinkProps> = ({path, children, style, handleClick}) => {
  return (
    <Link to={path} className={style} onClick={handleClick}>
      {children}
    </Link>
  );
};
