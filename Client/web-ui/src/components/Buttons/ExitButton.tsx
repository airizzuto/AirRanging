import Style from "./ButtonStyles.module.scss";

interface Props {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ExitButton: React.FC<Props> = ({ handleClick }) => {

  return (
    <div className={Style.ExitButton}>
      <button onClick={handleClick}>
        X
      </button>
    </div>
  );
};

export default ExitButton;
