//@ts-nocheck
import { useQuery } from "react-query";

import http from "../http";
import { API_ENDPOINTS } from "../endpoints";

export async function fetchCountries({ queryKey }: any) {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.CUSTOMER.COUNTRIES, {
    params: _params,
  });

  const countries = {};
  Object.entries(data).map((item) => {
    const country = item[1];
    const countryKey = country.code.toLowerCase();
    countries[countryKey] = country;
  });

  return countries;
}

export const useCountriesQuery = (options: any) => {
  return useQuery<{ countries: any }, Error>(
    [API_ENDPOINTS.CUSTOMER.COUNTRIES, options],
    fetchCountries
  );
};
