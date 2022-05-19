import DashboardLayout from "@components/layouts/dashboard";
import DetailedLayout from "@components/layouts/detailed";
import Button from "@components/ui/button";
import Card from "@components/ui/card";
import { Form, TextField } from "@components/ui/form/fields";
import dayjs from "dayjs";
import { PencilAltIcon } from "@heroicons/react/outline";
import {
  ClipboardCopyIcon,
  CubeIcon,
  EyeIcon,
  LocationMarkerIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import showToast from "@lib/notification";
import { inferQueryOutput, trpc } from "@lib/trpc";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SelectField from "@components/ui/form/select";
import { ApplicationConsumerStatus } from "@prisma/client";
import ResourcesInfo from "@components/common/resources-info";
import { ConfirmDialog } from "@components/ui/dialog/confirm-dialog";
import { Dialog } from "@components/ui/dialog";

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

export const MenuHeader = (props: { title: string }) => (
  <div className="flex items-center">
    <div className="flex p-2 text-gray-900 text-xs font-medium bg-yellow-400 rounded-md">
      <LocationMarkerIcon className="h-4 w-4" />
    </div>
    {/* <h3 className="ml-2 text-gray-900 text-md font-semibold truncate">
      Stores - {props.title}
    </h3> */}
    <div className="flex flex-col pl-3 leading-none">
      <span>Stores</span>
      <span className="text-xs">{props.title}</span>
    </div>
  </div>
);

type Consumer = inferQueryOutput<"api.consumer.get">;

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
      brands: null,
      countries: null,
    },
  });

  const { data: organization, isLoading } = trpc.useQuery([
    "api.organization.get",
    { slug: "amrest" },
  ]);

  useEffect(() => {
    if (defaultValues) {
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
          <SelectField
            name="status"
            label="Status"
            control={form.control}
            placeholder="Select status"
            editing={editing}
            wrapperClassName="col-span-4 sm:col-span-2"
            className="mt-1 block w-full rounded-sm capitalize shadow-sm sm:text-sm"
            options={Object.keys(ApplicationConsumerStatus).map((k) => ({
              value: k,
              label: k,
            }))}
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
          <SelectField
            name="brands"
            label="Brands"
            control={form.control}
            placeholder="Select brands"
            isMulti={true}
            editing={editing}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.fullName}
            wrapperClassName="col-span-4 sm:col-span-2"
            className="mt-1 block w-full rounded-sm capitalize shadow-sm sm:text-sm"
            options={organization?.brands}
            renderValue={(items) => (
              <ResourcesInfo
                organization="amrest"
                type="brands"
                nameField="fullName"
                iconField="name"
                items={items}
              />
            )}
          />
          <SelectField
            name="countries"
            label="Countries"
            control={form.control}
            placeholder="Select countries"
            isMulti={true}
            editing={editing}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.name}
            wrapperClassName="col-span-4 sm:col-span-2"
            className="mt-1 block w-full rounded-sm capitalize shadow-sm sm:text-sm"
            options={organization?.countries}
            renderValue={(items) => (
              <ResourcesInfo
                type="flags"
                nameField="name"
                iconField="code"
                items={items}
              />
            )}
          />
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

function EmbedCode(props: Consumer) {
  const locationOrigin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const appType = props.appType?.toLowerCase();

  const widgetCode = `<div
  id="${appType}" 
  click-disabled="true" 
  api-key="${props.apiKey}" 
/>

<script async defer src="${locationOrigin}/static/widgets/vendor.js"></script>
<script async defer src="${locationOrigin}/static/widgets/${appType}.js"></script>`;

  return (
    <Card>
      <Card.Header
        title="Embed Code"
        action={
          <>
            <ClipboardCopyIcon
              className="cursor-pointer w-5 h-5 text-gray-700"
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(widgetCode);
              }}
            />
          </>
        }
      />
      <Card.Content as="div">
        <div className="flex w-full bg-slate-100 rounded-md text-sm p-4">
          <pre>
            <code>{widgetCode}</code>
          </pre>
        </div>
      </Card.Content>
    </Card>
  );
}

function DangerZone(props: { onDelete: any }) {
  const { onDelete } = props;

  return (
    <Card>
      <Card.Header title="Danger zone" />
      <Card.Content>
        <Dialog>
          <Dialog.Trigger>
            <Button
              color="warn"
              StartIcon={TrashIcon}
              className="border-2 border-red-700 text-white"
            >
              Delete consumer
            </Button>
          </Dialog.Trigger>
          <ConfirmDialog
            variety="danger"
            title="Delete consumer"
            confirmBtn={<Button color="warn">Confirm delete consumer</Button>}
            onConfirm={onDelete}
          >
            Are you sure you want to remove consumer?
          </ConfirmDialog>
        </Dialog>
      </Card.Content>
    </Card>
  );
}

export default function ConsumerPage() {
  const { query, isReady, push } = useRouter();
  const utils = trpc.useContext();
  const [editing, setEditing] = useState<boolean | null>(false);

  const { data } = trpc.useQuery(["api.consumer.get", { uid: query.id }], {
    enabled: isReady,
  });

  const deleteConsumer = trpc.useMutation("api.consumer.delete", {
    async onSuccess() {
      await utils.invalidateQueries(["api.consumer.all"]);
      push("/apps/stores/consumers/");
      showToast("Consumer removed", "success");
    },
    async onError(err) {
      showToast(err.message, "error");
    },
  });

  return (
    <DetailedLayout
      pageMenu={appMenu}
      pageMenuHeader={<MenuHeader title={data?.title} />}
    >
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <ConsumerForm
          defaultValues={data}
          setEditing={setEditing}
          editing={editing}
        />
        <EmbedCode appType={data?.application?.type} apiKey={data?.apiKey} />
        <DangerZone onDelete={() => deleteConsumer.mutate({ uid: query.id })} />
      </div>
    </DetailedLayout>
  );
}

ConsumerPage.Layout = DashboardLayout;
