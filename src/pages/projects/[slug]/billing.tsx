import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import { projectMenu } from ".";

export default function ProjectBillingPage() {
  return (
    <DetailedLayout pageMenu={projectMenu} pageTitle="Plan & Billing">
      Billing page
    </DetailedLayout>
  );
}

ProjectBillingPage.Layout = DashboardLayout;
