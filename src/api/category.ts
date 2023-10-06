import CategoryService from "@services/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { IApiResponseError, ICategoryApiFilter, ICategoryDetails, ICategoryTableFilterValue } from "src/types/community";

export function useCategory(params?:ICategoryApiFilter){
    const { data } = useQuery(['categories', params], async () => {
        const res = await CategoryService.list(params);
        return res;
      });
      const categories = useMemo(() => data?.data || [], [data?.data]);

      return{
        categories
      }
}
  export function useCategoryCreate() {  
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    return useMutation<
    ICategoryDetails,
    IApiResponseError,
    ICategoryTableFilterValue>(
      ['categories/create'],
      async (data: ICategoryTableFilterValue) => {
        console.log(data)
        const res = await CategoryService.create(data);
        return res.data;
      },
      {
        onError: () => {
          enqueueSnackbar('Error Creating Category', { variant: 'error' });
        },
        onSuccess: () => {
          enqueueSnackbar('Category Created Successfully', { variant: 'success' });
          queryClient.invalidateQueries(['categories']);
        },
      }
    );
  }