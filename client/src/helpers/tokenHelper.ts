import jwt from "jsonwebtoken";
import {refreshToken} from "../services/tokenService";
import userService from "../services/userService";

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwt.decode(token) as {
        exp: number;
    };
    // Converts api token expiration time from seconds to milliseconds to be comparable to that of Date.now()
    const expirationDatetimeInMilliseconds = exp * 100;
    const isExpired = Date.now() >= expirationDatetimeInMilliseconds;

    return isExpired;
  } catch {
    return true;
  }
};

export const isUserAuthenticated = async (): Promise<boolean> => {
  const token = getStoredToken();

  if (token && !isTokenExpired(token)) {
    return true;
  }

  const isRefreshSuccess = await refreshToken(token);
  if (!isRefreshSuccess) {
    userService.logout();
    return false;
  }

  return isRefreshSuccess;
};

export const getStoredToken = (): string | null => {
  return window.localStorage.getItem("user.token");
};
