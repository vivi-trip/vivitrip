import { Category } from "@/src/types/filterButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useCategoryState = (categories: Category[]) => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(
    (router.query.category as string) || "",
  );

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const storedIndex = localStorage.getItem("currentIndex");
      return storedIndex ? parseInt(storedIndex, 10) : 0;
    }
    return 0; // SSR에서 0으로 초기화
  });

  const handleCategoryChange = (newCategory: string) => {
    if (selectedCategory === newCategory) return;

    const query: Record<string, string | number | undefined> = {
      ...router.query,
      page: 1,
    };

    if (newCategory) {
      setSelectedCategory(newCategory);
      query.category = newCategory;
      const newIndex = categories.findIndex(
        (category) => category.value === newCategory,
      );
      setCurrentIndex(newIndex);
    } else {
      setSelectedCategory("");
      setCurrentIndex(0);
      delete query.category;
    }

    router.push({
      pathname: router.pathname,
      query,
    });
  };

  useEffect(() => {
    // currentIndex 값 변경 시 로컬스토리지에 저장
    if (typeof window !== "undefined") {
      localStorage.setItem("currentIndex", currentIndex.toString());
    }
  }, [currentIndex]);

  // 필터 버튼 선택 안했을 경우, 초기화
  useEffect(() => {
    if (!router.query.category) {
      setSelectedCategory("");
      setCurrentIndex(0);
    }
  }, [router.query.category]);

  return { handleCategoryChange, selectedCategory, currentIndex };
};

export default useCategoryState;
