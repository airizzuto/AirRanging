import DecoratedButton from '../Buttons/DecoratedButton';

import Style from "./UserRegistration.module.scss";

const UserRegistrationView = () => {
  const handleClick = () => { return; }; {/* TODO */}

  return (
    <div className={Style.RegistrationView}>
      <h1 className={Style.RegistrationTitle}>User Registration</h1>

      <hr className={Style.Separator}/>

      <form className={Style.RegistrationForm}>
        <div className={Style.RegistrationFields}>
          <div className={Style.FormGroup}>
            <label>First Name:</label>
            <input type="text" name="FirstName" />
            <span>{/* TODO: Validation output here */}</span>
          </div>

          <div className={Style.FormGroup}>
            <label>Last Name:</label>
            <input type="text" name="LastName" />
            <span>{/* TODO: Validation output here */}</span>
          </div>

          <div className={Style.FormGroup}>
            <label>Email:</label>
            <input type="email" name="Email" />
            <span>{/* TODO: Validation output here */}</span>
          </div>

          <div className={Style.FormGroup}>
            <label>Password:</label>
            <input type="password" name="Password"/>
            <span>{/* TODO: Validation output here */}</span>
          </div>

          <div className={Style.FormGroup}>
            <label>Confirm Password:</label>
            <input type="password" name="ConfirmPassword" />
            <span>{/* TODO: Validation output here */}</span>
          </div>
        </div>

        <div className={Style.SubmitButton}>
          <DecoratedButton onClick={() => handleClick}>
            Submit
          </DecoratedButton>
        </div>
      </form>
    </div>
  );
};

export default UserRegistrationView;
