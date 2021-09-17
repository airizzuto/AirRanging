import { useHistory } from "react-router-dom";

import { Button } from "../../Generics/Buttons/Button";

import "./EmailConfirmationFail.scss";

const EmailConfirmationFail = () => {

  const history = useHistory();

  return (
    <div className="EmailConfirmationFail">
      <p>Email already confirmed or expired.</p>

      <Button
        style={"primary"}
        handleClick={() => history.push("/login")}
      >
        Login
      </Button>
    </div>
  );
};

export default EmailConfirmationFail;
