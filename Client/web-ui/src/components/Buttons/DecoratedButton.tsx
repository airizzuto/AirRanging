import Style from "../Buttons/ButtonStyles.module.scss";

interface Props {
  text: string,
  backgroundImage?: string,
  onClick: () => void
}

export default function DecoratedButton(
  { text, onClick }: Props
): JSX.Element {
  return (
    <div className={Style.PrimaryButton} onClick={onClick}>
      {text}
    </div>
  );
}
