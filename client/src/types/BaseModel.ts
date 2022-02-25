
export interface BaseModel {
  id: string;
  imageUrl: string;
}

export interface BaseModelSocials {
  createdAtDate: number;
  modifiedAtDate: number;
  savesCount: number;
  authorUsername: string;
}

export type BaseModelSets = "all" | "saved" | "owned";
