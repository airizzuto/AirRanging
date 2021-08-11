import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;

/* Tokens endpoints
/// <summary>
/// Token controller endpoints:
/// <para> RefreshToken  -  POST  -  api/tokens/refresh </para>
/// <para> RevokeToken   -  POST  -  api/tokens/revoke  </para>
/// </summary>
*/

export const refreshToken = async (token: string | null) => {
  const refreshToken = localStorage.getItem("user.refreshToken");

  if (!token || !refreshToken) {
    return false;
  }

  const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

  let isRefreshSuccess: boolean;
  try {
    const config = {
      headers: { "Content-Type": "application/json" }, 
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

    isRefreshSuccess = true;
  } catch (ex) {
    isRefreshSuccess = false;
  }

  return isRefreshSuccess;
};

// TODO: revoke on refresh token expiration
