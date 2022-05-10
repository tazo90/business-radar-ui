export default function SkeletonLoader() {
  return (
    <ul className="-mx-4 animate-pulse divide-y divide-neutral-200 rounded-smbg-white sm:mx-0 sm:overflow-hidden">
      <SkeletonItem />
    </ul>
  );
}

function SkeletonItem() {
  return (
    <li className="group flex w-full items-center justify-between mt-2">
      <div className="flex-grow truncate text-sm">
        <div className="flex justify-start">
          <div className="space-y-2">
            <div className="h-4 w-52 rounded-md bg-gray-200"></div>
          </div>
        </div>
      </div>
    </li>
  );
}
