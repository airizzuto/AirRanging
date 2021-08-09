import { Link } from "react-router-dom";
import Style from "../Buttons/ButtonStyles.module.scss";

interface Props {
  children: JSX.Element | string,
  path: string,
}

export default function LinkedButton(
  { children, path }: Props
): JSX.Element {
  return (
    <Link to={path} className={Style.Decorated} >
      {children}
    </Link>
  );
}
