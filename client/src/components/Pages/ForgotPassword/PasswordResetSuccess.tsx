import { useHistory } from "react-router-dom";
import { Button } from "../../Generics/Buttons/Button";

import "./PasswordResetSuccess.scss";

const PasswordResetSuccess = () => {
  const history = useHistory();

  return (
    <div className="PasswordResetSuccess">
      <h1>Password has been changed</h1>

      <p>You can now login with your new password.</p>

      <Button 
        style={"primary"}
        handleClick={() => history.push("/login")}
      >
        Login
      </Button>
    </div>
  );
};

export default PasswordResetSuccess;
