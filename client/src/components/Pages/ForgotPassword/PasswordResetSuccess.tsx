import { useHistory } from "react-router-dom";
import DecoratedButton from "../../Buttons/DecoratedButton";

import "./PasswordResetSuccess.scss";

const PasswordResetSuccess = () => {
  const history = useHistory();

  return (
    <div className="PasswordResetSuccess">
      <h1>Password has been changed</h1>

      <p>You can now login with your new password.</p>

      <DecoratedButton 
        style={"primary"}
        onClick={() => history.push("/login")}
      >
        Login
      </DecoratedButton>
    </div>
  );
};

export default PasswordResetSuccess;
