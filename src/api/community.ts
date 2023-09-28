import CommunityService from '@services/community';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { IApiResponseError } from 'src/types/beneficiaries';
import {
  ICommunityApiFilters,
  ICommunityDetails,
  ICommunityListHookReturn,
  ICommunityTableFilterValue,
  IcommunityAssets,
} from 'src/types/community';

export function useCommunities(params?: ICommunityApiFilters): ICommunityListHookReturn {
  const { data, isLoading, error } = useQuery(['communities', params], async () => {
    const res = await CommunityService.list(params);
    return res;
  });

  const communities = useMemo(() => data?.data?.rows || [], [data?.data?.rows]);
  const meta = useMemo(() => data?.data?.meta || {}, [data?.data?.meta]);

  return {
    communities,
    loading: isLoading,
    meta,
    error,
  };
}
export function useCommunity(address: string) {
  const { data, isLoading, error } = useQuery(['communities', address], async () => {
    const res = await CommunityService.detail(address);
    return res?.data;
  });

  const community = useMemo(() => data || [], [data]);

  return {
    community,
    loading: isLoading,
    error,
  };
}

export function useCreateCommunities() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<ICommunityDetails, IApiResponseError, ICommunityTableFilterValue>(
    ['categories/create'],
    async (data: ICommunityTableFilterValue) => {
      const res = await CommunityService.create(data);
      return res?.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error Creating Community', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Community Created Successfully', { variant: 'success' });
        queryClient.invalidateQueries(['communities']);
      },
    }
  );
}

export function useUpdateCommunityAssets() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    ['community/update-assets'],
    async ({ id, data }: { id: string; data: IcommunityAssets }) => {
      const res = await CommunityService.updateAssets(id, data);
      return res?.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error Updating Community assets', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Community Assets Created Successfully', { variant: 'success' });
        queryClient.invalidateQueries(['communities']);
      },
    }
  );
}
