import axios from "axios";
import { BASE_URL } from "../constants/globals";

/* Tokens endpoints
/// <summary>
/// Token controller endpoints:
/// <para> RefreshToken  -  POST  -  api/tokens/refresh </para>
/// <para> RevokeToken   -  POST  -  api/tokens/revoke  </para>
/// </summary>
*/

export const refreshToken = async (token: string | null) => {
  const refreshToken = window.localStorage.getItem("user.refreshToken");

  if (!token || !refreshToken) {
    return false;
  }

  const credentials = JSON.stringify({ token: token, refreshToken: refreshToken });

  try {
    const config = {
      headers: { "Content-Type": "application/json" }, 
    };
    const response = await axios.post(
      BASE_URL + "/api/tokens/refresh",
      credentials,
      config,
    );

    if (response.data)
    {
      const newToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;
  
      window.localStorage.setItem("user.token", newToken);
      window.localStorage.setItem("user.refreshToken", newRefreshToken);

      return true;
    }

    return false;
  } catch (ex) {
    console.log("ERROR: refreshing token.", ex.error);
    return false;
  }
};

// TODO: revoke
