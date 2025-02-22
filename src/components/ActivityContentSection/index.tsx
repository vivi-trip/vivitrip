import { ComponentProps } from "@/src/types/type";
import clsx from "clsx";

interface ActivityContentProps extends ComponentProps {
  title?: string;
}

const ActivityContentSection = ({
  className,
  children,
  title,
}: ActivityContentProps) => {
  return (
    <div className={clsx("mt-80 border-t border-brand-300 pt-40", className)}>
      {title ? (
        <>
          <p className="font-20px-bold">{title}</p>
          <div className="mt-16">{children}</div>
        </>
      ) : (
        children
      )}
    </div>
  );
};

export default ActivityContentSection;
