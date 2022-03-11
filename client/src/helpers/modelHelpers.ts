import { Resource } from "../types/BaseModel";

/**
 * 
 * @param resources Resource to be compared.
 * @param userResources List of ResourceData.
 * @returns True if resource is found in userResource.
 */
 export const isResourceInUserList = (
  resource: Resource,
  userResources: Resource[] | null
): boolean => {
  if (!userResources) {
    return false;
  }
  
  return userResources
    .findIndex(userResource => userResource.id === resource.id) >= 0;
};
