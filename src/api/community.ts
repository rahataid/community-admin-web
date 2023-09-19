import CommunityService from "@services/community";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ICommunityListHookReturn } from "src/types/community";

export function useCommunities():ICommunityListHookReturn{
        const { data, isLoading, error } = useQuery(['communities'], async () => {
          const res = await CommunityService.list();
          return res;
        });
      
        const communities = useMemo(() => data?.data || [], [data?.data]);
        const meta = useMemo(() => data?.data?.meta || {}, [data?.data?.meta]);
      
        return {
          communities,
          loading: isLoading,
          meta,
          error
        };
      }