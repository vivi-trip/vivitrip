import ActivityContentSection from "@/src/components/ActivityContentSection";
import ActivityImageList from "@/src/components/ActivityImageList/ActivityImageList";
import ActivityLocation from "@/src/components/ActivityLocation/ActivityLocation";
import ActivityReservationBar from "@/src/components/ActivityReservation/ActivityReservationBar";
import ActivityTitleSection from "@/src/components/ActivityTitleSection";
import Loading from "@/src/components/Loading";
import MyActivityHandler from "@/src/components/MyAtivities/MyActivityHandler";
import { useGetActivities } from "@/src/queries/useActivities";
import useUserStore from "@/src/stores/userStore";
import { ActivityDetailResponse } from "@/src/types/activitiesResponses";
import Image from "next/image";
import Custom404 from "@/src/pages/404";
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

  if (error) return <Custom404 statusCode={404} />;

  if (!activityData) return null;

  if (!activityData) return null;

  return (
    <>
      <div className="my-24 pb-300 md:my-32 lg:my-80">
        <ActivityTitleSection
          category={category}
          title={title}
          address={address}
          rating={rating}
          reviewCount={reviewCount}
          userMenu={
            userData &&
            userData.id === userId && (
              <MyActivityHandler activityId={Number(activityId)} />
            )
          }
        />

        <ActivityImageList
          bannerImageUrl={bannerImageUrl}
          subImages={subImages}
        />

        <ActivityContentSection title="체험 설명">
          <p className="font-16px-regular mt-16">{description}</p>
        </ActivityContentSection>

        <ActivityContentSection title="체험 장소">
          <ActivityLocation address={address} />
        </ActivityContentSection>

        <ActivityContentSection title="체험 후기">
          {/* 
              to. @hayuri1990
              
              후기 컴포넌트 렌더링 위치입니다.
              해당 파일이 아닌 컴포넌트를 따로 생성해주시길 바라며,
              변수 activityId 를 prop 으로 가져가서 api 요청에 사용하시면 됩니다.

              빈 div 태그 안에 위치한 건 overflow 컨트롤을 위해서 입니다. 작업완료 후 필요에 따라 제거 가능합니다.

              from. @JuhyeokC
            */}
          <p>후기 컴포넌트</p>
        </ActivityContentSection>
      </div>

      {activityData && <ActivityReservationBar activityData={activityData} />}
    </>
  );
};

export default ActivitiesPage;
