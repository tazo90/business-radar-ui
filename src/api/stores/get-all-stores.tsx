import { useQuery } from 'react-query';

import http from '@api/http';
import { API_ENDPOINTS } from '@api/endpoints';
import { toGeojson } from '@utils/index';

export async function fetchStores({ queryKey }: any) {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.STORES);

  return toGeojson(data);
}

export const useStoresQuery = (options: any) => {
  return useQuery<{ stores: any }, Error>(
    [API_ENDPOINTS.STORES, options],
    fetchStores
  );
};
