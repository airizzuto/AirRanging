import React from "react";

import FixedModal from "../Modals/FixedModal";
import Style from "./Login.module.scss";

interface Props {
  showLogin: boolean,
  handleClose: () => void
}

export default function LoginModal({ showLogin, handleClose }: Props): JSX.Element {


  return (
    <FixedModal
      label="User Login"
      visible={showLogin}
      handleModalClose={handleClose}
    >
      <form className={Style.LoginForm}>
        <div>
          <label>User email </label>
          <input></input>
        </div>
        <div>
          <label>Password </label>
          <input></input>
        </div>
      </form>
    </FixedModal>
  );
}