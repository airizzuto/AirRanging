import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, FormikHelpers } from 'formik';

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
                <Field type="email" name="email"
                  placeholder={"useremail@emailprovider.com"}
                />
              </div>
              <div className={Style.FormGroup}>
                <label htmlFor="password">Password:</label>
                <Field type="password" name="password" />
              </div>
            </div>

            <div className={Style.Options}>
              <div className={Style.RememberMe}>
                <label className={CheckboxStyle.checkbox}>Remember Me
                  <Field type="checkbox" name="rememberme"/>
                  <span className={CheckboxStyle.checkmark}></span>
                </label>
              </div>
              <div className={Style.ForgotPassword}>
                <Link to="/forgotpass" onClick={handleClose}>
                  Forgot Password?
                </Link>
              </div>
            </div>

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
              <p>OR</p>
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
