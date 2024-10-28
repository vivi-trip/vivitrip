import IMG_LOGO from "@/assets/logo/logo.svg";
import IMG_LOGO_LG from "@/assets/logo/logo_lg.svg";
import PATH_NAMES from "@/src/constants/pathname";
import Link from "next/link";
import { ReactNode } from "react";

type LogoSizeType = "md" | "lg";

interface LogoProps {
  size?: LogoSizeType;
}

const LOGO_SIZE: Record<LogoSizeType, ReactNode> = {
  md: <IMG_LOGO className="h-28" />,
  lg: <IMG_LOGO_LG className="h-192" />,
};

const Logo = ({ size = "md" }: LogoProps) => {
  return (
    <Link
      href={PATH_NAMES.Root}
      className="flex items-center justify-center"
      draggable={false}>
      {LOGO_SIZE[size]}
    </Link>
  );
};

export default Logo;
