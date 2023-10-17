import ManagerService from '@services/manager';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import {
  IApiResponseError,
  ICommunityManagerAddValue,
  ICommunityManagerDetails,
  ICommunityManagerUpdateDetails,
  ICommunityManagerUpdateValue,
} from 'src/types/community';

export function useListManager(params?: any) {
  const { data } = useQuery(['manager', params], async () => {
    const res = await ManagerService.list(params);
    return res;
  });
  const managers = useMemo(() => data?.data?.rows || [], [data?.data?.rows]);
  const meta = useMemo(() => data?.data?.meta || [], [data?.data?.meta]);

  return {
    managers,
    meta,
  };
}

export function useCreateManager() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();
  return useMutation<ICommunityManagerDetails, IApiResponseError, ICommunityManagerAddValue>(
    ['manager/create'],
    async (data: ICommunityManagerAddValue) => {
      const res = await ManagerService.create(data);
      console.log(res?.data);
      return res?.data;
    },
    {
      onError: (error) => {
        enqueueSnackbar(error?.message, { variant: 'error' });
      },
      onSuccess: (data) => {
        //   if (data?.address) push(paths.dashboard.general.community.edit(data.address));
        enqueueSnackbar('Created Succesfully', { variant: 'success' });
      },
    }
  );
}

export function useUpdateManager() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();
  return useMutation<
    ICommunityManagerUpdateDetails,
    IApiResponseError,
    ICommunityManagerUpdateValue
  >(
    ['manager/update'],
    async (data: ICommunityManagerUpdateValue) => {
      console.log(data);
      const res = await ManagerService.update(data);
      return res?.data;
    },
    {
      onError: (error) => {
        enqueueSnackbar(error?.message, { variant: 'error' });
      },
      onSuccess: (data) => {
        //   if (data?.address) push(paths.dashboard.general.community.edit(data.address));
        enqueueSnackbar('Manager Updated Succesfully', { variant: 'success' });
      },
    }
  );
}
