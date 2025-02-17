import IcKebab from "@/assets/svgs/ic_kebab.svg";
import IcLocation from "@/assets/svgs/ic_location.svg";
import IcStar from "@/assets/svgs/star.svg";
import Dropdown from "@/src/components/Dropdown";
import Loading from "@/src/components/Loading";
import { useGetActivities } from "@/src/queries/useActivities";
import useUserStore from "@/src/stores/userStore";
import { ActivityDetailResponse } from "@/src/types/activitiesResponses";
import Image from "next/image";
import { useRouter } from "next/router";

const ActivitiesPage = () => {
  const router = useRouter();
  const { activityId } = router.query;
  const { userData } = useUserStore();
  const {
    data: activityData,
    isLoading,
    error,
  } = useGetActivities(Number(activityId));

  if (isLoading)
    return (
      <Loading
        isOverlay="window"
        overlayColor="blue"
        isAbsolute="static"
        loadingBoxColor="black"
        size={{ sm: 50, md: 60, lg: 70 }}
        loadingText="잠시만 기다려주세요."
        textStyle="font-18px-medium md:font-20px-regular lg:font-24px-regular"
        textColor="text-brand-50"
        className="p-30"
      />
    );

  if (error)
    return (
      <div>
        <p>데이터를 가져오는 중 에러가 발생하였습니다.</p>
        <p>잠시후 다시 시도해주세요.</p>
      </div>
    );

  const {
    category,
    title,
    address,
    rating,
    reviewCount,
    description,
    bannerImageUrl,
    subImages,
    userId,
  } = activityData as ActivityDetailResponse;

  return (
    <div className="my-80 pb-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-14px-regular">{category}</p>
          <p className="font-32px-bold mt-10">{title}</p>
          <div className="mt-16 flex gap-12">
            <div className="flex items-center gap-6">
              <IcStar />
              <p className="font-14px-regular">{`${rating} (${reviewCount})`}</p>
            </div>
            <div className="flex items-center gap-2">
              <IcLocation />
              <p className="font-14px-regular">{address}</p>
            </div>
          </div>
        </div>
        {userData && userData.id === userId && (
          <div>
            <Dropdown>
              <Dropdown.Trigger>
                <IcKebab />
              </Dropdown.Trigger>
              <Dropdown.Menu className="left-auto right-0">
                <Dropdown.Item>수정하기</Dropdown.Item>
                <Dropdown.Item>삭제하기</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>
      {/* 타이틀 영역 */}

      <div className="mt-24 grid h-560 grid-cols-4 grid-rows-2 gap-8 overflow-hidden rounded-12">
        <div className="col-span-2 row-span-full size-full overflow-hidden">
          <div className="font-32px-bold relative flex size-full items-center justify-center bg-brand-200 text-brand-600">
            Image 1
            <Image
              src={bannerImageUrl}
              alt="배너 이미지"
              priority
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        {Array.from({ length: 4 }).map((_, i) => {
          return (
            <div
              className="size-full overflow-hidden"
              key={`subImages_${i + 1}`}>
              <div className="font-32px-bold relative flex size-full items-center justify-center bg-brand-300 text-brand-600">
                {subImages.length > i && (
                  <Image
                    src={subImages[i].imageUrl ?? ""}
                    alt="서브 이미지"
                    priority
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* 체험 이미지 영역 */}

      <div className="mt-80 grid grid-cols-8 grid-rows-3 gap-40">
        <div className="col-span-5 col-start-1 border-t border-brand-300 pt-40">
          <p className="font-20px-bold">체험 설명</p>
          <p className="font-16px-regular mt-16">{description}</p>
        </div>
        {/* 설명 영역 */}

        <div className="col-span-5 col-start-1 border-t border-brand-300 pt-40">
          <p>카카오 지도 API</p>
        </div>
        {/* 지도 영역 */}

        <div className="col-span-5 col-start-1 border-t border-brand-300 pt-40">
          <div>
            {/* 
              to. @hayuri1990
              
              후기 컴포넌트 렌더링 위치입니다.
              해당 파일이 아닌 컴포넌트를 따로 생성해주시길 바라며,
              변수 activityId 를 prop 으로 가져가서 api 요청에 사용하시면 됩니다.

              빈 div 태그 안에 위치한 건 overflow 컨트롤을 위해서 입니다. 작업완료 후 필요에 따라 제거 가능합니다.

              from. @JuhyeokC
            */}
            <p>후기 컴포넌트</p>
          </div>
        </div>
        {/* 후기 영역 */}

        <div className="col-start-6 col-end-[-1] row-span-full">
          <div>
            {/* 
              to. @kanghyosung1
              
              예약하기 컴포넌트 렌더링 위치입니다.
              해당 파일이 아닌 컴포넌트를 따로 생성해주시길 바라며,
              변수 activityId 를 prop 으로 가져가서 api 요청에 사용하시면 됩니다.
              
              빈 div 태그 안에 위치한 건 overflow 컨트롤을 위해서 입니다. 작업완료 후 필요에 따라 제거 가능합니다.

              from. @JuhyeokC
            */}
            <p>예약하기 컴포넌트</p>
          </div>
        </div>
        {/* 예약하기 영역 */}
      </div>
      {/* 콘텐츠 영역 */}
    </div>
  );
};

export default ActivitiesPage;
