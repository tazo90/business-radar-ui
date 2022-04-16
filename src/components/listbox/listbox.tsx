import { forwardRef, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import { useDispatch, useSelector } from "react-redux";

import * as turf from "@turf/turf";

import { setStore } from "@slices/store.slice";
import Dropdown from "@components/ui/dropdown";
import { ListboxSkeleton } from "./listbox-skeleton";
import { ListboxItem } from "./listbox-item/listbox-item";

interface ListboxProps {
  name: string;
  selectedStoreId?: number;
  items: any[];
  isLoading: boolean;
  ItemRenderer?: any;
}

function Listbox(
  {
    name,
    selectedStoreId,
    items,
    isLoading,
    ItemRenderer = ListboxItem,
  }: ListboxProps,
  ref
) {
  if (isLoading) {
    return <ListboxSkeleton itemsNum={8} />;
  }

  if (!items) {
    return null;
  }

  if (items.length === 0) {
    return <p className="text-center">No results</p>;
  }

  const dispatch = useDispatch();
  const { userLocation } = useSelector((state: any) => state.location);

  const onStoreClick = useCallback((store) => {
    dispatch(setStore(store));
  }, []);

  const Row = useCallback(
    ({ data, index, style }) => {
      const item = items[index];
      const isActive = data.selectedStoreId === item.properties.id;
      let distance = null;

      if (data.userLocation) {
        const from = turf.point(data.userLocation.geometry.coordinates);
        const to = turf.point(item.geometry.coordinates);

        distance = turf.distance(from, to);
      }

      return (
        <div
          key={index}
          onClick={() => onStoreClick(item)}
          style={style}
          className="pr-2"
        >
          <ItemRenderer
            key={index}
            item={item.properties}
            isActive={isActive}
            distance={distance}
          />
        </div>
      );
    },
    [items]
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">
          {items.length} {name} found
        </span>
        <Dropdown />
      </div>
      <List
        ref={ref}
        itemCount={items.length}
        itemSize={136}
        width="100%"
        height={window.innerHeight}
        itemData={{ selectedStoreId, userLocation }}
      >
        {Row}
      </List>
    </>
  );
}

export default forwardRef(Listbox);
