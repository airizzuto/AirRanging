import { Link } from "react-router-dom";
import Style from "../Buttons/ButtonStyles.module.scss";

interface Props {
  children: React.ReactElement | string,
  path: string,
}

const LinkedButton: React.FC<Props> = ({ children, path }) => {
  return (
    <Link to={path} className={Style.primary} >
      {children}
    </Link>
  );
};

export default LinkedButton;
