import { useId } from "@radix-ui/react-id";
import { forwardRef, ReactElement, ReactNode, Ref } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";

import { getErrorFromUnknown } from "@lib/errors";
import showToast from "@lib/notification";

import { Alert } from "../alert";
import { classNames } from "@lib/classnames";
import SkeletonLoader from "./skeleton-loader";

type InputProps = Omit<JSX.IntrinsicElements["input"], "name"> & {
  name: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      className={classNames(
        "mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-800 sm:text-sm",
        props.className
      )}
    />
  );
});

export function Text(props: JSX.IntrinsicElements["span"]) {
  return (
    <span
      {...props}
      className={classNames(
        "block text-sm font-normal text-gray-700 pt-1",
        props.className
      )}
    >
      {props.children}
    </span>
  );
}

export function Label(props: JSX.IntrinsicElements["label"]) {
  return (
    <label
      {...props}
      className={classNames(
        "block text-sm font-medium text-gray-700",
        props.className
      )}
    >
      {props.children}
    </label>
  );
}

export function InputLeading(props: JSX.IntrinsicElements["div"]) {
  return (
    <span className="inline-flex flex-shrink-0 items-center rounded-l-sm border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
      {props.children}
    </span>
  );
}

type InputFieldProps = {
  label?: ReactNode;
  wrapperClassName?: string;
  addOnLeading?: ReactNode;
  editing?: boolean;
} & React.ComponentProps<typeof Input> & {
    labelProps?: React.ComponentProps<typeof Label>;
  };

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(props, ref) {
    const id = useId();
    const methods = useFormContext();
    const {
      label = props.name,
      labelProps,
      placeholder = props.name + "_placeholder" !== props.name + "_placeholder"
        ? props.name + "_placeholder"
        : "",
      className,
      addOnLeading,
      wrapperClassName,
      editing = null,
      disabled,
      ...passThrough
    } = props;

    const value = methods.getValues()[props.name];

    return (
      <div className={wrapperClassName}>
        {!!props.name && (
          <Label htmlFor={id} {...labelProps}>
            {label}
          </Label>
        )}
        {addOnLeading ? (
          <div className="mt-1 flex rounded-md shadow-sm">
            {addOnLeading}
            <Input
              id={id}
              placeholder={placeholder}
              className={classNames(
                className,
                "mt-0",
                addOnLeading && "rounded-l-none",
                editing === false && "hidden",
                disabled && "bg-gray-200"
              )}
              {...passThrough}
              ref={ref}
            />
          </div>
        ) : (
          <Input
            id={id}
            placeholder={placeholder}
            className={classNames(
              className,
              editing === false && "hidden",
              disabled && "bg-gray-200"
            )}
            {...passThrough}
            ref={ref}
          />
        )}

        <SkeletonOrText editing={editing} value={value} />

        {methods?.formState?.errors[props.name] && (
          <Alert
            className="mt-1"
            severity="error"
            message={methods.formState.errors[props.name].message}
          />
        )}
      </div>
    );
  }
);

export const TextField = forwardRef<HTMLInputElement, InputFieldProps>(
  function TextField(props, ref) {
    return <InputField ref={ref} {...props} />;
  }
);

export const PasswordField = forwardRef<HTMLInputElement, InputFieldProps>(
  function PasswordField(props, ref) {
    return <InputField type="password" ref={ref} {...props} />;
  }
);

export const EmailInput = forwardRef<HTMLInputElement, InputFieldProps>(
  function EmailInput(props, ref) {
    return (
      <Input
        ref={ref}
        type="email"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        inputMode="email"
        {...props}
      />
    );
  }
);

export const EmailField = forwardRef<HTMLInputElement, InputFieldProps>(
  function EmailField(props, ref) {
    return (
      <InputField
        ref={ref}
        type="email"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        inputMode="email"
        {...props}
      />
    );
  }
);

type TextAreaProps = Omit<JSX.IntrinsicElements["textarea"], "name"> & {
  name: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextAreaInput(props, ref) {
    return (
      <textarea
        ref={ref}
        {...props}
        className={classNames(
          "block w-full rounded-sm border-gray-300 font-mono shadow-sm focus:border-neutral-900 focus:ring-neutral-900 sm:text-sm",
          props.className
        )}
      />
    );
  }
);

type TextAreaFieldProps = {
  label?: ReactNode;
} & React.ComponentProps<typeof TextArea> & {
    labelProps?: React.ComponentProps<typeof Label>;
  };

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  TextAreaFieldProps
>(function TextField(props, ref) {
  const id = useId();
  const methods = useFormContext();
  const {
    label = props.name as string,
    labelProps,
    placeholder = props.name + "_placeholder" !== props.name + "_placeholder"
      ? props.name + "_placeholder"
      : "",
    ...passThrough
  } = props;
  return (
    <div>
      {!!props.name && (
        <Label htmlFor={id} {...labelProps}>
          {label}
        </Label>
      )}
      <TextArea ref={ref} placeholder={placeholder} {...passThrough} />
      {methods?.formState?.errors[props.name] && (
        <Alert
          className="mt-1"
          severity="error"
          message={methods.formState.errors[props.name].message}
        />
      )}
    </div>
  );
});

type FormProps<T> = {
  form: UseFormReturn<T>;
  handleSubmit: SubmitHandler<T>;
} & Omit<JSX.IntrinsicElements["form"], "onSubmit">;

const PlainForm = <T extends FieldValues>(
  props: FormProps<T>,
  ref: Ref<HTMLFormElement>
) => {
  const { form, handleSubmit, ...passThrough } = props;

  return (
    <FormProvider {...form}>
      <form
        ref={ref}
        onSubmit={(event) => {
          form
            .handleSubmit(handleSubmit)(event)
            .catch((err) => {
              showToast(`${getErrorFromUnknown(err).message}`, "error");
            });
        }}
        {...passThrough}
      >
        {props.children}
      </form>
    </FormProvider>
  );
};

export const Form = forwardRef(PlainForm) as <T extends FieldValues>(
  p: FormProps<T> & { ref?: Ref<HTMLFormElement> }
) => ReactElement;

export function FieldsetLegend(props: JSX.IntrinsicElements["legend"]) {
  return (
    <legend
      {...props}
      className={classNames(
        "text-sm font-medium text-gray-700",
        props.className
      )}
    >
      {props.children}
    </legend>
  );
}

export function InputGroupBox(props: JSX.IntrinsicElements["div"]) {
  return (
    <div
      {...props}
      className={classNames(
        "space-y-2 rounded-sm border border-gray-300 bg-white p-2",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

export function SkeletonOrText(props: {
  editing: boolean | null;
  value: string;
}) {
  const { editing, value } = props;
  if (editing === false) {
    if (value === null) {
      return <SkeletonLoader />;
    }

    return <Text>{value}</Text>;
  } else {
    return null;
  }
}
