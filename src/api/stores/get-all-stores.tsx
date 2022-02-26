//@ts-nocheck
import { useQuery } from 'react-query';

import http from '../http';
import { API_ENDPOINTS } from '../endpoints';
import { toGeojson } from '../../utils';

export async function fetchStores({ queryKey }: any) {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.STORES, {
    params: _params
  });

  return toGeojson(data);
}

export const useStoresQuery = (options: any) => {
  return useQuery<{ stores: any }, Error>(
    [API_ENDPOINTS.STORES, options],
    fetchStores
  );
};
