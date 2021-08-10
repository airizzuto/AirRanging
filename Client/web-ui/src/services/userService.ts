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
  window.localStorage.setItem("user", JSON.stringify(response.data));

  return response.data;
};

const logout = () => {
  window.localStorage.removeItem("user");
};


/* Tokens endpoints
/// <summary>
/// Token controller endpoints:
/// <para> RefreshToken  -  POST  -  api/tokens/refresh </para>
/// <para> RevokeToken   -  POST  -  api/tokens/revoke  </para>
/// </summary>
*/

export const refreshToken = async (token: string) => {
  const refreshToken = localStorage.getItem("user.refreshToken");

  if(!token || !refreshToken) {
    return false;
  }

  const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

  try {
    const config = {
      headers: { "Content-Type": "application/json" }, 
      observe: "response"
    };

    const response = await axios.post(
      baseUrl + "/api/tokens/refresh",
      credentials,
      config,
    );
    const newToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;
    localStorage.setItem("user.token", newToken);
    localStorage.setItem("user.refreshToken", newRefreshToken);

    return true;
  } catch (ex) {
    return false;
  }
};

// TODO: revoke on refresh token expiration

export default {
  register,
  login,
  logout
};
