import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import userService from '../../../services/userService';
import { UserRegistrationForm } from '../../../types/User/User';
import { userRegistrationSchema } from '../../../validators/userValidators';

import AlertBox from '../../Alerts/AlertBox';

import Style from "./UserRegistration.module.scss";

const UserRegistration = () => {
  const [alert, setAlert] = React.useState("");

  const history = useHistory();

  const handleSubmit = async ({
    username, email, password
  }: UserRegistrationForm) => { 
    setAlert("");
    await userService.register({ username, email, password })
      .then(_ => history.push("/successful"))
      .catch(error => {
        console.log(error.message);
        setAlert(error.message);
        setTimeout(() => setAlert(""), 10000);
      });
  }; 

  return (
    <div className={Style.RegistrationView}>
      <h1 className={Style.RegistrationTitle}>User Registration</h1>

      <hr className={Style.Separator}/>

      <Formik 
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={userRegistrationSchema}
        onSubmit={async (values: UserRegistrationForm, { setSubmitting }: FormikHelpers<UserRegistrationForm>) => {
          await handleSubmit(values);
          setSubmitting(false);
      }}
      >
        {({isSubmitting}) => 
          <Form className={Style.RegistrationForm} autoComplete="on">
            <div className={Style.RegistrationFields}>
              <div className={Style.FormGroup}>
                <label>Username:</label>
                <Field type="text" name="username" placeholder="Username" autoComplete="off"/>
                <ErrorMessage component="span" name="username" />
              </div>

              <div className={Style.FormGroup}>
                <label>Email:</label>
                <Field type="email" name="email" placeholder="Email"/>
                <ErrorMessage component="span" name="email" />
              </div>

              <div className={Style.FormGroup}>
                <label>Password:</label>
                <Field type="password" name="password" placeholder="Password"/>
                <ErrorMessage component="span" name="password" />
              </div>

              <div className={Style.FormGroup}>
                <label>Confirm Password:</label>
                <Field type="password" name="confirmPassword" placeholder="Confirm Password"/>
                <ErrorMessage component="span" name="confirmPassword" />
              </div>
            </div>

            <div className={Style.Alert}>
              <AlertBox alertText={alert}/>
            </div>

            <div className={Style.Terms}>
              <p>
                By clicking "Sign up", you agree to our <Link to="/terms">Terms of Use and Privacy Policy.</Link>
              </p>
            </div>

            <div className={Style.SubmitButton}>
              <button type="submit" disabled={isSubmitting}>
                Sign up
              </button>
            </div>
          </Form>
        }
      </Formik>

    </div>
  );
};

export default UserRegistration;
