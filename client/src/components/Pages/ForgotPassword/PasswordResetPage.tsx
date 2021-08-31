
import { useHistory } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import userService from "../../../services/userService";
import { ResetPasswordForm } from "../../../types/User/User";
import { resetPasswordSchema } from "../../../validators/userValidators";

import "./PasswordReset.scss";

const PasswordResetPage = () => {
  const history = useHistory();

  // url: "/confirmation?token={token}&email={email}"
  const queryParams = new URLSearchParams(window.location.search);
  // extract mail from url query string
  const email = queryParams.get("email");
  // extract token from url url query string
  const token = queryParams.get("token");

  const handleSubmit = async (password: string) => {
    if (email && token && password) 
      await userService.resetPassword({
          password: password,
          token: token,
          email: email
        }).then(() => history.push("/resetsuccess"));
  };

  return (
    <div className="PasswordReset">
      <h1>Enter your new password:</h1>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={resetPasswordSchema}
        onSubmit={async ( values: ResetPasswordForm, { setSubmitting }: FormikHelpers<ResetPasswordForm>) => {
          await handleSubmit(values.password);
          setSubmitting(false);
        }}
      >
        {({isSubmitting}) => 
          <Form className="form">
            <div className="passwordField">
              <label>New Password</label>
              <Field 
                type="password"
                name="password"
                placeholder="New Password"
                disabled={isSubmitting}
              />
              <ErrorMessage component="span" name="password" />
            </div>
            <div className="passwordField">
              <label>Confirm Password</label>
              <Field 
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                disabled={isSubmitting}
              />
              <ErrorMessage component="span" name="confirmPassword" />
            </div>

            <div className="submitButton">
              <button type="submit" disabled={isSubmitting}>
                Accept
              </button>
            </div>
          </Form>
        }
      </Formik>
    </div>
  );
};

export default PasswordResetPage;
