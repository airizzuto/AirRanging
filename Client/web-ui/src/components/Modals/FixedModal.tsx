import DecoratedButton from "../Buttons/DecoratedButton";

import ExitButton from "../Buttons/ExitButton";

import Style from "./FixedModal.module.scss";

interface Props {
  label: string,
  visible: boolean,
  handleModalClose: () => void,
  children: JSX.Element
}

export default function Modal({
  label, visible, handleModalClose, children
}: Props): JSX.Element {
  const showHideClassName = visible ? { display: "grid" } : { display: "none" };

  return (
    <div className={Style.Modal} style={showHideClassName}>
      <div className={Style.ModalMain}>
        <div className={Style.ModalHeader}>
          <h1 className={Style.ModalTitle}>{label}</h1>
          <div className={Style.CloseButton}>
            <ExitButton handleClick={handleModalClose} />
          </div>
        </div>

        <hr className={Style.Separator}/>

        <div className={Style.ModalContent}>
          {children}
        </div>

        <div>
          <DecoratedButton ButtonText="Accept" />
        </div>
      </div>
    </div>
  );
}
