import Magnifier from "@/assets/svgs/ic_magnifier.svg";
import Leading from "@/assets/svgs/leading.svg";
import Button from "@/src/components/Button/Button";
import Carousel from "@/src/components/Carousel/Carousel";
import items from "@/src/constants/carousel";
import useResponsiveTextStyle from "@/src/hooks/Activity/useResponsiveTextStyle";
import clsx from "clsx";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

const SearchableLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 새로고침 후에도 검색어 유지
  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onSubmit = () => {
    // 검색어가 없거나 검색어가 쿼리스트링과 같을 경우 페이지 이동 방지
    if (!search || search === q) return;
    (document.activeElement as HTMLInputElement).blur();
    router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  // 엔터 입력 시 검색 작동
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const { isMicroScreen } = useResponsiveTextStyle();

  return (
    <main className="-mx-24 flex h-full flex-col items-center md:-mx-32">
      <Carousel items={items} />
      <div className="w-full max-w-1200 px-16 md:px-24 lg:px-24">
        <section
          style={{ boxShadow: "0px 4px 16px 0px #1122110D" }}
          className="relative -mt-60 flex h-129 flex-col gap-15 rounded-2xl bg-white px-24 py-16 md:h-184 md:gap-32 md:py-32 lg:h-184 lg:gap-32 lg:py-32">
          <p className="font-16px-bold md:font-20px-bold lg:font-20px-bold line-clamp-1 text-basic-black">
            무엇을 체험하고 싶으신가요?
          </p>
          <div className="relative flex gap-12">
            {!isMicroScreen && (
              <Leading className="absolute top-1/2 -translate-y-1/2" />
            )}
            <input
              className={clsx(
                "w-full rounded border border-gray-700 focus:border-2 focus:border-brand-500 focus:outline-none",
                isMicroScreen ? "px-10" : "pl-48 pr-14",
              )}
              value={search}
              onChange={onChangeSearch}
              onKeyDown={onKeyDown}
              placeholder="원하는 체험을 입력해 주세요."
              spellCheck="false"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            />
            <Button
              type="button"
              radius="4"
              gap="4"
              backgroundColor="black"
              fontStyle="xl"
              onClick={onSubmit}
              className={clsx(
                "h-56 whitespace-nowrap py-8 focus:ring-transparent md:w-136 md:px-40 lg:w-136",
                isMicroScreen ? "px-10" : "px-20",
              )}>
              {!isMicroScreen ? (
                "검색하기"
              ) : (
                <Magnifier width={21} height={21} />
              )}
            </Button>
          </div>
        </section>
        {/* 페이지 컴포넌트 렌더링 */}
        {children}
      </div>
    </main>
  );
};
export default SearchableLayout;
