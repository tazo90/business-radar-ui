import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import Button from "@components/ui/button";
import Card from "@components/ui/card";
import { Form, TextField } from "@components/ui/form/fields";
import { PencilAltIcon } from "@heroicons/react/outline";
import {
  CubeIcon,
  EyeIcon,
  LocationMarkerIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const appMenu = [
  {
    name: "Overview",
    href: "/apps/:name/consumers/:id/overview",
    icon: PencilAltIcon,
  },
  {
    name: "Application",
    href: "/apps/:name/consumers/:id/app",
    icon: EyeIcon,
  },
  {
    name: "Components",
    href: "/apps/:name/consumers/:id/components",
    disabled: true,
    icon: CubeIcon,
  },
];

export const MenuHeader = () => (
  <div className="flex items-center">
    <div className="flex p-2 text-gray-900 text-xs font-medium bg-yellow-400 rounded-md">
      <LocationMarkerIcon className="h-4 w-4" />
    </div>
    <h3 className="ml-2 text-gray-900 text-md font-semibold truncate">
      Stores - AmSpace
    </h3>
  </div>
);

type FormValues = {
  title: string;
  domain: string;
};

type ConsumerFormProps = {
  defaultValues?: FormValues;
  editing: boolean;
  setEditing: () => void;
};

function ConsumerForm(props: ConsumerFormProps) {
  const { defaultValues, editing, setEditing } = props;
  const form = useForm({
    defaultValues: props.defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <Form
      form={form}
      handleSubmit={(values) => console.log("SUBMIT", values)}
      className="space-y-6"
    >
      <Card>
        <Card.Header
          title="Overview"
          action={
            <>
              {!editing && (
                <PencilIcon
                  className="cursor-pointer w-5 h-5"
                  onClick={() => setEditing(true)}
                />
              )}
            </>
          }
        />
        <Card.Content>
          <TextField
            label="Title"
            editing={editing}
            {...form.register("title", { required: true })}
            type="text"
            wrapperClassName="col-span-4 sm:col-span-2"
          />
          <TextField
            label="Description"
            editing={editing}
            {...form.register("description", { required: true })}
            type="text"
            wrapperClassName="col-span-4 sm:col-span-2"
          />
          <TextField
            label="Status"
            editing={editing}
            {...form.register("status", { required: true })}
            type="text"
            wrapperClassName="col-span-4 sm:col-span-2"
          />
          <TextField
            label="Domain"
            editing={editing}
            {...form.register("domain", { required: true })}
            type="text"
            wrapperClassName="col-span-4 sm:col-span-2"
          />
          <TextField
            label="Expires"
            editing={editing}
            {...form.register("expires", { required: true })}
            type="text"
            disabled={true}
            wrapperClassName="col-span-4 sm:col-span-2"
          />
          <TextField
            label="API Key"
            editing={editing}
            {...form.register("apiKey", { required: true })}
            type="text"
            disabled={true}
            wrapperClassName="col-span-4 sm:col-span-2"
          />
        </Card.Content>
        {editing && (
          <Card.Footer>
            <>
              <Button color="secondary" className="mr-2">
                Save
              </Button>
              <Button onClick={() => setEditing(false)}>Cancel</Button>
            </>
          </Card.Footer>
        )}
      </Card>
    </Form>
  );
}

export default function ConsumerPage() {
  const { query, isReady } = useRouter();
  const [editing, setEditing] = useState<boolean | null>(null);

  const { data } = trpc.useQuery(["api.consumer.get", { uid: query.id }], {
    enabled: isReady,
  });

  return (
    <DetailedLayout pageMenu={appMenu} pageMenuHeader={<MenuHeader />}>
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <ConsumerForm
          defaultValues={data}
          setEditing={setEditing}
          editing={editing}
        />
      </div>
    </DetailedLayout>
  );
}

ConsumerPage.Layout = DashboardLayout;
