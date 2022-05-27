import { ChevronRightIcon, UsersIcon } from "@heroicons/react/solid";

export function StoreDetailJobs({ jobs, onJobClick }) {
  return (
    <div className="mt-4 max-w-5xl px-4 sm:px-6 lg:px-8">
      <ul
        role="list"
        className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
      >
        {jobs.map((job) => (
          <li key={job.title}>
            <a href="#" className="group block" onClick={() => onJobClick(job)}>
              <div className="flex items-center py-5 px-4 bg-gray-100 rounded-md">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="w-full flex justify-between px-4">
                    <div>
                      <p className="text-sm font-medium text-purple-600 truncate">
                        {job.title}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <UsersIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">{job.category}</span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <div className="bg-green-200 rounded-lg w-20">
                          <p className="text-sm text-green-700 text-center font-semibold">
                            {job.fullTime}
                          </p>
                        </div>
                        <p className="mt-2 flex items-center text-sm text-gray-500 font-semibold">
                          <span className="pr-2">Job role: Manager</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
