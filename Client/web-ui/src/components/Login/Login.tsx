import { Link } from "react-router-dom";
import DecoratedButton from "../Buttons/DecoratedButton";
import FixedModal from "../Modals/FixedModal";

import Style from "./Login.module.scss";
import CheckboxStyle from "../../styles/components/_checkbox.module.scss";

interface Props {
  showLogin: boolean,
  handleClose: () => void
}

export default function LoginModal({ showLogin, handleClose }: Props): JSX.Element {

  const handleClick = () => { return; };

  return (
    <FixedModal
      label="User Login"
      visible={showLogin}
      handleModalClose={handleClose}
    >
      <form className={Style.LoginForm}>

        <div className={Style.LoginFields}>
          <div className={Style.FormGroup}>
            <label>Email:</label>
            <input type="email" name="email"/>
          </div>
          <div className={Style.FormGroup}>
            <label>Password:</label>
            <input type="password" name="password"/>
          </div>
        </div>

        <div className={Style.Options}>
          <div className={Style.RememberMe}>
            <label className={CheckboxStyle.checkbox}>Remember Me
              <input type="checkbox"/>
              <span className={CheckboxStyle.checkmark}></span>
            </label>
          </div>
          <div className={Style.ForgotPassword}>
            <Link to="/forgotpass" onClick={handleClose}>
              Forgot Password?
            </Link>
          </div>
        </div>
        
        <div className={Style.Buttons}>
          <div className={Style.LoginButton}>
            <DecoratedButton onClick={() => handleClick}>Login</DecoratedButton>
          </div>
          <p>OR</p>
          <div className={Style.RegistrationButton}>
            <Link to="/registration" onClick={handleClose}>
              Register
            </Link>
          </div>
        </div>

      </form>
    </FixedModal>
  );
}
