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
  md: <IMG_LOGO viewBox="0 0 266 45" className="h-7" />,
  lg: <IMG_LOGO_LG viewBox="0 0 340 192" className="h-48" />,
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
