import Style from "../Buttons/ButtonStyles.module.scss";

interface Props {
  buttonText: string,
  backgroundImage?: string,
  handleClick: () => void
}

export default function DecoratedButton(
  { buttonText, handleClick }: Props
): JSX.Element {
  return (
    <div className={Style.PrimaryButton} onClick={handleClick}>
      {buttonText}
    </div>
  );
}
