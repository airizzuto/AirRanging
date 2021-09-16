import { Link } from "react-router-dom";
import { ButtonStyles } from "../../types/Buttons/ButtonStyles";

import "../Buttons/ButtonStyles.scss";

interface Props {
  children: React.ReactElement | string,
  path: string,
  style: ButtonStyles
}

const LinkedButton: React.FC<Props> = ({ children, path, style }) => {
  return (
    <Link to={path} className={style}>
      {children}
    </Link>
  );
};

export default LinkedButton;
