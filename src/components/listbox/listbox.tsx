import { useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import { useDispatch, useSelector } from "react-redux";

import * as turf from "@turf/turf";

import { setStore, setStoreTriggerSource } from "@slices/store.slice";
import Dropdown from "@components/ui/dropdown";
import { ListboxSkeleton } from "./listbox-skeleton";
import { ListboxItem } from "./listbox-item/listbox-item";

interface ListboxProps {
  name: string;
  selectedStoreId?: number;
  items: any[];
  isLoading: boolean;
  // dynamically imported components doesn't support forwardRef
  // https://github.com/vercel/next.js/issues/4957#issuecomment-413841689
  forwardedRef: React.ForwardedRef<any>;
  ItemRenderer?: any;
}

function Listbox({
  name,
  selectedStoreId,
  items,
  isLoading,
  forwardedRef,
  ItemRenderer = ListboxItem,
}: ListboxProps) {
  const dispatch = useDispatch();
  const { userLocation } = useSelector((state: any) => state.location);
  const { attributes } = useSelector((state: any) => state.app.config.listview);

  const onStoreClick = useCallback((store) => {
    dispatch(setStore(store));
    dispatch(setStoreTriggerSource("list"));
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
            attributes={data.attributes}
          />
        </div>
      );
    },
    [items]
  );

  if (isLoading) {
    return <ListboxSkeleton itemsNum={8} />;
  }

  if (!items) {
    return null;
  }

  if (items.length === 0) {
    return <p className="text-center">No results</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">
          {items.length} {name} found
        </span>
        <Dropdown />
      </div>
      <List
        ref={forwardedRef}
        itemCount={items.length}
        itemSize={126}
        width="100%"
        height={window.innerHeight}
        itemData={{
          selectedStoreId,
          userLocation,
          attributes,
        }}
      >
        {Row}
      </List>
    </>
  );
}

export default Listbox;
