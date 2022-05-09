import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import Card from "@components/ui/card";
import { Form, TextField } from "@components/ui/form/fields";
import {
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

import { useForm } from "react-hook-form";

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

function ProfileForm() {
  const form = useForm();

  return (
    <Form
      form={form}
      handleSubmit={(values) => console.log("SUBMIT", values)}
      className="space-y-6"
    >
      <Card>
        <Card.Header title="Profile" subtitle="Edit your profile information" />
        <Card.Content>
          <TextField
            label="Username"
            {...form.register("username", { required: true })}
            type="text"
            wrapperClassName="col-span-4 sm:col-span-2"
          />
          <TextField
            label="Name"
            {...form.register("name", { required: true })}
            type="text"
            wrapperClassName="col-span-4 sm:col-span-2"
          />
          <TextField
            label="Email"
            {...form.register("email", { required: true })}
            type="text"
            wrapperClassName="col-span-4 sm:col-span-2"
          />
        </Card.Content>
        <Card.Footer>
          <button
            type="submit"
            className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Save
          </button>
        </Card.Footer>
      </Card>
    </Form>
  );
}

export default function ProfilePage() {
  return (
    <DetailedLayout pageMenu={appMenu}>
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <ProfileForm />
      </div>
    </DetailedLayout>
  );
}

ProfilePage.Layout = DashboardLayout;
