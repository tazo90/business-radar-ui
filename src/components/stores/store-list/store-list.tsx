import { forwardRef, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import { useDispatch } from "react-redux";

import { StoreListRow } from "./store-list-row";
import { setStore } from "../../../slices/store.slice";
import { StoreListSkeleton } from "./store-list-skeleton";
import Dropdown from "../../ui/dropdown";

interface StoreListProps {
  selectedStoreId?: number;
  stores: any[];
  isLoading: boolean;
}

function StoreList(
  { selectedStoreId, stores, isLoading }: StoreListProps,
  ref
) {
  const dispatch = useDispatch();

  if (isLoading) {
    return <StoreListSkeleton itemsNum={8} />;
  }

  if (!stores) {
    return null;
  }

  if (stores.length === 0) {
    return <p className="text-center">No results</p>;
  }

  const onStoreClick = useCallback((store) => {
    dispatch(setStore(store));
  }, []);

  const Row = useCallback(
    ({ data, index, style }) => {
      const item = stores[index];
      const isActive = data.selectedStoreId === item.properties.id;

      return (
        <div
          key={index}
          onClick={() => onStoreClick(item)}
          style={style}
          className="pr-2"
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
    <>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">
          {stores.length} stores found
        </span>
        <Dropdown />
      </div>
      <List
        ref={ref}
        itemCount={stores.length}
        itemSize={136}
        width="100%"
        height={window.innerHeight}
        itemData={{ selectedStoreId }}
      >
        {Row}
      </List>
    </>
  );
}

export default forwardRef(StoreList);
