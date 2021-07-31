import React from "react";
import { Link } from "react-router-dom";
import userService from "../../services/userService";
import aircraftService from "../../services/aircraftService";

import FixedModal from "../Modals/FixedModal";

import Style from "./Login.module.scss";
import CheckboxStyle from "../../styles/components/_checkbox.module.scss";

interface Props {
  showLogin: boolean;
  handleClose: () => void;
  setUser: React.Dispatch<React.SetStateAction<null>>;
}

export default function LoginModal({ showLogin, handleClose, setUser }: Props): JSX.Element {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (event: { 
    preventDefault: () => void; target: { value: React.SetStateAction<string>; }; 
  }) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { 
    preventDefault: () => void; target: { value: React.SetStateAction<string>; };
  }) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleSubmitLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const user = await userService.login({
        email, password
      });

      window.localStorage.setItem(
        "userToken", JSON.stringify(user)
      );
      aircraftService.setToken(user.token);  // For aircraft requests with authentication requirements
      setUser(user);
      // Resets fields
      setEmail("");
      setPassword("");
    } catch (error) {
      // TODO: user error notification
      console.log(error.message);
    }
  };

  return (
    <FixedModal
      label="User Login"
      visible={showLogin}
      handleModalClose={handleClose}
    >
      <form className={Style.LoginForm} onSubmit={handleSubmitLogin}>

        <div className={Style.LoginFields}>
          <div className={Style.FormGroup}>
            <label>Email:</label>
            <input type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className={Style.FormGroup}>
            <label>Password:</label>
            <input type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
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
            <button type="submit" className={Style.LoginButton}>Login</button>
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
