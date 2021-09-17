import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../../Generics/Buttons/Button';

import "./EmailConfirmation.scss";

const EmailConfirmation: React.FC = (): React.ReactElement => {

  const history = useHistory();

  return (
    <div className={"EmailConfirmation"}>
      <p>Email verified. You can now proceed to login.</p>
      <Button 
        style={"primary"}
        handleClick={() => history.push("/login")}
      >
        Login
      </Button>
    </div>
  );
};

export default EmailConfirmation;
