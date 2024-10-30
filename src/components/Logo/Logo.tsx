import VIVITRIP_LOGO_HORIZONTAL from "@/assets/logo/vivitrip_logo_horizontal.svg";
import VIVITRIP_LOGO_VERTICAL from "@/assets/logo/vivitrip_logo_vertical.svg";
import PATH_NAMES from "@/src/constants/pathname";
import Link from "next/link";
import { ReactNode } from "react";

type LogoSizeType = "md" | "lg";

interface LogoProps {
  size?: LogoSizeType;
}

const LOGO_SIZE: Record<LogoSizeType, ReactNode> = {
  md: <VIVITRIP_LOGO_HORIZONTAL className="h-28" />,
  lg: <VIVITRIP_LOGO_VERTICAL className="h-192" />,
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
