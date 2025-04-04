import Button from "@/src/components/Button/Button";
import { iconPosition, icons, variantStyles } from "@/src/constants/form";
import validationRules from "@/src/constants/validation";
import useHydration from "@/src/hooks/useHydration";
import {
  ErrorProps,
  FieldKeys,
  FieldProps,
  FormKeys,
  FormProps,
  IconKeys,
  IconPosition,
  IconProps,
  InputKeys,
  InputProps,
  LabelProps,
  SubmitButtonProps,
} from "@/src/types/form";
import { ComponentProps } from "@/src/types/type";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
    if (!onSubmit) return;

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
          "font-16px-regular relative flex flex-col gap-32 text-basic-black",
          className,
        )}
        autoComplete="off"
        {...rest}>
        {children}
      </form>
    </FormProvider>
  );
};

const FieldContext = createContext<{
  htmlForId: string;
  variant: FormKeys;
  setVariant?: (variant: FormKeys) => void;
}>({
  htmlForId: "",
  variant: "default",
});

const Field = ({ children, className, variant }: FieldProps) => {
  const isHydrated = useHydration();
  const [htmlForId, setHtmlFor] = useState<string>("");
  const contextValue = useMemo(() => {
    return { variant, htmlForId };
  }, [variant, htmlForId]);
  const fieldStyle =
    variant in variantStyles
      ? variantStyles[variant as FieldKeys]?.fieldStyle
      : "";

  const generateForId = useCallback(() => {
    const randomIdx = Math.floor(Math.random() * 1000);
    return variant + randomIdx;
  }, [variant]);

  useEffect(() => {
    setHtmlFor(generateForId());
  }, [generateForId]);

  if (!isHydrated) return null;

  return (
    <FieldContext.Provider value={contextValue}>
      <div className={twMerge("flex flex-col gap-4", fieldStyle, className)}>
        {children}
      </div>
    </FieldContext.Provider>
  );
};

const Label = ({ children, className, htmlFor, ...rest }: LabelProps) => {
  const { htmlForId } = useContext(FieldContext);
  return (
    <label
      className={twMerge("cursor-pointer select-none", className)}
      htmlFor={htmlForId}
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
        "select-none",
        iconPosition[position as IconPosition],
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
  const { variant, htmlForId } = useContext(FieldContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const isPasswordVariant =
    variant === "password" ||
    variant === "newPassword" ||
    variant === "confirmPassword";
  const selectedIcon =
    icons[variant as IconKeys] || (icon ? icons[icon] : null);
  const inputType = isPasswordVariant && !isPasswordVisible ? "password" : type;

  const handleIconClick =
    isPasswordVariant && !readOnly
      ? togglePasswordVisibility
      : selectedIcon?.onClick;

  const Component = as === "textarea" ? "textarea" : "input";

  const passwordProps = isPasswordVariant
    ? {
        autoComplete: "new-password",
        autoCorrect: "off",
        spellCheck: false,
      }
    : {};

  const textareaProps =
    as === "textarea"
      ? {
          rows: 8,
        }
      : {};

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
    "font-16px-regular w-full rounded-md p-[16px_20px] placeholder:text-gray-700 border border-gray-700 outline-none truncate";

  const inputFocusStyles =
    "focus:border-[rgba(159,181,196,0.8)] focus:shadow-[inset_0_0_0_1px_rgba(159,181,196,0.8)]";

  return (
    <div className="flex w-full flex-col">
      <div className={twMerge("relative", label && "mt-16")}>
        {label && (
          <div
            className={twMerge(
              "flex items-center overflow-hidden rounded",
              "font-16px-regular text-gray-600",
              "absolute left-20 top-1/2 h-32 -translate-y-1/2 transition-all",
              "pointer-events-none",
              isFocused && "left-12 top-0 px-12",
            )}>
            <div
              className={twMerge(
                "absolute bottom-0 left-0 right-0 top-0 bg-white transition-all",
                isFocused && "top-1/2",
              )}
            />
            <p className="relative">{label}</p>
          </div>
        )}
        {readOnly ? (
          <Component
            name={variant}
            type={inputType}
            className={twMerge(
              inputStyles,
              "cursor-not-allowed",
              as === "textarea" ? "resize-none" : "h-58",
              "bg-brand-100",
              className,
            )}
            value={value}
            readOnly
            {...passwordProps}
            {...textareaProps}
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
                id={htmlForId}
                type={inputType}
                className={twMerge(
                  inputStyles,
                  inputFocusStyles,
                  as === "textarea" ? "resize-none" : "h-58",
                  selectedIcon?.padding,
                  className,
                )}
                {...field}
                {...passwordProps}
                {...textareaProps}
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
      {displayErrorMessage && (
        <Error className={errorClassName}>{displayErrorMessage}</Error>
      )}
    </div>
  );
};

const SubmitButton = ({ className, children, ...rest }: SubmitButtonProps) => {
  const { variant } = useContext(FieldContext);
  const { disabled } = rest;

  const { style, tailwindStyle } =
    variant in variantStyles ? variantStyles[variant as FieldKeys] : {};

  const { formState } = useFormContext();

  return (
    <Button
      type="submit"
      className={twMerge(tailwindStyle)}
      {...style}
      {...rest}
      backgroundColor={!formState.isValid || disabled ? "gray" : "black"}
      disabled={!formState.isValid || disabled}>
      {children}
    </Button>
  );
};

const Title = ({ className, children }: ComponentProps) => {
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
