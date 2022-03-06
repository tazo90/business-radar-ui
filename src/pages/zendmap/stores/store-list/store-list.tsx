import { useCallback } from "react";
import { FixedSizeList as List } from "react-window";

import { StoreListRow } from "./store-list-row";

export function StoreList({ selectedStoreId, stores }) {
  if (!stores) return null;
  if (stores.length === 0) {
    return <div>No results</div>;
  }

  const Row = useCallback(
    ({ data, index, style }) => {
      const item = stores[index];
      const isActive = data.selectedStoreId === item.properties.id;

      return (
        <div
          key={index}
          // onClick={() => onStoreClick(item)}
          style={style}
        >
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
      itemSize={150}
      width="100%"
      height={800}
      itemData={{ selectedStoreId }}
    >
      {Row}
    </List>
  );
}
