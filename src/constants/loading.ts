import {
  LoadingBoxColorType,
  LoadingIsAbsoluteType,
  LoadingIsOverlayType,
  LoadingOverlayColorType,
} from "@/src/types/loading";

export const LOADING_IS_OVERLAY_PRESET: Record<LoadingIsOverlayType, string> = {
  window: "fixed inset-0 z-50 flex flex-col items-center justify-center",
  node: "size-full z-50 flex flex-col items-center justify-center",
};

export const LOADING_OVERLAY_COLOR_PRESET: Record<
  LoadingOverlayColorType,
  string
> = {
  translate: "bg-translate",
  white: "bg-neutral-100/80",
  blue: "bg-slate-400/80",
};

export const LOADING_IS_ABSOLUTE_PRESET: Record<LoadingIsAbsoluteType, string> =
  {
    absolute: "absolute",
    static: "static",
  };

export const LOADING_BOX_COLOR_PRESET: Record<LoadingBoxColorType, string> = {
  translate: "bg-translate",
  black: "bg-black/70",
};
