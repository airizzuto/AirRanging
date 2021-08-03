import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import userService from '../../../services/userService';
import { UserRegistration } from '../../../types/User/User';
import { userRegistrationSchema } from '../../../validators/userValidators';

import Style from "./UserRegistration.module.scss";

interface Values {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const UserRegistrationView = () => {
  const handleSubmit = async ({
    username, email, password
  }: UserRegistration) => { 
    try {
      await userService.register({ username, email, password });

      // TODO: redirect to confirmation?
    } catch(error) {
      console.log(error.message);
    }
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
        onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          await handleSubmit(values);
          setSubmitting(false);
      }}
      >
        {({isSubmitting}) => 
          <Form className={Style.RegistrationForm}>
          <div className={Style.RegistrationFields}>
            <div className={Style.FormGroup}>
              <label>Username:</label>
              <Field type="text" name="username" placeholder="Username"/>
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

          <div className={Style.SubmitButton}>
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </div>
        </Form>
        }
      </Formik>
    </div>
  );
};

export default UserRegistrationView;
