import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';

import userService from "../../services/userService";
import aircraftService from "../../services/aircraftService";

import FixedModal from "../Modals/FixedModal";

import Style from "./Login.module.scss";
import CheckboxStyle from "../../styles/components/_checkbox.module.scss";
import { userLoginSchema } from "../../validators/userValidators";

interface Props {
  showLogin: boolean;
  handleClose: () => void;
  setUser: React.Dispatch<React.SetStateAction<null>>;
}

interface Values {
  email: string;
  password: string;
}

export default function LoginModal({ showLogin, handleClose, setUser }: Props): JSX.Element {
  // TODO: const [notifyError, setNotifyError] = React.useState(false);
  // TODO: error show effect and timeout
  const handleSubmit = async ({email, password}: Values) => {
    try {
      const user = await userService.login({ email, password });

      window.localStorage.setItem("userToken", JSON.stringify(user));
      aircraftService.setToken(user.token);  // For aircraft requests with authentication requirements
      setUser(user);
    } catch (error) {
      // TODO: user error notification
      console.log(error.message);
    }
  };

  return (
    <FixedModal
      label="User Login"
      visible={showLogin}
      handleModalClose={handleClose}
    >
      <Formik 
        initialValues={{ email: "", password: ""}}
        validationSchema={userLoginSchema}
        onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          await handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({isSubmitting}) => (
          <Form className={Style.LoginForm}>

            <div className={Style.LoginFields}>
              <div className={Style.FormGroup}>
                <label htmlFor="email">Email:</label>
                <ErrorMessage component="span" name="email" />
                <Field type="email" name="email"
                  placeholder={"Email"}
                />
              </div>
              <div className={Style.FormGroup}>
                <label htmlFor="password">Password:</label>
                <ErrorMessage component="span" name="password" />
                <Field type="password" name="password"
                  placeholder={"Password"}
                />
              </div>
            </div>

            <div className={Style.Options}>
              <div className={Style.RememberMe}>
                <label className={CheckboxStyle.checkbox}>
                  <p><Field type="checkbox" name="rememberme"/>Remember Me</p>
                  <span className={CheckboxStyle.checkmark}></span>
                </label>
              </div>
              <div className={Style.ForgotPassword}>
                <Link to="/forgotpass" onClick={handleClose}>
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* TODO: Error notification component */}

            <div className={Style.Buttons}>
              <div className={Style.LoginButton}>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={Style.LoginButton}
                >
                  Login
                </button>
              </div>
              <span>- OR -</span>
              <div className={Style.RegistrationButton}>
                <Link to="/registration" onClick={handleClose}>
                  Register
                </Link>
              </div>
            </div>

          </Form>

        )}
      </Formik>
      
    </FixedModal>
  );
}
