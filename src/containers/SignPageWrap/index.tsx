import { ComponentProps } from "@/src/types/type";
import clsx from "clsx";

const SignPageWrap = ({ className, children }: ComponentProps) => {
  return (
    <div
      className={clsx(
        "mx-auto flex min-h-screen w-full max-w-640 flex-col items-stretch justify-center py-48",
        className,
      )}>
      {children}
    </div>
  );
};

export default SignPageWrap;
