import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import Card from "@components/ui/card";
import { PencilAltIcon } from "@heroicons/react/outline";
import {
  CogIcon,
  CubeIcon,
  EyeIcon,
  LocationMarkerIcon,
  TerminalIcon,
} from "@heroicons/react/solid";

export const appMenu = [
  {
    name: "Overview",
    href: "/apps/:id",
    icon: PencilAltIcon,
  },
  {
    name: "Widget",
    href: "/apps/:id/widget",
    icon: EyeIcon,
  },
  {
    name: "Consumers", //"Embeedings"?,
    href: "/apps/:id/consumers",
    icon: TerminalIcon,
  },
  {
    name: "Components",
    href: "/apps/:id/components",
    icon: CubeIcon,
    disabled: true,
  },
  {
    name: "Customize",
    href: "/apps/:id/customize",
    icon: CogIcon,
    disabled: true,
  },
  {
    name: "Themes",
    href: "/apps/:id/themes",
    icon: EyeIcon,
    disabled: true,
  },
];

const MenuHeader = () => (
  <div className="flex items-center">
    <div className="flex p-2 text-gray-900 text-xs font-medium bg-yellow-400 rounded-md">
      <LocationMarkerIcon className="h-4 w-4" />
    </div>
    <h3 className="ml-2 text-gray-900 text-md font-semibold truncate">
      Stores
    </h3>
  </div>
);

const payments = [
  {
    id: 1,
    date: "1/1/2022",
    datetime: "2020-01-01",
    description: "Business Plan - Annual Billing",
    amount: "190.00 PLN",
    href: "#",
  },
];

function Consumers() {
  return (
    <Card>
      <Card.Header title="Consumers" />
      <Card.Content as="div" noWrapper={true}>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden border-t border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      {/*
                                  `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                                */}
                      <th
                        scope="col"
                        className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <span className="sr-only">View receipt</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <time dateTime={payment.datetime}>
                            {payment.date}
                          </time>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href={payment.href}
                            className="text-orange-600 hover:text-orange-900"
                          >
                            View receipt
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}

export default function AppPage() {
  return (
    <DetailedLayout pageMenu={appMenu} pageMenuHeader={<MenuHeader />}>
      <Consumers />
    </DetailedLayout>
  );
}

AppPage.Layout = DashboardLayout;
