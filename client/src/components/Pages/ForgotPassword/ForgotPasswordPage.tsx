
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useHistory } from 'react-router-dom';
import userService from '../../../services/userService';
import { ForgotPasswordModel } from '../../../types/User/User';
import { forgotPasswordSchema } from '../../../validators/userValidators';
import { Button } from '../../Generics/Buttons/Button';

import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const history = useHistory();

  const handleSubmit = async (resetModel: ForgotPasswordModel) => {
    if (resetModel)
      await userService.forgotPassword(resetModel)
        .then(() => history.push("/resetsent"));
  };

  return (
    <div className="ForgotPassword">
      <h1>Reset password</h1>

      <p>Enter the email address that you used to register your user. We will send you a message with a link to reset your password.</p>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={async ( values: ForgotPasswordModel, { setSubmitting }: FormikHelpers<ForgotPasswordModel>) => {
          await handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({isSubmitting}) => 
          <Form className="form">
            <div className="emailField">
              <label>Email:</label>
              <Field 
                type="email"
                name="email"
                placeholder="Email Address"
                disabled={isSubmitting}
              />
              <ErrorMessage component="span" name="email" />
            </div>

            <div className="submitButton">
              <Button type="submit" disabled={isSubmitting} style={"primary"}>
                Submit
              </Button>
            </div>
          </Form>
        }
      </Formik>
    </div>
  );
};

export default ForgotPassword;
