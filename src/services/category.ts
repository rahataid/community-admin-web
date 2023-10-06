import { axiosInstance, endpoints } from "@utils/axios"
import { ICategoryApiFilter, ICategoryDetails } from "src/types/community"

const CategoryService={
    list: (params?: ICategoryApiFilter) =>
    axiosInstance.get(endpoints.category.list, { params }),
  create: (data: ICategoryDetails) =>
    axiosInstance.post(endpoints.category.create,  data),
}

export default CategoryService