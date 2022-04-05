//@ts-nocheck
import { useQuery } from "react-query";

import http from "../http";
import { API_ENDPOINTS } from "../endpoints";

export async function fetchJob({ queryKey }: any) {
  const [_, jobId] = queryKey;
  const { data } = await http.get(`${API_ENDPOINTS.JOBS}${jobId}/`);
  return data;
}

export const useJobQuery = (jobId: number) => {
  return useQuery([API_ENDPOINTS.JOB, jobId], fetchJob);
};
