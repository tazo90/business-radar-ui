//@ts-nocheck
import { useQuery } from "react-query";

import http from "../../http";
import { API_ENDPOINTS } from "../../endpoints";
import { toGeojson } from "@lib/geojson/to-geojson";
import { reverse } from "@lib/urls";

export async function fetchStores({ queryKey }: any) {
  const [_, params] = queryKey;
  const endpoint = reverse(API_ENDPOINTS.ORGANIZATIONS.STORES, params);
  const { data } = await http.get(endpoint);

  return toGeojson({ data });
}

export const useStoresQuery = (query: any, options?: any) => {
  return useQuery<{ stores: any }, Error>(
    [API_ENDPOINTS.ORGANIZATIONS.STORES, query],
    fetchStores,
    options
  );
};
