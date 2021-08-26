
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useHistory } from 'react-router-dom';
import userService from '../../../services/userService';
import { ForgotPasswordModel } from '../../../types/User/User';
import { forgotPasswordSchema } from '../../../validators/userValidators';

import "./ForgotPassword.scss";

const ForgotPassword = () => {

  const history = useHistory();

  const handleSubmit = async (resetModel: ForgotPasswordModel) => {
    await userService.forgotPassword(resetModel);
    history.push("/resetsent");
  };

  return (
    <div className="ForgotPassword">
      <h1>Reset password</h1>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={async ( values: ForgotPasswordModel, { setSubmitting }: FormikHelpers<ForgotPasswordModel>) => {
          await handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({isSubmitting}) => 
          <Form>
            <div>
              <label>Email</label>
              <Field 
                type="email"
                name="email"
                placeholder="Email Address"
                disabled={isSubmitting}
              />
              <ErrorMessage component="span" name="email" />
            </div>

            <div className={"SubmitButton"}>
              <button type="submit" disabled={isSubmitting}>
                Reset
              </button>
            </div>
          </Form>
        }
      </Formik>
    </div>
  );
};

export default ForgotPassword;