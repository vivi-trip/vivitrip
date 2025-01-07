import { SearchableLayoutProps } from "@/src/types/activity";

const SectionLayout = ({ className = "", children }: SearchableLayoutProps) => {
  return (
    <>
      <section>{}</section>
      <section className={className}>{children}</section>
      <section>{}</section>
    </>
  );
};

export default SectionLayout;
