import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import { projectMenu } from ".";

export default function ProjectTeamPage() {
  return (
    <DetailedLayout pageMenu={projectMenu} pageTitle="Team">
      Billing page
    </DetailedLayout>
  );
}

ProjectTeamPage.Layout = DashboardLayout;
