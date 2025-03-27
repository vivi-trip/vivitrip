import { ComponentProps } from "@/src/types/type";
import clsx from "clsx";

const MyPageWrap = ({ className, children }: ComponentProps) => {
  return (
    <div
      className={clsx(
        "flex w-full justify-center gap-24 pb-120 pt-72",
        className,
      )}>
      {children}
    </div>
  );
};

export default MyPageWrap;
