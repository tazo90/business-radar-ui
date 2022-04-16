//@ts-nocheck
import { useQuery } from "react-query";

import http from "../http";
import { API_ENDPOINTS } from "../endpoints";
import { reverse } from "@lib/urls";

export async function fetchCountries({ queryKey }: any) {
  const [_, params] = queryKey;
  const endpoint = reverse(API_ENDPOINTS.ORGANIZATIONS.COUNTRIES, params);
  const { data } = await http.get(endpoint);

  const countries = {};
  Object.entries(data.countries).map((item) => {
    const country = item[1];
    const countryKey = country.code.toLowerCase();
    countries[countryKey] = country;
  });

  return countries;
}

export const useCountriesQuery = (options: any) => {
  return useQuery<{ countries: any }, Error>(
    [API_ENDPOINTS.ORGANIZATIONS.COUNTRIES, options],
    fetchCountries
  );
};
