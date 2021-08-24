import ButtonStyle from "../Buttons/ButtonStyles.module.scss";

type Style = "primary" | "danger" | "exit" | "undecorated";

interface Props {
  children: React.ReactElement | string;
  backgroundImage?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style: Style;
}

const DecoratedButton: React.FC<Props> = ({ children, onClick, disabled, style }) => {
  return (
    <button className={ButtonStyle[style]} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default DecoratedButton;
