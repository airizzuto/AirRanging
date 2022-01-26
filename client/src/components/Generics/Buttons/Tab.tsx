
import "./ModalTab.scss";
import "./MenuTab.scss";

type Styles = "ModalTab" | "MenuTab";

interface Props {
  children: React.ReactElement | Array<React.ReactElement> | string;
  handleTabClick: () => void;
  style: Styles;
}

const Tab = ({children, handleTabClick, style}: Props): JSX.Element => {
  return (
    <button onClick={handleTabClick} className={style}>
      {children}
    </button>
  );
};

export default Tab;
