import React from "react";
import ReactSelect, {
  components,
  GroupBase,
  Props,
  InputProps,
} from "react-select";
import { classNames } from "@lib/classnames";
import { Label } from "./fields";
import { useId } from "@radix-ui/react-id";

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

function SelectField<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  className,
  label,
  wrapperClassName,
  ...props
}: SelectProps<Option, IsMulti, Group>) {
  const id = useId();
  return (
    <div className={wrapperClassName}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="mt-1 flex rounded-md shadow-sm">
        <ReactSelect
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
            }),
          }}
          components={{
            ...components,
            IndicatorSeparator: () => null,
            Input: InputComponent,
          }}
          className={classNames("text-sm shadow-sm", className)}
          {...props}
        />
      </div>
    </div>
  );
}

export default SelectField;
