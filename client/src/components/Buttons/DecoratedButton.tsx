import Style from "../Buttons/ButtonStyles.module.scss";

interface Props {
  children: React.ReactElement | string;
  backgroundImage?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const DecoratedButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button className={Style.Decorated} onClick={onClick}>
      {children}
    </button>
  );
};

export default DecoratedButton;
