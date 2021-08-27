import { useHistory } from "react-router-dom";
import DecoratedButton from "../../Buttons/DecoratedButton";

const EmailConfirmationFail = () => {

  const history = useHistory();

  return (
    <div>
      <p>Email already confirmed or expired.</p>
      <DecoratedButton
        style={"primary"}
        onClick={() => history.push("/login")}
      >
        Login
      </DecoratedButton>
    </div>
  );
};

export default EmailConfirmationFail;
