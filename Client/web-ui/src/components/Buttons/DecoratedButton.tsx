import Style from "../Buttons/ButtonStyles.module.scss";

interface Props {
  ButtonText: string,
  // BackgroundImage: String,
}

export default function HeaderButton({ ButtonText }: Props): JSX.Element {
  return (
    <div className={Style.PrimaryButton}>
      {ButtonText}
    </div>
  );
}
