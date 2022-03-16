//@ts-nocheck
import { useQuery } from "react-query";

import http from "../http";

const endpoint = "https://photon.komoot.io/api/";

export async function fetchGeocoding({ queryKey }: any) {
  const [_key, _params] = queryKey;
  const { data } = await http.get(endpoint, {
    params: _params,
  });

  return data;
}

export const useGeocodingQuery = (params, options) => {
  return useQuery<{ stores: any }, Error>(
    [endpoint, params],
    fetchGeocoding,
    options
  );
};
