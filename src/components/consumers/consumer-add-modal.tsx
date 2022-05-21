import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import { Dialog } from "@components/ui/dialog";
import { Form, TextField } from "@components/ui/form/fields";
import SelectField from "@components/ui/form/select";
import showToast from "@lib/notification";
import { inferQueryOutput, trpc } from "@lib/trpc";
import { ApplicationType } from "@prisma/client";

export type TConsumer = inferQueryOutput<"api.consumer.all">[number];

type ConsumerAddModalProps = {
  application: string | string[];
  onClose: () => void;
};

export default function ConsumerAddModal(props: ConsumerAddModalProps) {
  const utils = trpc.useContext();
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm({
    defaultValues: {
      project: null,
    },
  });

  const { data: organization } = trpc.useQuery([
    "api.organization.get",
    { slug: "amrest" },
  ]);

  const { data: projects } = trpc.useQuery(["api.project.all"]);

  const consumerAdd = trpc.useMutation("api.consumer.add", {
    async onSuccess() {
      showToast("Customer created", "success");
      await utils.invalidateQueries(["api.consumer.all"]);
      props.onClose();
    },
    onError(err) {
      setErrorMessage(err.message);
    },
  });

  return (
    <Dialog.Content>
      <Dialog.Header title="Create consumer" onClose={props.onClose} />
      <Form
        form={form}
        handleSubmit={async (values) => {
          const payload = {
            ...values,
            application: props.application,
          };
          consumerAdd.mutate(payload);
        }}
        className="space-y-4"
      >
        <div className="py-4 px-5 space-y-4">
          <TextField
            label="Title"
            placeholder="Type title of application"
            {...form.register("title", { required: true })}
            type="text"
          />
          <TextField
            label="Description"
            placeholder="Type description of application"
            {...form.register("description", { required: true })}
            type="text"
          />
          <SelectField
            name="project"
            label="Project"
            control={form.control}
            placeholder="Select project"
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.name}
            className="mt-1 block w-full rounded-sm capitalize shadow-sm sm:text-sm"
            options={projects}
          />
          <SelectField
            name="brands"
            label="Brands"
            control={form.control}
            placeholder="Select brands"
            isMulti={true}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.fullName}
            className="mt-1 block w-full rounded-sm capitalize shadow-sm sm:text-sm"
            options={organization?.brands}
          />
          <SelectField
            name="countries"
            label="Countries"
            isMulti={true}
            placeholder="Select countries"
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.name}
            onChange={(v) => v && setCountries(v.map((k) => k.id))}
            className="mt-1 block w-full rounded-sm capitalize shadow-sm sm:text-sm"
            options={organization?.countries}
          />
          <TextField
            label="Domain"
            placeholder="Type domain"
            {...form.register("domain", { required: true })}
            type="text"
            addOnLeading={
              <span className="inline-flex items-center rounded-l-sm border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                https://
              </span>
            }
          />
          {errorMessage && (
            <p className="pt-3 text-sm text-red-700">
              <span className="font-bold">Error: </span>
              {errorMessage}
            </p>
          )}
        </div>
        <Dialog.Footer>
          <Button type="button" color="primary" onClick={props.onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            color="secondary"
            loading={form.formState.isSubmitting}
          >
            Create
          </Button>
        </Dialog.Footer>
      </Form>
    </Dialog.Content>
  );
}
