import "./ButtonStyles.scss";

interface Props {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ExitButton: React.FC<Props> = ({ handleClick }) => {

  return (
    <div className={"exit"}>
      <button onClick={handleClick}>
        X
      </button>
    </div>
  );
};

export default ExitButton;
