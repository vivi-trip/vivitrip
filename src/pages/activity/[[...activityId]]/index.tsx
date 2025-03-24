import ActivityContentSection from "@/src/components/ActivityContentSection";
import ActivityImageList from "@/src/components/ActivityImageList/ActivityImageList";
import ActivityLocation from "@/src/components/ActivityLocation/ActivityLocation";
import ActivityReservationBar from "@/src/components/ActivityReservation/ActivityReservationBar";
import ActivityTitleSection from "@/src/components/ActivityTitleSection";
import Loading from "@/src/components/Loading";
import MyActivityHandler from "@/src/components/MyActivities/MyActivityHandler";
import Review from "@/src/components/Review";
import Custom404 from "@/src/pages/404";
import { useGetActivities } from "@/src/queries/useActivities";
import useUserStore from "@/src/stores/useUserStore";
import { ActivityDetailResponse } from "@/src/types/activitiesResponses";
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

  if (error || !activityData) return <Custom404 statusCode={404} />;

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

        <ActivityContentSection>
          <Review activityId={Number(activityId)} />
        </ActivityContentSection>
      </div>

      {activityData && <ActivityReservationBar activityData={activityData} />}
    </>
  );
};

export default ActivitiesPage;
