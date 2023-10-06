export type ICategoryItem = {
  id: number;
  name:string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}


export type ICategoryList = ICategoryItem[];
export type ICategoryApiFilter={
  page?: number;
  perPage?: number;
  name?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export type ICategoryTableFilterValue = {
  name: string;
}
export type ICategoryDetails={
  name:string
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
  orderBy?: string;
  order?: 'asc' | 'desc';
};

export type ICommunityTableFilterValue = {
  name: string;
  country: string;
  categoryId: string;
  latitude:number;
  longitude:number;
  fundRaisedUsd:number;
  fundRaisedLocal:string;
  localCurrency:string;
  description:string;
}

export type ICommunityApiFilter ={
  data:any
 
}

export interface ICommunityDetails{
  name: string;
  walletAddress?: string;
  country?: string;
  category: string;
  latitude:number;
  longitude:number;
}

export interface IcommunityAssets{
  cover:string;
  logo:string;
  gallery:string[]

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
