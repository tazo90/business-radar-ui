import { useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import { useDispatch } from "react-redux";

import { StoreListRow } from "./store-list-row";
import { setStore } from "../../../slices/store.slice";

interface StoreListProps {
  selectedStoreId?: number;
  stores: any[];
}

export function StoreList({ selectedStoreId, stores }: StoreListProps) {
  const dispatch = useDispatch();

  if (!stores) return null;
  if (stores.length === 0) {
    return (
      <div className="text-center font-semibold">
        <p>No results</p>
      </div>
    );
  }

  const onStoreClick = useCallback((store) => {
    // const { id, name } = store.properties;
    // const slugName = name.toLowerCase().split(" ").join("-");

    // const storeLink = `/stores/${slugName}`;
    // router.push(storeLink);
    dispatch(setStore(store));
  }, []);

  const Row = useCallback(
    ({ data, index, style }) => {
      const item = stores[index];
      const isActive = data.selectedStoreId === item.properties.id;

      return (
        <div key={index} onClick={() => onStoreClick(item)} style={style}>
          <StoreListRow
            key={index}
            store={item.properties}
            isActive={isActive}
          />
        </div>
      );
    },
    [stores]
  );

  return (
    <List
      itemCount={stores.length}
      itemSize={136}
      width="100%"
      height={window.innerHeight}
      itemData={{ selectedStoreId }}
    >
      {Row}
    </List>
  );
}
