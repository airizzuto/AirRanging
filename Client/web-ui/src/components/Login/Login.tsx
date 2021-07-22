import { Link } from "react-router-dom";
import DecoratedButton from "../Buttons/DecoratedButton";
import FixedModal from "../Modals/FixedModal";
import Style from "./Login.module.scss";

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
        
        <div className={Style.LoginButton}>
          <DecoratedButton buttonText="Login" handleClick={() => handleClick}/>
        </div>

        <div className={Style.Redirection}>
          <Link to="/forgotpass" onClick={handleClose}>
            Forgot Password
          </Link>

          <Link to="/registration" onClick={handleClose}>
            Register
          </Link>
        </div>
      </form>
    </FixedModal>
  );
}