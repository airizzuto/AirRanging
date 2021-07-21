import Style from "./ModalTab.module.scss";

interface Props {
  label: string,
  handleTabClick: () => void
}

const ModalTab = ({label, handleTabClick}: Props): JSX.Element => {
  return (
    <button onClick={handleTabClick} className={Style.Tab}>
      <p>{label}</p>
      <div className={Style.Arrow}>&#9658;</div>
    </button>
  );
};

export default ModalTab;
