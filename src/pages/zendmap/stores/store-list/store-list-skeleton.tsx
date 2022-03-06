const DEFAULT_ITEMS_NUM = 8;

export function StoreListSkeleton({ itemsNum = DEFAULT_ITEMS_NUM }) {
  return Array.from({ length: itemsNum }, () => {
    return (
      <div className="animate-pulse flex space-x-4 h-36 my-1">
        <div className="rounded-2xl bg-slate-200 h-24 w-1/4"></div>
        <div className="flex-1 space-y-4 py-1 w-2/4">
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-10">
              <div className="h-8 rounded-3xl bg-slate-200 col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    );
  });
}
