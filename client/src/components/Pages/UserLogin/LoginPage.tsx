import React, { Dispatch, SetStateAction } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';

import userService from "../../../services/userService";
import { userLoginSchema } from "../../../validators/userValidators";

import AlertBox from "../../Alerts/AlertBox";

import { UserPublic } from "../../../types/User/User";

import Style from "./Login.module.scss";
import CheckboxStyle from "../../../styles/components/_checkbox.module.scss";
import ExitButton from "../../Buttons/ExitButton";
import { getUserData } from "../../../helpers/userHelper";

interface Props {
  setUser: Dispatch<SetStateAction<UserPublic | null>>;
}

interface Values {
  email: string;
  password: string;
}

const Login: React.FC<Props> = ({ setUser }): React.ReactElement => {
  const [alert, setAlert] = React.useState("");
  const history = useHistory();

  const handleClose = () => {
    history.goBack();
  };

  const handleSubmit = async ({email, password}: Values) => {
    setAlert("");
    await userService.login({ email, password })
      .then(_ => {
        const user = getUserData();
        if (user) {
          setUser(user);
          handleClose();
        }

        setAlert("User email/password combination invalid.");
      })
      .catch(error => {
        console.log(error.message);
        setAlert("An error ocurred when login user.");
        setTimeout(() => setAlert(""), 10000);
      });
  };

  return (
    <div className={Style.LoginContainer}>
      <div className={Style.Login}>
        <div className={Style.LoginHeader}>
          <h1>Login</h1>
          <div className={Style.CloseButton}>
            <ExitButton handleClick={handleClose} />
          </div>
        </div>

        <hr />

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
                    placeholder="Email"
                  />
                </div>
                <div className={Style.FormGroup}>
                  <label htmlFor="password">Password:</label>
                  <ErrorMessage component="span" name="password" />
                  <Field type="password" name="password"
                    placeholder="Password"
                  />
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

              <div className={Style.ErrorNotification}>
                <AlertBox alertText={alert}/>
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
      </div>
    </div>
  );
};

export default Login;
