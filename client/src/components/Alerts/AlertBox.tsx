
import Style from "./AlertBox.module.scss";

interface Props {
  alertText: string | undefined;
}

export default function AlertBox({ alertText }: Props): JSX.Element | null {
  if (!alertText) {
    return null;
  }

  return (
    <div className={Style.AlertBox}>
      <span>{alertText}</span>
    </div>
  );
}
