
import "./ModalTab.scss";
import "./MenuTab.scss";

type Styles = "ModalTab" | "MenuTab";

interface Props {
  children: React.ReactElement | Array<React.ReactElement> | string;
  handleTabClick: () => void;
  isActive?: boolean;
  style: Styles;
}

const Tab = ({children, handleTabClick, style, isActive=false}: Props): JSX.Element => {
  const activeStyle = isActive ? { color: "#ffbf00" } : {};

  return (
    <button onClick={handleTabClick} className={style} style={activeStyle}>
      {children}
    </button>
  );
};

export default Tab;
