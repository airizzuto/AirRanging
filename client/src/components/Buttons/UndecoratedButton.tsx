import "./ButtonStyles.scss";

interface Props {
  text: string,
  onClick?: () => void
}

export default function UndecoratedButton({ text, onClick }: Props): JSX.Element {
  return (
    <div className={"undecorated"}>
      <a onClick={onClick}>
        {text}
      </a>
    </div>
  );
}
