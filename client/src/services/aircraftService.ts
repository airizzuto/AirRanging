import axios from "axios";
import { BASE_URL } from "../constants/globals";
import { getStoredToken, isUserAuthenticated } from "../helpers/tokenHelper";
import { AircraftData, NewAircraft } from "../types/Aircraft/Aircraft";

const getAllAircrafts = async () => {
  try {
    const response = await axios.get(
      BASE_URL + "/api/aircrafts"
    );

    return response.data;
  } catch(error) {
    console.log("ERROR: Retrieving all aircrafts - ", error);
  }
};

const getAllAircraftsPaginated = async () => {
  try {
    const response = await axios.get(
      BASE_URL + "/api/aircrafts/paginated"
    );

    return response.data;
  } catch(error) {
    console.log(error);
  }
};

const getAircraftById = async (aircraftId: string) => {
  try {
    const response = await axios.get(
      BASE_URL + `/api/aircrafts/${aircraftId}`
    );

    return response.data;
  } catch(error) {
    console.log(error);
  }
};

const getAircraftsOwnedByUser = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getStoredToken()}` },
    };

    const response = await axios.get(
      BASE_URL + "/api/aircrafts/owned",
      config
    );
  
    return response.data;
  } catch(error) {
    console.log(error);
  }
};

const getAircraftsSavedByUser = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getStoredToken()}` }
    };
    
    const response = await axios.get(
      BASE_URL + `/api/bookmarks/saved`,
      config
    );
  
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const searchAircraftByModel = async (query: string) => {
  try {
    const response = await axios.get(
      BASE_URL + `/api/aircrafts/search?Model=${query}`
    );
  
    return response.data;
  } catch(error) {
    console.log(error);
  }
};

const createAircraft = async (newAircraft: NewAircraft) => {
  try {
    if (await isUserAuthenticated()) {
      const config = {
        headers: [
          { Authorization: `Bearer ${getStoredToken()}` },
        ]
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
        headers: [
          { Authorization: `Bearer ${getStoredToken()}` },
        ]
      };
      
      //FIXME: error parsing payload data
      const response = await axios.post(
        BASE_URL + "/api/bookmarks",
        aircraftId,
        config
      );

      // return response.status;
      return response.data;
    }
  } catch(error) {
    console.log(error);
  }
};

const unsaveAircraft = async (aircraftId: string) => {
  try {
    if (await isUserAuthenticated()) {
      const config = {
        headers: [
          { Authorization: `Bearer ${getStoredToken()}` },
        ]
      };
    
      const response = await axios.delete(
        BASE_URL + `/api/bookmarks/${aircraftId}`,
        config
      );
    
      // return response.status;
      return response.data;
    }
  } catch(error) {
    console.log(error);
  }
};

const editAircraft = async (aircraftId: string, aircraftUpdated: AircraftData) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getStoredToken()}` },
    };
  
    const response = await axios.put(
      BASE_URL + `/api/aircrafts/${aircraftId}`,
      {aircraftId, aircraftUpdated},
      config
    );
  
    // return response.status;
    return response.data;
  } catch(error) {
    console.log(error);
  }
};

const deleteAircraft = async (aircraftId: string) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getStoredToken()}` },
    };
  
    const response = await axios.delete(
      BASE_URL + `/api/aircrafts/${aircraftId}`,
      config
    );
  
    // return response.status;
    return response.data;
  } catch(error) {
    console.log(error);
  }
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
};
