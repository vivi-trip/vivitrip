import { ClassNameProp } from "@/src/types/type";
import clsx from "clsx";
import dynamic from "next/dynamic";

const Image = dynamic(() => import("antd/es/image"), { ssr: false });

interface ActivityImageProps extends ClassNameProp {
  imageUrl: string;
}

const ActivityImage = ({ className, imageUrl }: ActivityImageProps) => {
  return (
    <div
      className={clsx(
        "size-full overflow-hidden bg-[rgba(0,0,0,0.04)] shadow-[0_0_4px_1px_rgba(0,0,0,0.16)]",
        className,
      )}>
      <div className="relative size-full">
        <Image
          src={imageUrl}
          width="100%"
          height="100%"
          alt={imageUrl}
          className="size-full object-cover"
          preview={{
            mask: <p>원본보기</p>,
          }}
          style={{
            boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.32)",
          }}
        />
      </div>
    </div>
  );
};

export default ActivityImage;
