import { NextPageContext } from "next";

import { getSession } from "@lib/auth";
import DashboardLayout from "@components/layouts/dashboard";

export default function AppPage() {
  return <div>App</div>;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session?.user?.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/apps/stores",
    },
  };
}

AppPage.Layout = DashboardLayout;
