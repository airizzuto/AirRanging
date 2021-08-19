import axios from "axios";
import { getStoredToken, isUserAuthenticated } from "../helpers/tokenHelper";
import { AircraftData, NewAircraft } from "../types/Aircraft/Aircraft";

const baseUrl = process.env.REACT_APP_BASEURL;

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
  const response = await axios.get(baseUrl + "/api/aircrafts");
  return response.data;
};

const getAllAircraftsPaginated = async () => {
  const response = await axios.get(baseUrl + "/api/aircrafts/paginated");
  return response.data;
};

const getAircraftsOwnedByUser = async () => {
  const config = {
    headers: { Authorization: getStoredToken() },
  };
  const response = await axios.get(baseUrl + "/api/aircrafts/owned", config);

  return response.data;
};

const searchAircraftByModel = async (query: string) => {
  const response = await axios.get(baseUrl + `/api/aircrafts/search?Model=${query}`);

  return response.data;
};

const createAircraft = async (newAircraft: NewAircraft) => {
  if (await isUserAuthenticated()) {
    const config = {
      headers: { Authorization: `bearer ${getStoredToken()}` }
    };
    const response = await axios.post(
      baseUrl + "/api/aircrafts/create",
      newAircraft,
      config
    );

    return response.data;
  }
};

const saveAircraft = async (aircraftId: string) => {
  const config = {
    headers: { Authorization: `bearer ${getStoredToken()}` }
  };

  const response = await axios.put(
    baseUrl + `/api/aircrafts/${aircraftId}/save`,
    aircraftId,
    config
  );

  return response.status;
};

const editAircraft = async (aircraftId: string, aircraftUpdated: AircraftData) => {
  const config = {
    headers: { Authorization: `bearer ${getStoredToken()}` }
  };

  const response = await axios.put(
    baseUrl + `/api/aircrafts/${aircraftId}`,
    {aircraftId, aircraftUpdated},
    config
  );

  return response.status;
};

const deleteAircraft = async (aircraftId: string) => {
  const config = {
    headers: { Authorization: `bearer ${getStoredToken()}` }
  };

  const response = await axios.delete(
    baseUrl + `/api/aircrafts/${aircraftId}`,
    config
  );

  return response.status;
};


export default {
  getAllAircrafts,
  getAllAircraftsPaginated,
  getAircraftsOwnedByUser,
  searchAircraftByModel,
  createAircraft,
  saveAircraft,
  editAircraft,
  deleteAircraft,
};
