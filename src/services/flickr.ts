import { FLICKR_APIKEY, FLICKR_PHOTOSET } from '@config';
import axios from 'axios';
import { FlickrParams } from 'src/types/flickr';

const axiosInstance = axios.create({
  baseURL: 'https://www.flickr.com/services/rest',
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export const endpoints = {
  flickr: {
    get: '',
  },
};

const FlickrService = {
  get: (params?: any) =>
    axiosInstance.get(endpoints.flickr.get, {
      params: {
        method: 'flickr.photosets.getPhotos',
        api_key: FLICKR_APIKEY,
        photoset_id: FLICKR_PHOTOSET,
        format: 'json',
        nojsoncallback: 1,
        extras: 'date_upload,date_taken',
        ...params,
      } as FlickrParams,
    }),
};

export default FlickrService;
