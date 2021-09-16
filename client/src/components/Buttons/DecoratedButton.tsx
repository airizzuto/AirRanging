import { ButtonStyles } from "../../types/Buttons/ButtonStyles";

import "../Buttons/ButtonStyles.scss";

interface Props {
  children: React.ReactElement | string;
  backgroundImage?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style: ButtonStyles;
}

const DecoratedButton: React.FC<Props> = ({ children, onClick, disabled, style }) => {
  return (
    <button className={style} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default DecoratedButton;
