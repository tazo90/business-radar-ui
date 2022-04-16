//@ts-nocheck
import { useQuery } from "react-query";

import http from "../http";
import { API_ENDPOINTS } from "../endpoints";
import { reverse } from "@lib/urls";

export async function fetchBrands({ queryKey }: any) {
  const [_, params] = queryKey;
  const endpoint = reverse(API_ENDPOINTS.ORGANIZATIONS.BRANDS, params);
  const { data } = await http.get(endpoint);

  const brands = {};
  Object.entries(data.brands).map((item) => {
    const brand = item[1];
    const brandKey = brand.name.toLowerCase();
    brands[brandKey] = brand;
  });

  return brands;
}

export const useBrandsQuery = (options: any) => {
  return useQuery<{ brands: any }, Error>(
    [API_ENDPOINTS.ORGANIZATIONS.BRANDS, options],
    fetchBrands
  );
};
