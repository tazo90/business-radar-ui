import DashboardLayout from "@components/layouts/dashboard";
import { useRouter } from "next/router";

export default function ProjectAppPage() {
  const router = useRouter();

  return <div>App details {router.query.id}</div>;
}

ProjectAppPage.Layout = DashboardLayout;
