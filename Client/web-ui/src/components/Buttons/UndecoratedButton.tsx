import Style from "./ButtonStyles.module.scss";

interface Props {
  text: string,
  onClick?: () => void
}

export default function UndecoratedButton({ text, onClick }: Props): JSX.Element {
  return (
    <div className={Style.Undecorated}>
      <a onClick={onClick}>
        {text}
      </a>
    </div>
  );
}
