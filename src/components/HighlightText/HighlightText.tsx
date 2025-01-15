import clsx from "clsx";

interface HighlightProps {
  className?: string;
  text: string;
  keywords: Record<string, string>; // 키워드와 색상 매핑
}

const HighlightText = ({
  className,
  text,
  keywords,
  ...rest
}: HighlightProps) => {
  const parts = text.split(
    new RegExp(`(${Object.keys(keywords).join("|")})`, "g"),
  );

  return (
    <p className={className} {...rest}>
      {parts.map((part) => {
        const cn = keywords[part];
        return cn ? (
          <span
            key={`highlight-text-${part}`}
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className={clsx(`text-${cn}`, "font-semibold")}>
            {part}
          </span>
        ) : (
          part
        );
      })}
    </p>
  );
};

export default HighlightText;
