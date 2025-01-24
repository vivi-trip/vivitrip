/**
 * @description 로딩 스피너
 * @param isOverlay - overlay 여부
 * @param overlayColor - overlay 색상
 * @param isAbsolute - 스피너 absolute 사용 여부
 * @param loadingBoxColor - loadingBox 색상(숫자 또는 객체로 전달)
 * @param speed - 로딩 스피너 속도
 * @param color - 로딩 스피너 색상
 * @param loadingText - 메시지
 * @param textStyle - 메시지 폰트 스타일
 * @param textColor - 메시지 폰트 색상
 * @param className -
 */

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  isOverlay: LoadingIsOverlayType;
  overlayColor: LoadingOverlayColorType;
  isAbsolute: LoadingIsAbsoluteType;
  loadingBoxColor: LoadingBoxColorType;
  size?:
    | number
    | {
        sm?: number;
        md?: number;
        lg?: number;
      };
  speed?: number;
  color?: string;
  loadingText?: string;
  textStyle?: string;
  textColor?: string;
  className?: string;
}

export type LoadingIsOverlayType = "true" | "false";
export type LoadingOverlayColorType = "translate" | "white" | "blue";
export type LoadingIsAbsoluteType = "true" | "false";
export type LoadingBoxColorType = "translate" | "black";
