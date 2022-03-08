import { useCallback } from "react";
import { useRouter } from "next/router";
import { FixedSizeList as List } from "react-window";

import { StoreListRow } from "./store-list-row";

interface StoreListProps {
  selectedStoreId?: number;
  stores: any[];
}

export function StoreList({ selectedStoreId, stores }: StoreListProps) {
  const router = useRouter();

  if (!stores) return null;
  if (stores.length === 0) {
    return (
      <div className="text-center font-semibold">
        <p>No results</p>
      </div>
    );
  }

  const onStoreClick = useCallback((store) => {
    const { id, name } = store.properties;
    const slugName = name.toLowerCase().split(" ").join("-");

    const storeLink = `/stores/${slugName}`;
    router.push(storeLink);
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
