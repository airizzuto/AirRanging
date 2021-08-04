import axios from "axios";
import { UserLogin, UserRegistration } from "../types/User/User";
import { isTokenExpired } from "../helpers/tokenHelper";

const baseUrl = process.env.REACT_APP_BASEURL;

/*
/// <summary>
/// Users authentication and registration model controller endpoints:
/// <para> RegisterUser    - POST    api/users/register     </para>
/// <para> LoginUser       - POST    api/users/login        </para>
/// <para> ConfirmEmail    - GET     api/users/confirmation </para>
/// <para> ForgotPassword  - POST    api/users/forgot       </para>
/// <para> ResetPassword   - POST    api/users/reset        </para>
/// <para> DeleteUser      - DELETE  api/users/5            </para>
/// </summary>
*/

const register = async ({...newUser}: UserRegistration) => {
  return await axios.post(baseUrl + "/api/users/register", newUser);
};

const login = async (credentials: UserLogin) => {
  const response = await axios.post(baseUrl + "/api/users/login", credentials);
  window.localStorage.setItem("user", JSON.stringify(response.data));

  return response.data;
};

const isUserAuthenticated = () => {
  const token = localStorage.getItem("user.token");

  if (token && !isTokenExpired(token)) {
    return true;
  }

  return false;
};

const logout = () => {
  window.localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout
};
