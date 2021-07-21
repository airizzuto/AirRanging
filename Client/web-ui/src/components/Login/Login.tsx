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

        <div>
          <label>
            Email:
            <input type="email" name="email"/>
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" name="password"/>
          </label>
        </div>

        <div className={Style.ForgotPass}>
          <Link to="/forgotpass" onClick={handleClose}>
            Forgot Password?
          </Link>
        </div>

        <DecoratedButton buttonText="Login" handleClick={() => handleClick}/>
      </form>
    </FixedModal>
  );
}