import axios from "axios";
import { BASE_URL } from "../constants/globals";
import { UserLogin, UserRegistration } from "../types/User/User";

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

    return response.data;
  } catch(error) {
    console.log(error);
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
  
    window.localStorage.setItem("user.username", response.data.username);
    window.localStorage.setItem("user.token", response.data.token);
    window.localStorage.setItem("user.refreshToken", response.data.refreshToken);
  
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// TODO: email confimation

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
