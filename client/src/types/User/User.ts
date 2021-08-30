
export interface UserPublic {
  username: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegistration {
  username: string;
  email: string;
  password: string;
}

export interface UserRegistrationForm extends UserRegistration {
  confirmPassword: string;
}

export interface ForgotPasswordModel {
  email: string;
}

export interface ResetPasswordForm {
  newPassword: string;
  confirmNewPassword: string;
  // isSuccess: boolean;
}

export interface ResetPasswordModel {
  password: string,
  email: string,
  token: string,
}
