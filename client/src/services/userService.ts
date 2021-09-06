import axios from "axios";
import { BASE_URL } from "../constants/globals";
import { ForgotPasswordModel, ResetPasswordModel, UserLogin, UserRegistration } from "../types/User/User";

/* Users endpoints
/// <summary>
/// Users authentication and registration model controller endpoints:
/// <para> RegisterUser    -  POST    -  api/users/register     </para>
/// <para> LoginUser       -  POST    -  api/users/login        </para>
/// <para> ConfirmEmail    -  GET     -  api/users/confirmation </para>
/// <para> ForgotPassword  -  POST    -  api/users/forgot       </para>
/// <para> ResetPassword   -  POST    -  api/users/reset        </para>
/// <para> DeleteUser      -  DELETE  -  api/users/5            </para>
/// </summary>
*/

const register = async ({...newUser}: UserRegistration) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const response = await axios.post(
      BASE_URL + "/api/users/register",
      newUser,
      config
    );

    return response.status;
  } catch(error) {
    console.log("ERROR: Registering new user - ",error);
    return error;
  }
};

const login = async (credentials: UserLogin) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const response = await axios.post(
      BASE_URL + "/api/users/login",
      credentials,
      config,
    );
    
    if (response.data) {
      window.localStorage.setItem("user.username", response.data.username);
      window.localStorage.setItem("user.token", response.data.token);
      window.localStorage.setItem("user.refreshToken", response.data.refreshToken);
    }

    return response;
  } catch(error) {
    console.log("ERROR: Login user - ", error);
    return error;
  }
};

// TODO: email confirmation refactor

const forgotPassword = async (model: ForgotPasswordModel) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const response = await axios.post(
      BASE_URL + "/api/users/forgot",
      model,
      config,
    );

    return response.status;
  } catch(error) {
    console.log("ERROR: Sending password reset link - ", error);
    return error;
  }
};


const resetPassword = async (model: ResetPasswordModel) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const response = await axios.post(
      BASE_URL + "/api/users/reset",
      model,
      config
    );

    return response.data;
  } catch (error) {
    console.log("ERROR: Reseting password - ", error);
    return error;
  }
};

const logout = () => {
  window.localStorage.removeItem("user.username");
  window.localStorage.removeItem("user.token");
  window.localStorage.removeItem("user.refreshToken");
};

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout
};
