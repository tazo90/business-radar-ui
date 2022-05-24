//@ts-nocheck
import { useQuery } from "react-query";

import http from "@api/http";
import { API_ENDPOINTS } from "@api/endpoints";
import { toGeojson } from "@lib/geojson/to-geojson";
import { jobProperties } from "@lib/geojson/properties/job-properties";
import { reverse } from "@lib/urls";

export async function fetchJobs({ queryKey }: any) {
  const [_, params] = queryKey;
  const endpoint = reverse(API_ENDPOINTS.ORGANIZATIONS.JOBS, params);
  const { data } = await http.get(endpoint);

  return toGeojson({
    data: data.stores,
    getProperties: jobProperties,
    getStore: (feature) => feature.store,
  });
}

export const useJobsQuery = (query: any, options?: any) => {
  return useQuery<{ jobs: any }, Error>(
    [API_ENDPOINTS.JOBS, query],
    fetchJobs,
    options
  );
};
