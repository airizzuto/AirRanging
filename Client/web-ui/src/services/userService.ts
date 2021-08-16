import axios from "axios";
import { UserLogin, UserRegistration } from "../types/User/User";

const baseUrl = process.env.REACT_APP_BASEURL;

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
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  return await axios.post(
    baseUrl + "/api/users/register",
    newUser,
    config
  );
};

const login = async (credentials: UserLogin) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const response = await axios.post(
    baseUrl + "/api/users/login",
    credentials,
    config,
  );

  window.localStorage.setItem("user.username", response.data.username);
  window.localStorage.setItem("user.token", response.data.token);
  window.localStorage.setItem("user.refreshToken", response.data.refreshToken);

  return response.data;
};

const logout = () => {
  window.localStorage.removeItem("user.username");
  window.localStorage.removeItem("user.token");
  window.localStorage.removeItem("user.refreshToken");
};

export default {
  register,
  login,
  logout
};
