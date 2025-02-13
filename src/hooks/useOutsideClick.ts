import { RefObject, useEffect } from "react";

/**
 * useOutsideClick - 특정 요소 외부 클릭을 감지하는 커스텀 훅
 *
 * @param ref - 감지할 요소의 ref 객체
 * @param handler - 외부 클릭 시 실행할 콜백 함수
 */
function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // ref가 설정되지 않았거나, 클릭된 요소가 ref 내부에 포함되어 있다면 무시
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      // 외부 클릭 감지 시 handler 실행
      handler(event);
    };

    // 이벤트 리스너 등록
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      // 이벤트 리스너 제거
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default useOutsideClick;
