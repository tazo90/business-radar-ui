import DashboardLayout from "@components/layouts/dashboard";
import { trpc } from "@lib/trpc";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ProjectPage() {
  const router = useRouter();
  const utils = trpc.useContext();

  const { slug } = router.query;

  const { data: project, isLoading } = trpc.useQuery(
    ["api.project.get", { slug }],
    {
      refetchOnWindowFocus: false,
      onError: (e) => {
        console.log("ERROR", e);
        // setErrorMessage(e.message);
      },
    }
  );

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        {/* Page title & actions */}
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Project {project?.name}
            </h1>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-0">
            <button
              type="button"
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              Create application
            </button>
          </div>
        </div>

        <ul>
          <li>
            <Link href={`/projects/${slug}/`}>Overview</Link>
          </li>
          <li>
            <Link href={`/projects/${slug}/apps`}>Apps</Link>
          </li>
          <li>
            <Link href={`/projects/${slug}/members`}>Members</Link>
          </li>
        </ul>
      </main>
    </div>
  );
}

ProjectPage.Layout = DashboardLayout;
