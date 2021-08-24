
const useModalToggle = (
  setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>,
  display: boolean
) => {
  setDisplayModal(display ? false : true);
};

export { useModalToggle };
