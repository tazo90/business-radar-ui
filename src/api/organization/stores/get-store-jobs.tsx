//@ts-nocheck
import { useQuery } from "react-query";

import http from "@api/http";
import { API_ENDPOINTS } from "@api/endpoints";
import { reverse } from "@lib/urls";

export async function fetchStoreJobs({ queryKey }: any) {
  const [_, params] = queryKey;
  const endpoint = reverse(API_ENDPOINTS.ORGANIZATIONS.STORE_JOBS, params);
  const { data } = await http.get(endpoint);
  return data;
}

export const useStoreJobsQuery = (query: any, options?: any) => {
  return useQuery<{ job: any }, Error>(
    [API_ENDPOINTS.ORGANIZATIONS.STORE_JOBS, query],
    fetchStoreJobs,
    options
  );
};
