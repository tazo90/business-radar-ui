//@ts-nocheck
import { useQuery } from "react-query";

import http from "../http";
import { API_ENDPOINTS } from "../endpoints";

export async function fetchCountries({ queryKey }: any) {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.CUSTOMER.COUNTRIES, {
    params: _params,
  });

  return data;
}

export const useCountriesQuery = (options: any) => {
  return useQuery<{ countries: any }, Error>(
    [API_ENDPOINTS.CUSTOMER.COUNTRIES, options],
    fetchCountries
  );
};
