//@ts-nocheck
import { useQuery } from "react-query";

import http from "../http";
import { API_ENDPOINTS } from "../endpoints";

export async function fetchBrands({ queryKey }: any) {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.CUSTOMER.BRANDS, {
    params: _params,
  });

  const brands = {};
  Object.entries(data).map((item) => {
    const brand = item[1];
    const brandKey = brand.name.toLowerCase();
    brands[brandKey] = brand;
  });

  return brands;
}

export const useBrandsQuery = (options: any) => {
  return useQuery<{ brands: any }, Error>(
    [API_ENDPOINTS.CUSTOMER.BRANDS, options],
    fetchBrands
  );
};
