const DEFAULT_ITEMS_NUM = 8;

export function FilterSkeleton({ itemsNum = DEFAULT_ITEMS_NUM }) {
  const skeletons = Array.from({ length: itemsNum }, (value, index) => {
    return (
      <div
        className="animate-pulse flex justify-center items-center space-x-4 my-1 mx-2"
        key={index}
      >
        <div className="rounded-md bg-slate-200 h-6 w-6"></div>
        <div className="rounded-md bg-slate-200 h-6 w-6"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-6 rounded-3xl bg-slate-200 w-1/2"></div>
        </div>
      </div>
    );
  });

  return <>{skeletons}</>;
}
