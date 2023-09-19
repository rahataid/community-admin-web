
export type ICategoryItem = {
  id: number;
  name:string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type ICommunityItem = {
  id: number;
  address?: string;
  name: string;
  description: string;
  longitude: number;
  latitude:number;
  country: string;
  fundRaisedUsd: number;
  category: ICategoryItem;
  fundRaisedLocal:string;
  localCurrency:string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type ICommunityList = ICommunityItem[];

export type ICommunityApiFilters = {
  page?: number;
  perPage?: number;
  name?: string;
  role?: string;
  isApproved?: boolean;
  orderBy?: string;
  order?: 'asc' | 'desc';
};

export type ICommunityTableFilterValue = {
  name: string;
  address?: string;
  country?: string;
  category: string;
}

export interface ICommunityDetails{
  name: string;
  address?: string;
  country?: string;
  category: string;
}


export type ICommunityPagination = {
  currentPage?: number;
  total?: number;
  perPage: number;
  lastPage?: number;
};

export type ICommunityListApiResponse = {
  data: ICommunityList;
  meta: ICommunityPagination;
};

export type ICommunityListHookReturn = {
  communities: ICommunityList;
  loading: boolean;
  error: any;
  meta: ICommunityListApiResponse['meta'];
  // refetchUser: () => {};
};

export type IApiResponseError = {
  group: string;
  meta?: Record<string, string[]> | null;
  message: string;
  name: string;
  success: boolean;
  timestamp: number;
}|null;
