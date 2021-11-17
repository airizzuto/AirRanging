
import Style from "./ModalTab.module.scss";

interface Props {
  children: React.ReactElement | Array<React.ReactElement>;
  handleTabClick: () => void;
  label: string;
}

const TabButton = ({children, handleTabClick, label}: Props): JSX.Element => {
  return (
    <button onClick={handleTabClick} className={Style.Tab}>
      <span>{label}</span> {children}
    </button>
  );
};

export default TabButton;
