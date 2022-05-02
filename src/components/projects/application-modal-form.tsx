import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import { DialogFooter } from "@components/ui/dialog";
import { Form, TextField } from "@components/ui/form/fields";
import SelectField from "@components/ui/form/select";
import showToast from "@lib/notification";
import { inferQueryOutput, trpc } from "@lib/trpc";
import { ChevronRightIcon, XIcon } from "@heroicons/react/solid";
import {
  CalendarIcon,
  SpeakerphoneIcon,
  TerminalIcon,
} from "@heroicons/react/outline";
import { classNames } from "@lib/classnames";

export type TApplication = inferQueryOutput<"api.application.all">[number];

type ApplicationModalFormProps = {
  projectSlug: string;
  onClose: () => void;
};

const items = [
  {
    name: "Stores",
    description: "Find your stores and easily manage them.",
    href: "#",
    iconColor: "bg-pink-500",
    icon: SpeakerphoneIcon,
  },
  {
    name: "Jobs",
    description: "Manage job offers from your stores.",
    href: "#",
    iconColor: "bg-purple-500",
    icon: TerminalIcon,
  },
  {
    name: "ECommerce",
    description: "Easily integrate ordering from your stores.",
    href: "#",
    iconColor: "bg-yellow-500",
    icon: CalendarIcon,
  },
  {
    name: "Trainings",
    description: "Watch progress of teams.",
    href: "#",
    iconColor: "bg-slate-500",
    icon: CalendarIcon,
  },
];

function StepHeader(props) {
  return (
    <div className={props.className}>
      <div className={`flex items-center justify-between`}>
        <h2 className="text-lg font-medium text-gray-900">{props.title}</h2>
        <button onClick={props.onClose}>
          <XIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-1 text-sm text-gray-500">{props.description}</p>
    </div>
  );
}

function AppListStep(props) {
  return (
    <div className="max-w-lg mx-auto py-4 px-5">
      <StepHeader
        title="Choose application"
        description="Get started by selecting a template or start from an empty project."
        onClose={props.onClose}
      />
      <ul
        role="list"
        className="mt-6 border-t border-b border-gray-200 divide-y divide-gray-200"
      >
        {items.map((item, itemIdx) => (
          <li key={itemIdx} onClick={() => props.onSelectApp(item)}>
            <div className="relative group py-4 flex items-start space-x-3">
              <div className="flex-shrink-0">
                <span
                  className={classNames(
                    item.iconColor,
                    "inline-flex items-center justify-center h-10 w-10 rounded-lg"
                  )}
                >
                  <item.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">
                  <a href={item.href}>
                    <span className="absolute inset-0" aria-hidden="true" />
                    {item.name}
                  </a>
                </div>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <div className="flex-shrink-0 self-center">
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex">
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Or find another application in store
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  );
}

function AppDetailStep(props) {
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
      <StepHeader
        className="max-w-lg mx-auto py-4 px-5"
        title={`${props.app.name} application details`}
        description="Get started by selecting a template."
        onClose={props.onClose}
      />
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

export default function ApplicationModalForm(props: ApplicationModalFormProps) {
  const [app, setApp] = useState(null);
  const [step, setStep] = useState(0);

  function onSelectApp(app) {
    setApp(app);
    setStep(1);
  }

  return (
    <>
      {step === 0 && <AppListStep {...props} onSelectApp={onSelectApp} />}
      {step === 1 && (
        <AppDetailStep {...props} app={app} onChangeStep={setStep} />
      )}
    </>
  );
}
