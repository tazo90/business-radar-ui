import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import Card from "@components/ui/card";
import { Form, TextField } from "@components/ui/form/fields";
import {
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { appMenu } from "./profile";

function PasswordChangeForm() {
  const form = useForm();

  return (
    <Form
      form={form}
      handleSubmit={(values) => console.log("SUBMIT", values)}
      className="space-y-6"
    >
      <Card>
        <Card.Header title="Change password" />
        <Card.Content>
          <TextField
            label="Current password"
            {...form.register("old_password", { required: true })}
            placeholder="Your old password"
            type="text"
            wrapperClassName="col-span-4 sm:col-span-2"
          />
          <TextField
            label="New password"
            {...form.register("new_password", { required: true })}
            placeholder="Your new secure password"
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

export default function PasswordPage() {
  const { query } = useRouter();

  return (
    <DetailedLayout pageMenu={appMenu}>
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <PasswordChangeForm />
      </div>
    </DetailedLayout>
  );
}

PasswordPage.Layout = DashboardLayout;
