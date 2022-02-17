import axios from "axios";
import { BASE_URL } from "../constants/globals";
import { getStoredToken, isUserAuthenticated } from "../helpers/tokenHelper";
import { Landmark, LandmarkSearchResult, LandmarkWithoutIDs, LandmarkWithSocials } from "../types/Landmark/Landmark";
import { PaginationOptions } from "../types/Pagination";
import { buildStringEndpoint } from "../utils/stringBuilder";

const getAllLandmarks = async () => {
  return await axios.get<Landmark[]>(BASE_URL + "/api/landmarks")
    .then(res => res.data);
};

const getLandmarkById = async (landmarkId: string) => {
  return await axios.get<Landmark>(BASE_URL + `/api/landmarks/${landmarkId}`)
    .then(res => res.data);
};

const getLandmarksOwnedByUser = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getStoredToken()}` },
  };

  const urlOptions = {
    baseUrl: BASE_URL!,
    slug: `/api/landmarks/owned`,
  };

  const url = buildStringEndpoint(urlOptions);

  return await axios.get<Landmark[]>(url, config)
    .then(res => res.data);
};

const getLandmarksSavedByUser = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getStoredToken()}` },
  };

  const urlOptions = {
    baseUrl: BASE_URL!,
    slug: `/api/landmarks/saved`,
  };

  const url = buildStringEndpoint(urlOptions);

  return await axios.get<Landmark[]>(url, config)
    .then(res => res.data);
};

// TODO: search by map bounds

const searchAircraftsPaged = async (paging: PaginationOptions): Promise<LandmarkSearchResult | void> => {
  const options = {
    headers: { Authorization: `Bearer ${getStoredToken()}` }
  };

  console.debug("DEBUG PAGING: ", paging);

  const urlOptions = {
    baseUrl: BASE_URL!,
    slug: `/api/landmarks/`,
    paging: `&pageNumber=${paging.CurrentPage}&pageSize=${paging.PageSize}`
  };

  const url = buildStringEndpoint(urlOptions);

  const response = await axios.get<LandmarkWithSocials[]>(url, options);

  if (response) {
    const result: LandmarkSearchResult = {
      data: response.data,
      pagination: JSON.parse(response.headers["x-pagination"])
    };

    return result;
  }
};

const createLandmark = async (newLandmark: LandmarkWithoutIDs) => {
  try {
    if (await isUserAuthenticated()) {
      const config = {
        headers: { Authorization: `Bearer ${getStoredToken()}` },
      };

      const response = await axios.post(
        BASE_URL + "/api/landmarks/",
        newLandmark,
        config
      );
  
      return response.data;
    }
  } catch(error) {
    console.log(error);
  }
};

const saveLandmark = async (landmarkId: string) => {
  try {
    if (await isUserAuthenticated()) {
      const config = {
        headers: { Authorization: `Bearer ${getStoredToken()}` },
      };
      
      const response = await axios.post(
        BASE_URL + "/api/landmarks/bookmarks",
        {landmarkId: landmarkId},
        config
      );

      return response;
    }
  } catch(error) {
    return error;
  }
};

const unsaveLandmark = async (landmarkId: string) => {
  try {
    if (await isUserAuthenticated()) {
      const config = {
        headers: { Authorization: `Bearer ${getStoredToken()}` },
      };
    
      const response = await axios.delete(
        BASE_URL + `/api/landmarks/bookmarks/${landmarkId}`,
        config
      );
    
      return response.status;
    }
  } catch(error) {
    return error;
  }
};

const editLandmark = async (landmarkId: string, landmarkUpdated: LandmarkWithSocials) => {
  const config = {
    headers: { Authorization: `Bearer ${getStoredToken()}` },
  };

  const response = await axios.put(
    BASE_URL + `/api/landmarks/${landmarkId}`,
    {...landmarkUpdated},
    config
  );

  return response;
};

const deleteLandmark = async (landmarkId: string) => {
  const config = {
    headers: { Authorization: `Bearer ${getStoredToken()}` },
  };

  const response = await axios.delete(
    BASE_URL + `/api/landmarks/${landmarkId}`,
    config
  );

  return response;
};

export default {
  getAllLandmarks,
  getLandmarkById,
  getLandmarksOwnedByUser,
  getLandmarksSavedByUser,
  searchAircraftsPaged,
  createLandmark,
  saveLandmark,
  unsaveLandmark,
  editLandmark,
  deleteLandmark
};
