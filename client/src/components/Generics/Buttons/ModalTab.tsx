
import Style from "./ModalTab.module.scss";

interface Props {
  children: React.ReactElement | Array<React.ReactElement>;
  handleTabClick: () => void;
}

const TabButton = ({children, handleTabClick}: Props): JSX.Element => {
  return (
    <button onClick={handleTabClick} className={Style.Tab}>
      {children}
    </button>
  );
};

export default TabButton;
