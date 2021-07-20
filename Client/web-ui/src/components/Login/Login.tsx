import React from "react";

import FixedModal from "../Modals/FixedModal";

interface Props {
  showLogin: boolean,
  handleClose: () => void
}

export default function LoginModal({ showLogin, handleClose }: Props): JSX.Element {


  return (
    <FixedModal
      label="User Login"
      showModal={showLogin}
      handleModalClose={handleClose}
    >
      <form>
        <ul>
          <li>
            <label>User email</label>
            <input></input>
          </li>
          <li>
            <label>Password</label>
          </li>
        </ul>
      </form>
    </FixedModal>
  );
}