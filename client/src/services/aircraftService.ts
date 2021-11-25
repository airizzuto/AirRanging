import axios from "axios";
import { BASE_URL } from "../constants/globals";
import { getStoredToken, isUserAuthenticated } from "../helpers/tokenHelper";
import { AircraftWithSocials, CloneAircraft, AircraftWithoutIDs } from "../types/Aircraft/Aircraft";
import { FilterSearch } from "../types/Aircraft/Filter";
import { buildStringEndpoint } from "../utils/stringBuilder";

const getAllAircrafts = async () => {
  const response = await axios.get(
    BASE_URL + "/api/aircrafts"
  );

  return response;
};

const getAircraftById = async (aircraftId: string) => {
  const response = await axios.get(
    BASE_URL + `/api/aircrafts/${aircraftId}`
  );

  return response;
};

const getAircraftsOwnedByUser = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getStoredToken()}` },
  };

  const urlOptions = {
    baseUrl: BASE_URL!,
    slug: `/api/aircrafts/owned`,
  };

  const url = buildStringEndpoint(urlOptions);

  const response = await axios.get(
    url,
    config
  );

  return response;
};

const getAircraftsSavedByUser = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getStoredToken()}` }
  };

  const urlOptions = {
    baseUrl: BASE_URL!,
    slug: `/api/aircrafts/saved`,
  };

  const url = buildStringEndpoint(urlOptions);

  const response = await axios.get(
    url,
    config
  );

  return response;
};

const searchAircrafts = async (filter: FilterSearch) => {
  const config = {
    headers: { Authorization: `Bearer ${getStoredToken()}` }
  };

  const urlOptions = {
    baseUrl: BASE_URL!,
    slug: `/api/aircrafts/`,
    filters: `${filter.set}?${filter.searchField}=${filter.search}`
  };

  const url = buildStringEndpoint(urlOptions);

  // TODO: multi-query
  const response = await axios.get(
    url,
    config
  );

  return response;
};

const createAircraft = async (newAircraft: AircraftWithoutIDs) => {
  try {
    if (await isUserAuthenticated()) {
      const config = {
        headers: { Authorization: `Bearer ${getStoredToken()}` },
      };

      const response = await axios.post(
        BASE_URL + "/api/aircrafts/create",
        newAircraft,
        config
      );
  
      return response.data;
    }
  } catch(error) {
    console.log(error);
  }
};

const saveAircraft = async (aircraftId: string) => {
  try {
    if (await isUserAuthenticated()) {
      const config = {
        headers: { Authorization: `Bearer ${getStoredToken()}` },
      };
      
      const response = await axios.post(
        BASE_URL + "/api/bookmarks",
        {aircraftId: aircraftId},
        config
      );

      return response;
    }
  } catch(error) {
    return error;
  }
};

const unsaveAircraft = async (aircraftId: string) => {
  try {
    if (await isUserAuthenticated()) {
      const config = {
        headers: { Authorization: `Bearer ${getStoredToken()}` },
      };
    
      const response = await axios.delete(
        BASE_URL + `/api/bookmarks/${aircraftId}`,
        config
      );
    
      return response.status;
    }
  } catch(error) {
    return error;
  }
};

const editAircraft = async (aircraftId: string, aircraftUpdated: AircraftWithSocials) => {
  const config = {
    headers: { Authorization: `Bearer ${getStoredToken()}` },
  };

  const response = await axios.put(
    BASE_URL + `/api/aircrafts/${aircraftId}`,
    {...aircraftUpdated},
    config
  );

  return response;
};

const deleteAircraft = async (aircraftId: string) => {
  const config = {
    headers: { Authorization: `Bearer ${getStoredToken()}` },
  };

  const response = await axios.delete(
    BASE_URL + `/api/aircrafts/${aircraftId}`,
    config
  );

  return response;
};

const cloneAircraft = async (aircraft: CloneAircraft) => {
  const config = {
    headers: { Authorization: `Bearer ${getStoredToken()}` },
  };

  const response = await axios.post(
    BASE_URL + `/api/aircrafts/`,
    aircraft,
    config
  );

  return response;
};


export default {
  getAllAircrafts,
  getAircraftById,
  getAircraftsOwnedByUser,
  getAircraftsSavedByUser,
  searchAircrafts,
  createAircraft,
  saveAircraft,
  unsaveAircraft,
  editAircraft,
  deleteAircraft,
  cloneAircraft,
};
