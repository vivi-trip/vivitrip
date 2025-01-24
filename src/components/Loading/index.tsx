import {
  LOADING_BOX_COLOR_PRESET,
  LOADING_IS_ABSOLUTE_PRESET,
  LOADING_IS_OVERLAY_PRESET,
  LOADING_OVERLAY_COLOR_PRESET,
} from "@/src/constants/loading";
import useResponsiveSpinnerSize from "@/src/hooks/useResponsiveSpinnerSize";
import { LoadingProps } from "@/src/types/loading";
// eslint-disable-next-line import/no-extraneous-dependencies
import { DotSpinner } from "@uiball/loaders";
import clsx from "clsx";
import React from "react";

const Loading = ({
  isOverlay = "node",
  overlayColor = "translate",
  isAbsolute = "static",
  loadingBoxColor = "translate",
  size = 60,
  speed = 0.9,
  color = "#8fb2cb",
  loadingText,
  textStyle,
  textColor,
  className,
}: LoadingProps) => {
  const responsiveSize = useResponsiveSpinnerSize(size);

  return (
    <div
      className={clsx(
        LOADING_IS_OVERLAY_PRESET[isOverlay],
        LOADING_OVERLAY_COLOR_PRESET[overlayColor],
        LOADING_IS_ABSOLUTE_PRESET[isAbsolute],
      )}>
      <div
        className={clsx(
          loadingBoxColor && LOADING_BOX_COLOR_PRESET[loadingBoxColor],
          isOverlay === "node" && "size-full",
          "flex flex-col items-center justify-center gap-25 rounded-15 text-center",
          className,
        )}>
        <DotSpinner size={responsiveSize} speed={speed} color={color} />
        {loadingText ? (
          <p className={clsx(textStyle, textColor, "!leading-none")}>
            {loadingText}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Loading;
