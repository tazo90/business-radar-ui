import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import {
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

import { useRouter } from "next/router";

export const appMenu = [
  {
    name: "Profile",
    href: "/settings/profile",
    icon: UserCircleIcon,
  },
  {
    name: "Security",
    href: "/settings/security",
    icon: KeyIcon,
  },
  {
    name: "Billing", //"Embeedings"?,
    href: "/settings/billing",
    icon: CreditCardIcon,
  },
];

export default function SettingsPage() {
  const { query } = useRouter();

  return <DetailedLayout pageMenu={appMenu}>test</DetailedLayout>;
}

SettingsPage.Layout = DashboardLayout;
