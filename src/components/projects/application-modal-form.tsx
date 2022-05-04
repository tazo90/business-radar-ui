import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import { DialogFooter } from "@components/ui/dialog";
import { Form, TextField } from "@components/ui/form/fields";
import SelectField from "@components/ui/form/select";
import showToast from "@lib/notification";
import { inferQueryOutput, trpc } from "@lib/trpc";
import { XIcon } from "@heroicons/react/solid";

export type TApplication = inferQueryOutput<"api.application.all">[number];

type ApplicationModalFormProps = {
  projectSlug: string;
  onClose: () => void;
};

export default function ApplicationModalForm(props: ApplicationModalFormProps) {
  const utils = trpc.useContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [brands, setBrands] = useState([]);
  const [countries, setCountries] = useState([]);
  const form = useForm();

  const { data: organization, isLoading } = trpc.useQuery(
    ["api.organization.get", { slug: "amrest" }],
    {
      select: (data) => {
        return {
          ...data,
          brands: data?.brands.map((brand) => {
            return {
              id: brand.id,
              label: brand.fullName,
            };
          }),
          countries: data?.countries.map((country) => {
            return {
              id: country.id,
              label: country.name,
            };
          }),
        };
      },
    }
  );

  const createApp = trpc.useMutation("api.application.add", {
    onSuccess() {
      showToast("Finished", "success");
      utils.invalidateQueries(["api.application.all"]);
      props.onClose();
    },
    onError(err) {
      setErrorMessage(err.message);
    },
  });

  return (
    <>
      <div className="max-w-lg mx-auto py-4 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Create consumer</h2>
          <button onClick={props.onClose}>
            <XIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Form
        form={form}
        handleSubmit={(values) => {
          const payload = {
            ...values,
            projectSlug: props.projectSlug,
            brands: brands.map((brand) => {
              return { id: brand };
            }),
            countries: countries.map((country) => {
              return { id: country };
            }),
          };
          createApp.mutate(payload);
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
            id="brands"
            label="Brands"
            isMulti={true}
            // value={selectedLanguage || props.localeProp}
            onChange={(v) => v && setBrands(v.map((k) => k.id))}
            className="mt-1 block w-full rounded-sm capitalize shadow-sm  sm:text-sm"
            options={organization?.brands}
          />
          <SelectField
            id="countries"
            label="Countries"
            isMulti={true}
            // value={selectedLanguage || props.localeProp}
            onChange={(v) => v && setCountries(v.map((k) => k.id))}
            className="mt-1 block w-full rounded-sm capitalize shadow-sm  sm:text-sm"
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
        <DialogFooter>
          <div className="flex justify-between">
            <Button
              type="button"
              color="secondary"
              onClick={() => props.onChangeStep(0)}
              tabIndex={-1}
            >
              Back
            </Button>
            <Button type="submit" loading={form.formState.isSubmitting}>
              Create
            </Button>
          </div>
        </DialogFooter>
      </Form>
    </>
  );
}
