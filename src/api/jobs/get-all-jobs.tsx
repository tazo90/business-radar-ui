//@ts-nocheck
import { useQuery } from "react-query";

import http from "../http";
import { API_ENDPOINTS } from "../endpoints";
import { toGeojson } from "../../utils/geojson/to-geojson";
import { jobProperties } from "../../utils/geojson/properties/job-properties";

export async function fetchJobs({ queryKey }: any) {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.JOBS, {
    params: _params,
  });

  return toGeojson(data, jobProperties);
}

export const useJobsQuery = (options: any) => {
  return useQuery<{ jobs: any }, Error>(
    [API_ENDPOINTS.JOBS, options],
    fetchJobs
  );
};
