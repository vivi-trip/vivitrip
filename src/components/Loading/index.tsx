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

/**
 * @description 로딩 스피너
 * @param isOverlay - 오버레이 여부
 * @param overlayColor - 오버레이 색상
 * @param loadingBoxColor - div 배경 색상
 * @param size - 스피너 크기
 * @param color - 스피너 색상
 * @param loadingText - 스피너와 함께 표시될 메시지
 * @param textStyle - 메시지 텍스트 스타일
 * @param textColor - 메시지 텍스트 색상
 * @param className - 기타 스타일 적용
 */

const Loading = ({
  isOverlay = "false",
  overlayColor = "translate",
  isAbsolute = "false",
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
        isOverlay && LOADING_IS_OVERLAY_PRESET[isOverlay],
        overlayColor && LOADING_OVERLAY_COLOR_PRESET[overlayColor],
        isAbsolute && LOADING_IS_ABSOLUTE_PRESET[isAbsolute],
      )}>
      <div
        className={clsx(
          loadingBoxColor && LOADING_BOX_COLOR_PRESET[loadingBoxColor],
          isOverlay === "false" && "size-full",
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
