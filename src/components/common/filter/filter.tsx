import { useEffect, useState } from "react";

import { Search } from "../../common/search";
import { FilterSkeleton } from "./filter-skeleton";
import { Modal } from "../../ui/modal";

export function Filter({
  title,
  searchPlaceholder,
  items = {},
  initialItems,
  getIcon,
  iconSize = 8,
  isSearch = true,
  isLoading = false,
  isFooterSummary = true,
  isOpen,
  onSubmit,
  onClose,
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState({});
  const selectedItemsNum = Object.keys(selectedItems).length;
  const totalItemsNum = Object.keys(items).length;

  useEffect(() => {
    if (isOpen) {
      setSelectedItems(initialItems);
    }
  }, [isOpen]);

  useEffect(() => {
    if (items) {
      setFilteredItems(items);
    }
  }, [items]);

  function getItemName(item) {
    return item.full_name || item.name;
  }

  function onSelectAll() {
    setSelectedItems(Object.keys(items));
  }

  function onSelect(itemId: string) {
    const _items = [...selectedItems];

    const itemIndex = _items.indexOf(itemId);
    if (itemIndex >= 0) {
      _items.splice(itemIndex, 1);
    } else {
      _items.splice(0, 0, itemId);
    }
    setSelectedItems(_items);
  }

  function onClear() {
    setSelectedItems([]);
  }

  function onSearch(event) {
    const value = event.target.value.toLowerCase();
    if (value === "") {
      setFilteredItems(items);
      return;
    }

    let filteredItems = {};
    Object.keys(items).map((itemId) => {
      const item = items[itemId];
      const itemName = getItemName(item);
      if (itemName.toLowerCase().startsWith(value)) {
        filteredItems[itemId] = item;
      }
    });
    setFilteredItems(filteredItems);
  }

  function renderOptions() {
    if (isLoading) {
      return <FilterSkeleton />;
    }

    if (Object.keys(filteredItems).length === 0) {
      return <p className="text-center">No results</p>;
    }

    const filteredIds = Object.keys(filteredItems);

    return filteredIds.map((itemId, index) => {
      const isChecked = selectedItems.includes(itemId);
      const itemName = getItemName(items[itemId]);

      return (
        <label
          className={`inline-flex items-center py-0.5 mt-3 rounded-md cursor-pointer ${
            isChecked && "bg-gray-200"
          }`}
          key={index}
        >
          <input
            id={itemId}
            type="checkbox"
            className="form-checkbox h-6 w-6 text-green-600 rounded-md ml-2 focus:ring-0 "
            checked={isChecked}
            onChange={() => onSelect(itemId)}
          />
          {getIcon && (
            <img
              className={`object-cover h-${iconSize} ml-4`}
              src={getIcon(itemId)}
            />
          )}
          <span className="text-xs font-semibold text-gray-500 ml-4">
            {itemName}
          </span>
        </label>
      );
    });
  }

  function footerSummary() {
    return (
      <p>
        {selectedItemsNum} of {totalItemsNum}
      </p>
    );
  }

  return (
    <Modal
      title={title}
      onClose={onClose}
      onSubmit={() => onSubmit(selectedItems)}
      footerSummary={isFooterSummary ? footerSummary : null}
      isOpen={isOpen}
    >
      <div className="p-2">
        {isSearch && (
          <Search
            onSearch={onSearch}
            placeholder={searchPlaceholder}
            bgColor="bg-gray-200"
          />
        )}
        <div className="flex items-center justify-between mx-2 mt-2">
          <button
            className="text-md text-blue-400 uppercase font-semibold"
            onClick={onSelectAll}
          >
            Select all
          </button>
          <button
            className="text-md text-blue-400 uppercase font-semibold"
            onClick={onClear}
          >
            Clear
          </button>
        </div>
        <div className="flex flex-col mb-2">{renderOptions()}</div>
      </div>
    </Modal>
  );
}
