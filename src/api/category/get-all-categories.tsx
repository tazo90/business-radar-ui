import { useQuery } from "react-query";

import http from "../http";
import { httpMock } from "../http";
import { API_ENDPOINTS } from "../endpoints";
import { Category } from "../types";

export async function fetchCategories({ queryKey }: any) {
  const [_key, _params] = queryKey;
  const {
    data: { menu },
  } = await httpMock.get(API_ENDPOINTS.CATEGORIES);

  // http.interceptors.request.use(function (config) {
  //   config.headers.Authorization =
  //     "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJkZXZpY2VVdWlkXCI6XCJiZTcxMjVjNy1jMWE5LTQ0YjEtYjFlOC1mNDZlMjdiM2IwN2VcIixcImRldmljZVV1aWRTb3VyY2VcIjpcIkZJTkdFUlBSSU5UXCIsXCJpbXBsVmVyc2lvblwiOlwiMy4wXCIsXCJzb3VyY2VcIjpcIldFQl9QSFwiLFwiZXhwaXJpYXRpb25EYXRlXCI6MTY3NjU4NDIxNzI5MCxcImFjY291bnROb25Mb2NrZWRcIjp0cnVlLFwiY3JlZGVudGlhbHNOb25FeHBpcmVkXCI6dHJ1ZSxcImFjY291bnROb25FeHBpcmVkXCI6dHJ1ZSxcImVuYWJsZWRcIjp0cnVlfSJ9.DHPYYfgKl8t8X1sSwcLLd3EXOALDgg8ApXR858W1k8bR_BsWvVkBbFjwmx0IdB6IBRZFXQtfFwbPn98tANuK2g";
  //   config.headers.Source = "WEB";
  //   config.headers["Accept-Language"] = "pl";
  //   return config;
  // });

  // const {
  //   data: { menu },
  // } = await http.get(
  //   "https://kfcdostawa.pl/ordering-api/rest/v3/restaurants/941/menu/TAKEAWAY?ts=1649112263547",
  //   {
  //     params: _params,
  //   }
  // );

  return [...menu.categories];
}

export function useCategoriesQuery(options: any) {
  return useQuery<Category[] | undefined, Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    fetchCategories
  );
}
