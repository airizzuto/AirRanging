import React from 'react';
import { useHistory } from 'react-router-dom';
import DecoratedButton from '../../Buttons/DecoratedButton';

const EmailVerified: React.FC = (): React.ReactElement => {

  const history = useHistory();

  return (
    <div>
      <p>Email verified. You can now proceed to login.</p>
      <DecoratedButton 
        style={"primary"}
        onClick={() => history.push("/login")}
      >
        Login
      </DecoratedButton>
    </div>
  );
};

export default EmailVerified;
