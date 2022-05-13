import React, { useEffect, useState } from "react";
import ReactSelect, {
  components,
  GroupBase,
  Props,
  InputProps,
} from "react-select";
import { classNames } from "@lib/classnames";
import { Label, SkeletonOrText } from "./fields";
import { useId } from "@radix-ui/react-id";
import { Controller, useFormContext } from "react-hook-form";

export type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, IsMulti, Group>;

export const InputComponent = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  inputClassName,
  ...props
}: InputProps<Option, IsMulti, Group>) => {
  return (
    <components.Input
      // disables our default form focus hightlight on the react-select input element
      inputClassName={classNames(
        "focus:ring-0 focus:ring-offset-0",
        inputClassName
      )}
      {...props}
    />
  );
};

function SelectInput<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  label,
  editing = true,
  className,
  wrapperClassName,
  value,
  renderValue,
  isMulti,
  ...props
}: SelectProps<Option, IsMulti, Group>) {
  const id = useId();
  const [_document, setDocument] = useState(null);
  const methods = useFormContext();
  const selectedValue = methods.getValues(props.name);

  useEffect(() => {
    setDocument(document);
  }, []);

  if (selectedValue === null) {
    return null;
  }

  return (
    <div className={wrapperClassName}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="mt-1 flex rounded-md">
        {editing ? (
          <ReactSelect
            menuPortalTarget={_document?.body}
            menuPosition="fixed"
            theme={(theme) => ({
              ...theme,
              borderRadius: 2,
              colors: {
                ...theme.colors,
                primary: "var(--brand-color)",

                primary50: "rgba(209 , 213, 219, var(--tw-bg-opacity))",
                primary25: "rgba(244, 245, 246, var(--tw-bg-opacity))",
              },
            })}
            styles={{
              option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? "var(--brand-text-color)" : "black",
                ":active": {
                  backgroundColor: state.isSelected ? "" : "var(--brand-color)",
                  color: "var(--brand-text-color)",
                },
                "&:hover": {
                  background: "#ddd",
                },
              }),
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
            components={{
              ...components,
              IndicatorSeparator: () => null,
              Input: InputComponent,
            }}
            className={classNames("text-sm shadow-sm", className)}
            defaultValue={
              isMulti
                ? selectedValue
                : props.options?.filter(
                    (option) => option.value === selectedValue
                  )[0]
            }
            isMulti={isMulti}
            {...props}
          />
        ) : (
          renderValue && renderValue(selectedValue)
        )}

        <SkeletonOrText
          editing={editing}
          value={
            Object(selectedValue) === selectedValue
              ? selectedValue?.value
              : selectedValue
          }
        />
      </div>
    </div>
  );
}

// interface SelectInputProps {
//   control: any;
//   rules?: any;
//   name: string;
//   options: object[];
//   [key: string]: unknown;
// }

export default function SelectField({
  control,
  options,
  name,
  rules,
  getOptionLabel,
  getOptionValue,
  isMulti,
  isClearable,
  isLoading,
  className,
  wrapperClassName,
  placeholder,
  editing,
  label,
  onChange,
  defaultValue,
  renderValue,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      {...rest}
      render={({ field }) => (
        <SelectInput
          {...field}
          label={label}
          editing={editing}
          className={className}
          placeholder={placeholder}
          wrapperClassName={wrapperClassName}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isMulti={isMulti}
          isClearable={isClearable}
          isLoading={isLoading}
          options={options}
          onChange={(option) => {
            option && field.onChange(isMulti ? option : option.value);
          }}
          renderValue={renderValue}
        />
      )}
    />
  );
}
