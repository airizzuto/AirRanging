import React from "react";

const LoginModal = (): JSX.Element => {
  return(
    <div>
      <h1>User Login</h1>
      <form>
        <ul>
          <li>
            <label>User email</label>
            <input ></input>
          </li>
          <li>
            <label>Password</label>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default LoginModal;
