import Button from "@components/ui/button";
import { DialogFooter } from "@components/ui/dialog";
import { Form, TextField } from "@components/ui/form/fields";
import SelectField from "@components/ui/form/select";
import showToast from "@lib/notification";
import { inferQueryOutput, trpc } from "@lib/trpc";
import { useState } from "react";
import { useForm } from "react-hook-form";

export type TApplication = inferQueryOutput<"api.application.all">[number];

type ApplicationModalFormProps = {
  projectSlug: string;
  onClose: () => void;
};

export default function ApplicationModalForm(props: ApplicationModalFormProps) {
  const utils = trpc.useContext();
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm();

  const createApp = trpc.useMutation("api.application.add", {
    onSuccess() {
      console.log("SAVED app");
    },
    onError(err) {
      setErrorMessage(err.message);
    },
  });

  console.log("APP MODAL", props.projectSlug);

  const options = [
    {
      value: 1,
      label: "Polska",
    },
    {
      value: 2,
      label: "Niemcy",
    },
  ];

  return (
    <Form
      form={form}
      handleSubmit={async (event) => createApp.mutate(event)}
      className="space-y-4"
    >
      <div className="py-4 px-6 space-y-4">
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
        <TextField
          label="Domain"
          placeholder="Type domain"
          {...form.register("description", { required: true })}
          type="text"
        />
        <SelectField
          // name="brands"
          label="Brands"
          // value={selectedLanguage || props.localeProp}
          // onChange={(v) => v && setSelectedLanguage(v)}
          className="mt-1 block w-full rounded-sm capitalize shadow-sm  sm:text-sm"
          options={options}
          {...form.register("brands", { required: true })}
        />
        {errorMessage && (
          <p className="pt-3 text-sm text-red-700">
            <span className="font-bold">Error: </span>
            {errorMessage}
          </p>
        )}
      </div>
      <DialogFooter>
        <Button
          type="button"
          color="secondary"
          onClick={props.onClose}
          tabIndex={-1}
        >
          Cancel
        </Button>
        <Button type="submit" loading={form.formState.isSubmitting}>
          Create
        </Button>
      </DialogFooter>
    </Form>
  );
}
