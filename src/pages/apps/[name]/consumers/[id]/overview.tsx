import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import Button from "@components/ui/button";
import Card from "@components/ui/card";
import { Form, TextField } from "@components/ui/form/fields";
import dayjs from "dayjs";
import { PencilAltIcon } from "@heroicons/react/outline";
import {
  CubeIcon,
  EyeIcon,
  LocationMarkerIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import showToast from "@lib/notification";
import { trpc } from "@lib/trpc";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SelectField from "@components/ui/form/select";
import { ApplicationConsumerStatus } from "@prisma/client";
import ResourcesInfo from "@components/common/resources-info";

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
  description: string;
  domain: string;
  status: ApplicationConsumerStatus;
  brands: {
    id: number;
    label: string;
  }[];
  countries: {
    id: number;
    label: string;
  }[];
  expires: string;
  apiKey: string;
};

type ConsumerFormProps = {
  defaultValues?: FormValues;
  editing: boolean;
  setEditing: () => void;
};

function ConsumerForm(props: ConsumerFormProps) {
  const { defaultValues, editing, setEditing } = props;

  const [selectedBrands, setSelectedBrands] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState(null);

  const utils = trpc.useContext();
  const form = useForm({
    // @TODO: how to set null automatically for defaultValues
    // instead of empty string?
    defaultValues: {
      title: null,
      description: null,
      status: null,
      domain: null,
      expires: null,
      apiKey: null,
    },
  });

  const { data: organization, isLoading } = trpc.useQuery([
    "api.organization.get",
    { slug: "amrest" },
  ]);

  useEffect(() => {
    if (defaultValues) {
      setSelectedBrands(defaultValues.brands);
      setSelectedCountries(defaultValues.countries);

      form.reset({
        ...defaultValues,
        expires: dayjs(defaultValues.expires).format("DD-MM-YYYY HH:MM"),
      });
    }
  }, [defaultValues]);

  return (
    <Form
      form={form}
      handleSubmit={async (values) => {
        await utils.client.mutation("api.consumer.edit", values);
        await utils.invalidateQueries(["api.consumer.get"]);
        setEditing(false);
        showToast("Consumer updated", "success");
      }}
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
            defaultValue={defaultValues?.title}
          />
          <TextField
            label="Description"
            editing={editing}
            {...form.register("description")}
            type="text"
            wrapperClassName="col-span-4 sm:col-span-2"
            defaultValue={defaultValues?.description}
          />
          <TextField
            label="Status"
            editing={editing}
            {...form.register("status", { required: true })}
            type="text"
            wrapperClassName="col-span-4 sm:col-span-2"
            defaultValue={defaultValues?.status}
          />
          <TextField
            label="Domain"
            editing={editing}
            {...form.register("domain", { required: true })}
            type="text"
            wrapperClassName="col-span-4 sm:col-span-2"
            defaultValue={defaultValues?.domain}
          />
          <TextField
            label="Expires"
            editing={editing}
            {...form.register("expires", { required: true })}
            type="text"
            disabled={true}
            wrapperClassName="col-span-4 sm:col-span-2"
            defaultValue={defaultValues?.expires}
          />
          <TextField
            label="API Key"
            editing={editing}
            {...form.register("apiKey", { required: true })}
            type="text"
            disabled={true}
            wrapperClassName="col-span-4 sm:col-span-2"
            defaultValue={defaultValues?.apiKey}
          />
          {editing ? (
            <SelectField
              id="brands"
              label="Brands"
              isMulti={true}
              placeholder="Select brands"
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.fullName}
              value={selectedBrands}
              onChange={(opts) => opts && setSelectedBrands(opts)}
              wrapperClassName="col-span-4 sm:col-span-2"
              className="mt-1 block w-full rounded-sm capitalize shadow-sm sm:text-sm"
              options={organization?.brands}
            />
          ) : (
            <ResourcesInfo
              organization="amrest"
              type="brands"
              nameField="fullName"
              iconField="name"
              title="Brands"
              items={selectedBrands}
            />
          )}
          {editing ? (
            <SelectField
              id="countries"
              label="Countries"
              isMulti={true}
              placeholder="Select countries"
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              value={selectedCountries}
              onChange={(opts) => opts && setSelectedCountries(opts)}
              wrapperClassName="col-span-4 sm:col-span-2"
              className="mt-1 block w-full rounded-sm capitalize shadow-sm  sm:text-sm"
              options={organization?.countries}
            />
          ) : (
            <ResourcesInfo
              type="flags"
              nameField="name"
              iconField="code"
              title="Countries"
              items={selectedCountries}
            />
          )}
        </Card.Content>
        {editing && (
          <Card.Footer>
            <>
              <Button className="mr-2" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                loading={form.formState.isSubmitting}
                color="secondary"
              >
                Save
              </Button>
            </>
          </Card.Footer>
        )}
      </Card>
    </Form>
  );
}

function EmbedCode() {
  return (
    <Card>
      <Card.Header
        title="Embed Code"
        action={
          <>
            <PencilIcon
              className="cursor-pointer w-5 h-5"
              onClick={() => setEditing(true)}
            />
          </>
        }
      />
      <Card.Content>test</Card.Content>
    </Card>
  );
}

export default function ConsumerPage() {
  const { query, isReady } = useRouter();
  const [editing, setEditing] = useState<boolean | null>(false);

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
        <EmbedCode />
      </div>
    </DetailedLayout>
  );
}

ConsumerPage.Layout = DashboardLayout;
