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
    <button className={Style.Decorated} onClick={onClick}>
      {text}
    </button>
  );
}
