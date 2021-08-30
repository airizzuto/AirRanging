
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
  // extract mail from url
  const email = queryParams.get("email");
  // extract token from url
  const token = queryParams.get("token");

  const handleSubmit = async (newPassword: string) => {
    (email && token && newPassword) 
      ? await userService.resetPassword({
          password: newPassword,
          token: token,
          email: email
        }).then(() => history.push("/resetsuccessful"))
      : console.log("ERROR: reset password failed.");
  };

  return (
    <div className="PasswordReset">
      <h1>Enter your new password:</h1>
      <Formik
        initialValues={{
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={resetPasswordSchema}
        onSubmit={async ( values: ResetPasswordForm, { setSubmitting }: FormikHelpers<ResetPasswordForm>) => {
          await handleSubmit(values.newPassword);
          setSubmitting(false);
        }}
      >
        {({isSubmitting}) => 
          <Form>
            <div>
              <label>New Password</label>
              <Field 
                type="password"
                name="password"
                placeholder="New Password"
                disabled={isSubmitting}
              />
              <ErrorMessage component="span" name="password" />
            </div>
            <div>
              <label>Confirm Password</label>
              <Field 
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                disabled={isSubmitting}
              />
              <ErrorMessage component="span" name="confirmPassword" />
            </div>

            <div className={"SubmitButton"}>
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
