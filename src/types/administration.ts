export type IUserItem = {
  id: number;
  email?: string;
  name: string;
  roles: string;
  isApproved: boolean;
  status: string;
  walletAddress: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type IUsersList = IUserItem[];

export type IUsersApiFilters = {
  page?: number;
  perPage?: number;
  name?: string;
  role?: string;
  isApproved?: boolean;
  orderBy?: string;
  order?: 'asc' | 'desc';
};

export type IUsersTableFilterValue = string | string[];

export type IUsersPagination = {
  currentPage?: number;
  total?: number;
  perPage: number;
  lastPage?: number;
};

export type IUsersListApiResponse = {
  data: IUsersList;
  meta: IUsersPagination;
};

export type IUsersListHookReturn = {
  users: IUsersList;
  loading: boolean;
  error: IApiResponseError;
  meta: IUsersListApiResponse['meta'];
  refetchUser: () => {};
};

export type IApiResponseError = {
  group: string;
  meta?: Record<string, string[]> | null;
  message: string;
  name: string;
  success: boolean;
  timestamp: number;
};
