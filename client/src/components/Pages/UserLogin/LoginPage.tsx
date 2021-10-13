import React, { Dispatch, SetStateAction, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';

import userService from "../../../services/userService";
import { userLoginSchema } from "../../../validators/userValidators";
import { getUserData } from "../../../helpers/userHelper";
import { UserPublic } from "../../../types/User/User";

import AlertBox from "../../Generics/Alerts/AlertBox";

import Style from "./Login.module.scss";
import CheckboxStyle from "../../../styles/components/_checkbox.module.scss";
import { Button, LinkButton } from "../../Generics/Buttons/Button";
import ModalHeader from "../../Generics/Modals/ModalHeader";

interface Props {
  setUser: Dispatch<SetStateAction<UserPublic | null>>;
}

interface Values {
  email: string;
  password: string;
}

const Login: React.FC<Props> = ({ setUser }): React.ReactElement => {
  const [alert, setAlert] = useState("");
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
        setTimeout(() => setAlert(""), 10000);
      })
      .catch(error => {
        console.log(error.message);
        setAlert("An error ocurred when login user.");
        setTimeout(() => setAlert(""), 10000);
      });
  };

  return (
    <div className={Style.Container}>
      <div className={Style.Login}>
        <ModalHeader
          headerTitle={"Login"}
          handleClose={handleClose} 
        />

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
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    style={"primary"}
                  >
                    Login
                  </Button>
                </div>
                <span>- OR -</span>
                <LinkButton path="/registration" handleClick={handleClose} style={"undecorated"}>
                  Register
                </LinkButton>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
