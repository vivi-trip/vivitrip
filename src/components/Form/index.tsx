import Button from "@/src/components/Button/Button";
import icons, { buttonStyles, iconPosition } from "@/src/constants/form";
import validationRules from "@/src/constants/validation";
import {
  ErrorProps,
  FormProps,
  IconProps,
  InputProps,
  LabelProps,
  SubmitButtonProps,
} from "@/src/types/form";
import clsx from "clsx";
import { useState } from "react";
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
          "text-16px-regular relative flex flex-col gap-28 text-basic-black",
          className,
        )}
        {...rest}>
        {children}
      </form>
    </FormProvider>
  );
};

const Label = ({ children, className, htmlFor, ...rest }: LabelProps) => {
  return (
    <label
      className={twMerge("flex flex-col gap-8", className)}
      htmlFor={htmlFor}
      {...rest}>
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
    <span className={clsx("text-14px-regular m-8 text-red-500", className)}>
      {children}
    </span>
  );
};

const Input: React.FC<InputProps> = ({
  label,
  variant,
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
    "text-16px-regular w-full rounded-md p-[16px_20px] placeholder:text-gray-700 border border-gray-700 outline-none focus:border-[3px] focus:border-brand-400";

  const currentValue = watch(variant) || value;

  return (
    <div className="flex w-full flex-col">
      <span>
        <div className="relative">
          <label
            className={clsx(
              "text-16px-regular pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 rounded bg-white text-gray-600 transition-all",
              (isFocused || currentValue) && "top-1 px-6",
              selectedIcon?.margin,
            )}
            htmlFor={variant}>
            {label}
          </label>
          {readOnly ? (
            <Component
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
              rules={validationRules(watch)[variant]}
              render={({ field }) => (
                <Component
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
                    setIsFocused(false);
                    field.onChange((field.value || "").trim());
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

const SubmitButton = ({
  className,
  children,
  variant = "authPage",
  ...rest
}: SubmitButtonProps) => {
  const { style, tailwindStyle } = buttonStyles[variant] || {};
  const { formState } = useFormContext();

  return (
    <Button
      className={clsx(tailwindStyle, !formState.isValid ? "bg-brand-300" : "")}
      disabled={!formState.isValid}
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
        "text-32px-bold flex items-center justify-between",
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

export default Form;
