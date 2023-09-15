// routes
import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = process.env.NEXT_PUBLIC_HOST_API;
export const CAMPAIGN_HOST_API = process.env.NEXT_PUBLIC_HOST_CAMPAIGN;
export const CAMPAIGN_APP_ID = process.env.NEXT_PUBLIC_CAMPAIGN_APPID;

export const ASSETS_API = process.env.NEXT_PUBLIC_ASSETS_API;

export const FLICKR_APIKEY = process.env.NEXT_PUBLIC_FLICKR_APIKEY;
export const FLICKR_PHOTOSET = process.env.NEXT_PUBLIC_FLICKR_PHOTOSET;
export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export const MAPBOX_API = process.env.NEXT_PUBLIC_MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'

export enum CONTRACTS {
  RAHATTOKEN = 'RahatToken',
  CVAPROJECT = 'CVAProject',
  COMMUNITY = 'RahatCommunity',
  DONOR = 'RahatDonor',
  CLAIM = 'RahatClaim',
}

export interface IPaginatedResponse<T> {
  rows: T[];
  meta: {
    currentPage?: number;
    total?: number;
    perPage: number;
    lastPage?: number;
  };
}
