/**
 * @description
 * 하이드레이션 확인용
 */
import { useEffect, useState } from "react";

export default function useHydration() {
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
