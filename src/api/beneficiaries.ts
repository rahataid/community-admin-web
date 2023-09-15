import { MapData } from '@components/map';
import BeneficiaryService from '@services/beneficiaries';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import {
  BeneficiariesListHookReturn,
  IApiResponseError,
  IBeneficiariesGeoLoc,
  IBeneficiariesGeoLocHooksReturn,
  IBeneficiaryApiFilters,
  IBeneficiaryDetails,
} from 'src/types/beneficiaries';

export function useBeneficiaries(params?: IBeneficiaryApiFilters): BeneficiariesListHookReturn {
  const { data, isLoading, error } = useQuery(['beneficiaries', params], async () => {
    const res = await BeneficiaryService.list(params);
    return res;
  });

  const beneficiaries = useMemo(() => data?.data?.rows || [], [data?.data?.rows]);
  const meta = useMemo(() => data?.data?.meta || {}, [data?.data?.meta]);

  return {
    // TEMP for stage
    // beneficiaries: beneficiaryList,
    beneficiaries,
    loading: isLoading,
    error,
    meta,
  };
}

export function useBeneficiary(uuid: string) {
  const { data, isLoading, error } = useQuery(['beneficiaries', uuid], async () => {
    const res = await BeneficiaryService.details(uuid);
    return res;
  });

  const beneficiary = useMemo(() => data?.data || {}, [data?.data]) as IBeneficiaryDetails;

  return {
    beneficiary,
    isLoading,
    error,
  };
}

export function useBeneficiaryStats() {
  const { data, isLoading, error } = useQuery(['beneficiaries'], async () => {
    const res = await BeneficiaryService.getStats();
    return res?.data;
  });

  const formatData = (rawData: Record<string, number> | undefined) =>
    rawData
      ? Object.entries(rawData).map(([label, value]) => ({
          label,
          value: +value,
        }))
      : [];

  const genderData = useMemo(() => formatData(data?.gender), [data?.gender]);
  const internetAccessData = useMemo(
    () => formatData(data?.internetAccess),
    [data?.internetAccess]
  );
  const phoneOwnershipData = useMemo(
    () => formatData(data?.phoneOwnership),
    [data?.phoneOwnership]
  );
  const bankStatusData = useMemo(() => formatData(data?.bankStatus), [data?.bankStatus]);

  return {
    bankStatusData,
    genderData,
    phoneOwnershipData,
    internetAccessData,
    isLoading,
    error,
  };
}

export function useGeoLocation(): IBeneficiariesGeoLocHooksReturn {
  const { data, isLoading, error } = useQuery<IBeneficiariesGeoLoc[], IApiResponseError | null>(
    ['beneficiaries/geolocation'],
    async () => {
      const res = await BeneficiaryService.geoLoc();
      return res?.data;
    }
  );

  const geoData: MapData[] | undefined = useMemo(
    () =>
      data?.map((item) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [item?.longitude || 0, item?.latitude || 0],
        },
        properties: {
          // cluster: true,
          id: `long${item?.longitude}-lat${item?.latitude}`,
        },
      })) || [],
    [data]
  );

  return {
    geoData,
    isLoading,
    error,
  };
}
