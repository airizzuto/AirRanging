
import { AircraftData } from "../types/Aircraft/Aircraft";
import { UserPublic } from "../types/User/User";

export const getUserData = (): UserPublic | null => {
  const user = window.localStorage.getItem("user.username");

  return user ? { username: user } : null;
};

export const isUserOwner =  (aircraft: AircraftData): boolean => {
  return getUserData()?.username === aircraft.authorUsername;
};
