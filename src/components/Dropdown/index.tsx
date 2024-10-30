/* eslint-disable react-hooks/rules-of-hooks */

/* eslint-disable react/display-name */
import useToggle, { ToggleReturnProps } from "@/src/hooks/useToggle";
import { ClickProps, ComponentProps } from "@/src/types/type";
import clsx from "clsx";
import { MouseEvent, createContext, useContext, useMemo } from "react";

interface DropdownContextProps extends ToggleReturnProps {
  sustain?: boolean;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(
  undefined,
);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useContext를 Provider 안에서 사용하세요.");
  }
  return context;
};

interface DropdownProps extends ComponentProps {
  sustain?: boolean;
}

interface DropdownButtonProps extends ComponentProps, ClickProps {}

const Dropdown = ({
  children,
  className,
  sustain = false,
  ...rest
}: DropdownProps) => {
  const { state, toggle, toggleOpen, toggleClose } = useToggle(false);
  const contextValue = useMemo(
    () => ({ sustain, state, toggle, toggleOpen, toggleClose }),
    [sustain, state, toggle, toggleOpen, toggleClose],
  );

  const handleBlur = () => {
    if (!sustain) toggleClose();
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div
        className={clsx("relative", className)}
        onBlur={handleBlur}
        {...rest}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.Trigger = ({
  children,
  className,
  onClick,
  ...rest
}: DropdownButtonProps) => {
  const { toggle } = useDropdownContext();

  return (
    <button
      type="button"
      className={clsx(
        "flex w-full flex-wrap items-center justify-start",
        className,
      )}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (typeof onClick === "function") onClick();
        toggle();
      }}
      {...rest}>
      {children}
    </button>
  );
};

Dropdown.Menu = ({ children, className, ...rest }: ComponentProps) => {
  const { state } = useDropdownContext();

  if (!state) return null;

  return (
    <div
      className={clsx(
        "absolute left-0 top-full z-10 mt-4 block w-fit min-w-full overflow-hidden rounded border border-gray-500 bg-gray-50",
        className,
      )}
      {...rest}>
      {children}
    </div>
  );
};

Dropdown.Item = ({
  children,
  className,
  onClick,
  ...rest
}: DropdownButtonProps) => {
  const { toggle } = useDropdownContext();

  return (
    <button
      className={clsx("relative block w-full rounded-none", className)}
      type="button"
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (typeof onClick === "function") onClick();
        toggle();
      }}
      {...rest}>
      {children}
    </button>
  );
};

Dropdown.Close = ({
  children,
  className,
  onClick,
  ...rest
}: DropdownButtonProps) => {
  const { toggleClose } = useDropdownContext();

  return (
    <button
      className={clsx("relative block w-full rounded-none", className)}
      type="button"
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (typeof onClick === "function") onClick();
        toggleClose();
      }}
      {...rest}>
      {children}
    </button>
  );
};

export default Dropdown;
