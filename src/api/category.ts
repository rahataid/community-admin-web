import CategoryService from '@services/category';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import {
  IApiResponseError,
  ICategoryApiFilter,
  ICategoryDetails,
  ICategoryTableFilterValue,
} from 'src/types/community';

export function useCategory(params?: ICategoryApiFilter) {
  const { data } = useQuery(['categories', params], async () => {
    const res = await CategoryService.list(params);
    return res;
  });
  const categories = useMemo(() => data?.data?.rows || [], [data?.data?.rows]);
  const meta = useMemo(() => data?.data?.meta || [], [data?.data?.meta]);

  return {
    categories,
    meta,
  };
}

export function useListCommunityByCategory() {
  const { data } = useQuery(['categories/community'], async () => {
    const res = await CategoryService.countCommunity();
    return res?.data;
  });

  return {
    listCommunityByCategory: data,
  };
}
export function useCategoryCreate() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<ICategoryDetails, IApiResponseError, ICategoryTableFilterValue>(
    ['categories/create'],
    async (data: ICategoryTableFilterValue) => {
      console.log(data);
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
export function useEditCategory(id: string) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    ['categories/edit'],
    async (data: any) => {
      const res = await CategoryService.edit(id, data);
      return res.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error editing Category', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Sucessfully edited', { variant: 'success' });
        queryClient.invalidateQueries(['categories']);
      },
    }
  );
}
