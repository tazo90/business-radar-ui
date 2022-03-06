import { StoreListRow } from "./store-list-row";

export function StoreList({ stores }) {
  return (
    <ul>
      {stores?.map((store) => (
        <StoreListRow store={store.properties} />
      ))}
    </ul>
  );
}
