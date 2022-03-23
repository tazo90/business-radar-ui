export function ListboxItemSummary() {
  return (
    <div className="flex justify-end">
      <div className="flex flex-col font-semibold">
        <p>Empl:</p>
        <p>Jobs:</p>
        <p>Train:</p>
      </div>
      <div className="flex flex-col items-end ml-2">
        <p>10</p>
        <p>2</p>
        <p>90%</p>
      </div>
    </div>
  );
}
