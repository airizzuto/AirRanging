
export interface PaginationOptions {
  PageSize: number;
  CurrentPage: number;
}

export interface PaginationInfo {
  TotalCount: number;
  TotalPages: number;
  HasNext: boolean;
  HasPrevious: boolean;
}

export interface Pagination extends PaginationOptions, PaginationInfo { }
