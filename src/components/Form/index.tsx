import Button from "@/src/components/Button/Button";
import { iconPosition, icons, variantStyles } from "@/src/constants/form";
import validationRules from "@/src/constants/validation";
import {
  ErrorProps,
  FieldKeys,
  FieldProps,
  FormKeys,
  FormProps,
  IconProps,
  InputKeys,
  InputProps,
  LabelProps,
  SubmitButtonProps,
} from "@/src/types/form";
import { createContext, useContext, useMemo, useState } from "react";
import {
  Controller,
  FieldError,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

const Form = <T extends FieldValues>({
  children,
  className,
  onSubmit,
  resetOnSubmit = true,
  ...rest
}: FormProps<T>) => {
  const methods = useForm<T>();

  const handleSubmit = async (data: T) => {
    await onSubmit(data);
    if (resetOnSubmit) {
      methods.reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className={twMerge(
          "font-16px-regular relative flex flex-col gap-28 text-basic-black",
          className,
        )}
        {...rest}>
        {children}
      </form>
    </FormProvider>
  );
};

const FieldContext = createContext<{
  variant: FormKeys;
  setVariant?: (variant: FormKeys) => void;
}>({
  variant: "default",
});

const Field = ({ children, className, variant }: FieldProps) => {
  const contextValue = useMemo(() => ({ variant }), [variant]);
  const fieldStyle =
    variant in variantStyles
      ? variantStyles[variant as FieldKeys]?.fieldStyle
      : "";

  return (
    <FieldContext.Provider value={contextValue}>
      <div className={twMerge("flex flex-col gap-8", fieldStyle, className)}>
        {children}
      </div>
    </FieldContext.Provider>
  );
};

const Label = ({ children, className, htmlFor, ...rest }: LabelProps) => {
  const { variant } = useContext(FieldContext);
  return (
    <label className={twMerge(className)} htmlFor={variant} {...rest}>
      {children}
    </label>
  );
};

const Icon = ({ children, className, onClick, position }: IconProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        "absolute top-1/2 -translate-y-1/2 transform",
        iconPosition[position],
        className,
      )}>
      {children}
    </button>
  );
};

const Error = ({ children, className }: ErrorProps) => {
  if (!children) return null;
  return (
    <span
      className={twMerge(
        "font-14px-regular m-[8px_8px_0] text-red-500",
        className,
      )}>
      {children}
    </span>
  );
};

const Input: React.FC<InputProps> = ({
  label,
  as = "input",
  type = "text",
  error,
  errorClassName,
  icon,
  iconClassName,
  readOnly,
  className,
  value,
  ...rest
}) => {
  const { variant } = useContext(FieldContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const isPasswordVariant =
    variant === "password" || variant === "confirmPassword";
  const selectedIcon = icons[variant] || (icon ? icons[icon] : null);
  const inputType = isPasswordVariant && !isPasswordVisible ? "password" : type;

  const handleIconClick =
    isPasswordVariant && !readOnly
      ? togglePasswordVisibility
      : selectedIcon?.onClick;

  const Component = as === "textarea" ? "textarea" : "input";

  const {
    control,
    formState: { errors },
    watch,
    trigger,
  } = useFormContext();

  const errorMessage = errors[variant]?.message;
  const displayErrorMessage =
    typeof errorMessage === "string"
      ? errorMessage
      : (errorMessage as FieldError)?.message || "";

  const inputStyles =
    "font-16px-regular w-full rounded-md p-[16px_20px] placeholder:text-gray-700 border border-gray-700 outline-none focus:border-[3px] focus:border-brand-400";

  return (
    <div className="flex w-full flex-col">
      <span>
        <div className="relative">
          <label
            className={twMerge(
              "font-16px-regular pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 rounded bg-white text-gray-600 transition-all",
              isFocused && "top-2 px-6",
              selectedIcon?.margin,
            )}
            htmlFor={variant}>
            {label}
          </label>
          {readOnly ? (
            <Component
              id={variant}
              type={inputType}
              className={twMerge(
                inputStyles,
                as === "textarea" ? "h-346 resize-none" : "h-58",
                "bg-brand-100",
                className,
              )}
              readOnly
              autoComplete={type}
              value={value}
              {...rest}
            />
          ) : (
            <Controller
              name={variant}
              control={control}
              defaultValue={value || ""}
              rules={validationRules(watch)[variant as InputKeys]}
              render={({ field }) => (
                <Component
                  id={variant}
                  type={inputType}
                  className={twMerge(
                    inputStyles,
                    as === "textarea" ? "h-346 resize-none" : "h-58",
                    selectedIcon?.padding,
                    className,
                  )}
                  {...field}
                  autoComplete={isPasswordVariant ? "new-password" : type}
                  onFocus={() => setIsFocused(true)}
                  onBlur={async () => {
                    const trimmedValue = (field.value || "").trim();
                    setIsFocused(trimmedValue !== "");
                    field.onChange(trimmedValue);
                    await trigger(variant);
                  }}
                  onChange={async (e) => {
                    field.onChange(e);
                    await trigger(variant);
                  }}
                  {...rest}
                />
              )}
            />
          )}
          {selectedIcon && (
            <Icon
              className={iconClassName}
              onClick={readOnly ? undefined : handleIconClick}
              position={selectedIcon.position}>
              {selectedIcon.icon(isPasswordVisible)}
            </Icon>
          )}
        </div>
      </span>
      {displayErrorMessage && (
        <Error className={errorClassName}>{displayErrorMessage}</Error>
      )}
    </div>
  );
};

const SubmitButton = ({ className, children, ...rest }: SubmitButtonProps) => {
  const { variant } = useContext(FieldContext);

  const { style, tailwindStyle } =
    variant in variantStyles ? variantStyles[variant as FieldKeys] : {};

  const { formState } = useFormContext();

  return (
    <Button
      className={twMerge(
        tailwindStyle,
        !formState.isValid ? "bg-brand-300" : "",
      )}
      disabled={!formState.isValid}
      type="submit"
      {...style}
      {...rest}>
      {children}
    </Button>
  );
};

const Title = ({ className, children }: SubmitButtonProps) => {
  return (
    <div
      className={twMerge(
        "font-32px-bold flex items-center justify-between",
        className,
      )}>
      {children}
    </div>
  );
};

Input.displayName = "Input";

Form.Label = Label;
Form.Icon = Icon;
Form.Error = Error;
Form.Input = Input;
Form.SubmitButton = SubmitButton;
Form.Title = Title;
Form.Field = Field;

export default Form;
