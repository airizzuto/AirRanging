import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Style from "./ModalTab.module.scss";

interface Props {
  icon: IconDefinition;
  handleTabClick: () => void;
}

const ModalTab = ({icon, handleTabClick}: Props): JSX.Element => {
  return (
    <button onClick={handleTabClick} className={Style.Tab}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default ModalTab;
