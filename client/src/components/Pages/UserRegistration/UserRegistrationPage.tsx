import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';
import userService from '../../../services/userService';
import { UserRegistrationForm } from '../../../types/User/User';
import { userRegistrationSchema } from '../../../validators/userValidators';

import AlertBox from '../../Generics/Alerts/AlertBox';

import Style from "./UserRegistration.module.scss";
import FieldGroup from '../../Generics/FormGroups/FieldGroup';

const UserRegistration = () => {
  const [alert, setAlert] = React.useState("");

  const history = useHistory();

  const handleSubmit = async ({
    username, email, password
  }: UserRegistrationForm) => { 
    setAlert("");
    await userService.register({ username, email, password })
      .then(response => {
        if (response === 200) {
          history.push("/successful");
        }
      }) // TODO: test if routes in fail
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
              <FieldGroup 
                label="Username" type="text" autoComplete="off"
                placeholder="Username"
                valueName="username"
              />

              <FieldGroup 
                label="Email" type="email"
                placeholder="Email"
                valueName="email"
              />

              <FieldGroup 
                label="Password" type="password"
                placeholder="Password"
                valueName="password"
              />

              <FieldGroup 
                label="Confirm Password" type="password"
                placeholder="Confirm Password"
                valueName="confirmPassword"
              />
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
