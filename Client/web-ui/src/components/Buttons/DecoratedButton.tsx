import Style from "../Buttons/ButtonStyles.module.scss";

interface Props {
  children: JSX.Element | string,
  backgroundImage?: string,
  onClick: () => void
}

export default function DecoratedButton(
  { children, onClick }: Props
): JSX.Element {
  return (
    <button className={Style.Decorated} onClick={onClick}>
      {children}
    </button>
  );
}
