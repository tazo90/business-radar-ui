import { Rating } from "../../ui/rating";

export function ListboxItemRating() {
  return (
    <div className="flex flex-col items-end text-xs font-semibold">
      <Rating count={120} rate={3.6} textSize="text-xs" />
    </div>
  );
}
