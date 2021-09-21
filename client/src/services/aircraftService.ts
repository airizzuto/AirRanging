import axios from "axios";
import { BASE_URL } from "../constants/globals";
import { getStoredToken, isUserAuthenticated } from "../helpers/tokenHelper";
import { AircraftData, CloneAircraft, NewAircraft } from "../types/Aircraft/Aircraft";

const getAllAircrafts = async () => {
  const response = await axios.get(
    BASE_URL + "/api/aircrafts"
  );

  return response;
};

const getAllAircraftsPaginated = async () => {
  const response = await axios.get(
    BASE_URL + "/api/aircrafts/paginated"
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

  const response = await axios.get(
    BASE_URL + "/api/aircrafts/owned",
    config
  );

  return response;
};

const getAircraftsSavedByUser = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getStoredToken()}` }
  };
  
  const response = await axios.get(
    BASE_URL + `/api/bookmarks/saved`,
    config
  );

  return response;
};

const searchAircraftByModel = async (query: string) => {
  const response = await axios.get(
    BASE_URL + `/api/aircrafts/search?Model=${query}`
  );

  return response;
};

const createAircraft = async (newAircraft: NewAircraft) => {
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

const editAircraft = async (aircraftId: string, aircraftUpdated: AircraftData) => {
  const config = {
    headers: { Authorization: `Bearer ${getStoredToken()}` },
  };

  const response = await axios.put(
    BASE_URL + `/api/aircrafts/${aircraftId}`,
    {aircraftId, aircraftUpdated},
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
  getAllAircraftsPaginated,
  getAircraftById,
  getAircraftsOwnedByUser,
  getAircraftsSavedByUser,
  searchAircraftByModel,
  createAircraft,
  saveAircraft,
  unsaveAircraft,
  editAircraft,
  deleteAircraft,
  cloneAircraft,
};
