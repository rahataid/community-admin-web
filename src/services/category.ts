import { axiosInstance, endpoints } from '@utils/axios';
import { ICategoryApiFilter, ICategoryDetails } from 'src/types/community';

const CategoryService = {
  list: (params?: ICategoryApiFilter) => axiosInstance.get(endpoints.category.list, { params }),
  countCommunity: () => axiosInstance.get(endpoints.category.countCommunity),
  create: (data: ICategoryDetails) => axiosInstance.post(endpoints.category.create, data),
  edit: (id: string, data: any) => axiosInstance.patch(endpoints.category.edit(id), data),
};

export default CategoryService;
