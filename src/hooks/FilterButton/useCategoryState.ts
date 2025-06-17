import { Category } from "@/src/types/filterButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useCategoryState = (categories: Category[]) => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const storedIndex = localStorage.getItem("currentIndex");
      return storedIndex ? parseInt(storedIndex, 10) : 0;
    }
    return 0;
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
    if (!router.isReady) return;

    const queryCategory = router.query.category as string;
    if (queryCategory) {
      setSelectedCategory(queryCategory);
      const index = categories.findIndex((c) => c.value === queryCategory);
      setCurrentIndex(index !== -1 ? index : 0);
    } else {
      setSelectedCategory("");
      setCurrentIndex(0);
    }
  }, [router.isReady, router.query.category, categories]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentIndex", currentIndex.toString());
    }
  }, [currentIndex]);

  return { handleCategoryChange, selectedCategory, currentIndex };
};

export default useCategoryState;
