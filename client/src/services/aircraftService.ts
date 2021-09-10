import axios from "axios";
import { BASE_URL } from "../constants/globals";
import { getStoredToken, isUserAuthenticated } from "../helpers/tokenHelper";
import { AircraftData, NewAircraft } from "../types/Aircraft/Aircraft";

/*
/// <summary>
/// Aircraft model controller endpoints:
/// <para> GetAllAircrafts             - GET     api/aircrafts            </para>
/// <para> GetAllAircraftsPaginated    - GET     api/aircrafts/paginated  </para>
/// <para> GetAircraftByParameters     - GET     api/aircrafts/search     </para>
/// <para> GetAircraftOwnedByUser      - GET     api/aircrafts/owned      </para>
/// <para> GetAircraftId               - GET     api/aircrafts/5          </para>
/// <para> CreateAircraft              - POST    api/aircrafts/create     </para>
/// <para> CloneAircraft               - POST    api/aircrafts/5/clone    </para>
/// <para> PartialUpdateAircraftId     - PUT     api/aircrafts/5          </para>
/// <para> SaveAircraftId              - PUT     api/aircrafts/5/save     </para>
/// <para> FullUpdateAircraftId        - PATCH   api/aircrafts/5          </para>
/// <para> DeleteAircraftId            - DELETE  api/aircrafts/5          </para>
/// </summary>
*/

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
      headers: { Authorization: `Bearer ${getStoredToken()}` },
    };
    
    const response = await axios.get(
      BASE_URL + `/api/aircrafts/saved`,
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
        headers: { Authorization: `Bearer ${getStoredToken()}` }
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
    const config = {
      headers: { Authorization: `Bearer ${getStoredToken()}` }
    };
  
    const response = await axios.put(
      BASE_URL + `/api/aircrafts/${aircraftId}/save`,
      aircraftId,
      config
    );
  
    // return response.status;
    return response.data;
  } catch(error) {
    console.log(error);
  }
};

// TODO: unsave aircraft
const unsaveAircraft = async (aircraftId: string) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getStoredToken()}` }
    };
  
    const response = await axios.put(
      BASE_URL + `/api/aircrafts/${aircraftId}/unsave`,
      aircraftId,
      config
    );
  
    // return response.status;
    return response.data;
  } catch(error) {
    console.log(error);
  }
};

const editAircraft = async (aircraftId: string, aircraftUpdated: AircraftData) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getStoredToken()}` }
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
      headers: { Authorization: `Bearer ${getStoredToken()}` }
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
