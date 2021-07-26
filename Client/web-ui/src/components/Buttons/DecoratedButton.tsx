import Style from "../Buttons/ButtonStyles.module.scss";

interface Props {
  buttonText: string,
  backgroundImage?: string,
  onClick: () => void
}

export default function DecoratedButton(
  { buttonText, onClick }: Props
): JSX.Element {
  return (
    <div className={Style.PrimaryButton} onClick={onClick}>
      {buttonText}
    </div>
  );
}
