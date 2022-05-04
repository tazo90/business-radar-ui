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
    name: "Password",
    href: "/settings/password",
    icon: KeyIcon,
  },
  {
    name: "Billing", //"Embeedings"?,
    href: "/settings/billing",
    icon: CreditCardIcon,
  },
];

export default function ProfilePage() {
  const { query } = useRouter();

  return <DetailedLayout pageMenu={appMenu}>Profile</DetailedLayout>;
}

ProfilePage.Layout = DashboardLayout;
