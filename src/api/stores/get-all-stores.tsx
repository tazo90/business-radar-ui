//@ts-nocheck
import { useQuery } from "react-query";

import http from "../http";
import { API_ENDPOINTS } from "../endpoints";
import { toGeojson } from "@lib/geojson/to-geojson";
import { reverse } from "@lib/urls";

export async function fetchStores({ queryKey }: any) {
  const [_, params] = queryKey;
  const endpoint = reverse(API_ENDPOINTS.ORGANIZATIONS.STORE_LIST, params);
  const { data } = await http.get(endpoint);

  return toGeojson({ data: data.stores });
}

export const useStoresQuery = (options: any) => {
  return useQuery<{ stores: any }, Error>(
    [API_ENDPOINTS.STORES, options],
    fetchStores
  );
};
