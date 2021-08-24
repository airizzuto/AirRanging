import axios from "axios";
import { BASE_URL } from "../constants/globals";
import { getStoredToken } from "../helpers/tokenHelper";

// FIXME: 401 on request
const getSavedAircraft = async (aircraftId: string) => {
  const config = {
    headers: { Authorization: `bearer ${getStoredToken()}` }
  };

  const response = await axios.get(
    BASE_URL + `/api/bookmarks/${aircraftId}`,
    config
  );

  return response.data;
};

const unsaveAircraft = async (aircraftId: string) => {
  const config = {
    headers: { Authorization: `bearer ${getStoredToken()}` }
  };

  const response = await axios.delete(
    BASE_URL + `/api/bookmarks/${aircraftId}`,
    config
  );

  return response.status;
};

export default {
  getSavedAircraft,
  unsaveAircraft,
};
