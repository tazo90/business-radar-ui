import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@components/ui/button";
import { Dialog } from "@components/ui/dialog";
import { Form, TextField } from "@components/ui/form/fields";
import showToast from "@lib/notification";
import { inferQueryOutput, trpc } from "@lib/trpc";

export type TProject = inferQueryOutput<"api.project.all">[number];

type ProjectAddModalProps = {
  defaultValues?: Omit<TProject, "name">;
  onClose: () => void;
};

export default function ProjectAddModal(props: ProjectAddModalProps) {
  const utils = trpc.useContext();
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm({ defaultValues: props.defaultValues });

  const createProject = trpc.useMutation("api.project.add", {
    onSuccess() {
      showToast("Finished", "success");
      utils.invalidateQueries(["api.project.all"]);
      props.onClose();
    },
    onError(err) {
      setErrorMessage(err.message);
    },
  });

  return (
    <Dialog.Content>
      <Dialog.Header title="Create project" onClose={props.onClose} />
      <Form<Omit<TProject, "name">>
        form={form}
        handleSubmit={async (event) => createProject.mutate(event)}
        className="space-y-4"
      >
        <div className="py-4 px-6">
          <TextField
            label="Name"
            placeholder="Type name of project"
            {...form.register("name", { required: true })}
            type="text"
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
