import axios from "axios";
import { BASE_URL } from "../constants/globals";
import { getStoredToken } from "../helpers/tokenHelper";

const unsaveAircraft = async (aircraftId: string) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getStoredToken()}` }
    };
  
    const response = await axios.delete(
      BASE_URL + `/api/bookmarks/${aircraftId}`,
      config
    );
  
    return response.data;
  } catch(error) {
    console.log(error);
  }
};

export default {
  unsaveAircraft,
};
