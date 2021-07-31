import axios from "axios";
import { UserLogin } from "../types/User/User";

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

// TODO: logout removes token in cache

const login = async (credentials: UserLogin) => {
  const response = await axios.post(baseUrl + "/api/users/login", credentials);
  return response.data;
};

export default {
  login,
};
