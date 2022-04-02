import { useQuery } from "react-query";

import { httpMock } from "../http";
import { API_ENDPOINTS } from "../endpoints";

export async function fetchCategories({ queryKey }: any) {
  const [_key, _params] = queryKey;
  const {
    data: { menu },
  } = await httpMock.get(API_ENDPOINTS.CATEGORIES);

  return [...menu.categories];
}

export function useCategoriesQuery(options: any) {
  return useQuery<{ categories: any }, Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    fetchCategories
  );
}
