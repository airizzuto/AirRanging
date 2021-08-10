import { string, object, SchemaOf, ref } from 'yup';
import { UserLogin, UserRegistration } from '../types/User/User';

// TODO: Yup docs https://github.com/jquense/yup

// TODO: test validators

const isValidEmail = string()
  .email("Invalid email format")
  .defined("Email is required");

export const userLoginSchema: SchemaOf<UserLogin> = object({
  email: isValidEmail,
  password: string()
    .matches(new RegExp("^[a-zA-Z0-9_-]{4,16}$"), "Invalid password format")
    .defined("Password is required"),
}).defined();

export const userRegistrationSchema: SchemaOf<UserRegistration> = object().shape({
  email: isValidEmail,
  username: string()
    .min(4, "Username must be of at least 4 characters")
    .max(16, "Username must be of no more than 16 characters")
    .matches(new RegExp("^[a-zA-Z0-9_-]{4,16}$"),
      "Username can only contain alphanumeric characters")
    .defined("Username is required"),
  password: string()
    .min(8, "Password must be of at least 8 characters")
    .max(20, "Password must be of no more than 20 characters")
    .matches(new RegExp("^[a-zA-Z0-9_-]{4,16}$"),
      "Password must contain at least one digit, one uppercase letter and one lowercase letter")
    .defined("Password is required"),
  confirmPassword: string()
    .equals([ref("password")], "Passwords do not match")
    .defined("Password confirmation is required"),
}).defined();
