import React from 'react';

import "./SuccessfulRegistration.scss";

const SuccessfulRegistration: React.FC = (): React.ReactElement => {
  return (
    <div className="SuccessfulRegistration">
      <h1>Successful User Registration</h1>

      <p>Please check your email to continue with your registration.</p>
    </div>
  );
};

export default SuccessfulRegistration;
