import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;
//let token = null;

/*
/// <summary>
/// Aircraft model controller endpoints:
/// <para> GetAllAircrafts             - GET     api/aircrafts         </para>
/// <para> GetAircraftByParameters     - GET     api/aircrafts/search  </para>
/// <para> GetAircraftOwnedByUser      - GET     api/aircrafts/owned   </para>
/// <para> GetAircraftId               - GET     api/aircrafts/5       </para>
/// <para> CreateAircraft              - POST    api/aircrafts/create  </para>
/// <para> CloneAircraft               - POST    api/aircrafts/5/clone  </para>
/// <para> PartialUpdateAircraftId     - PUT     api/aircrafts/5       </para>
/// <para> SaveAircraftId              - PUT     api/aircrafts/5/save  </para>
/// <para> FullUpdateAircraftId        - PATCH   api/aircrafts/5       </para>
/// <para> DeleteAircraftId            - DELETE  api/aircrafts/5       </para>
/// </summary>
*/

const getAllAircrafts = async () => {
  const response = await axios.get(baseUrl + "/api/aircrafts");
  return response.data;
};

export default {
  getAllAircrafts
};
