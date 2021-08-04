import jwt from "jsonwebtoken";
import {refreshToken} from "../services/userService";

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwt.decode(token) as {
        exp: number;
    };
    const expirationDatetimeInSeconds = exp * 1000;

    return Date.now() >= expirationDatetimeInSeconds;
  } catch {
    return true;
  }
};

export const isUserAuthenticated = async () => {
  const token = localStorage.getItem("user.token");

  if (token && !isTokenExpired(token)) {
    return true;
  }

  return await refreshToken(JSON.stringify(token));
};
