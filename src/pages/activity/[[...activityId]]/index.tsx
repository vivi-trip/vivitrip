import ActivityContentSection from "@/src/components/ActivityContentSection";
import ActivityImageList from "@/src/components/ActivityImageList/ActivityImageList";
import ActivityLocation from "@/src/components/ActivityLocation/ActivityLocation";
import ActivityReservationBar from "@/src/components/ActivityReservation/ActivityReservationBar";
import ActivityTitleSection from "@/src/components/ActivityTitleSection";
import MyActivityHandler from "@/src/components/MyActivities/MyActivityHandler";
import Review from "@/src/components/Review";
import useUserStore from "@/src/stores/useUserStore";
import { ActivityDetailResponse } from "@/src/types/activitiesResponses";
import downloadThumbnailImage from "@/src/utils/downloadThumbnailImage";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import path from "path";

interface ActivitiesPageProps {
  post: ActivityDetailResponse;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/activities?method=offset&page=1&size=100`,
  );

  const { activities } = await response.json();

  const paths = activities.map((data: ActivityDetailResponse) => {
    return { params: { activityId: [data.id.toString()] } };
  });

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { activityId } = params as { activityId: string[] };
  const id = activityId?.[0];

  if (!id) {
    return {
      notFound: true,
    };
  }

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/activities/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const data = await response.json();
  const { bannerImageUrl } = data;

  const imageFileName = `${id}.jpeg`; // 이미지 파일명 추출
  const imagePath = path.join(
    process.cwd(),
    "public",
    "images",
    "thumbnail",
    imageFileName,
  ); // 로컬 저장 경로

  try {
    // 이미지를 로컬 서버에 저장
    await downloadThumbnailImage({
      imageUrl: bannerImageUrl,
      savePath: imagePath,
    });
  } catch (error) {
    console.error("이미지 저장 실패:", error);
  }

  return {
    props: {
      post: data,
    },
    revalidate: 60,
  };
};

const ActivitiesPage = ({ post }: ActivitiesPageProps) => {
  const { userData } = useUserStore();

  if (!post) return null;

  const {
    id,
    userId,
    category,
    title,
    description,
    address,
    bannerImageUrl,
    rating,
    reviewCount,
    subImages,
  } = post as ActivityDetailResponse;

  return (
    <>
      <Head>
        <title>{`VIVITRIP | ${title}`}</title>
        <meta
          property="og:title"
          content={`${title.slice(0, 60)} | VIVITRIP`}
          key="og:title"
        />
        <meta
          property="og:description"
          content={description.slice(0, 160)}
          key="og:description"
        />
        <meta
          property="og:url"
          content={`https://www.vivitrip.net/activity/${id}`}
          key="og:url"
        />
        <meta property="og:type" content="website" key="og:type" />
        <meta
          property="og:image"
          content={`/images/thumbnail/${id}.jpeg`}
          key="og:image"
        />
      </Head>

      <div className="my-24 pb-300 md:my-32 lg:my-80">
        <ActivityTitleSection
          category={category}
          title={title}
          address={address}
          rating={rating}
          reviewCount={reviewCount}
          userMenu={
            userData &&
            userData.id === userId && <MyActivityHandler activityId={id} />
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
          <Review activityId={id} />
        </ActivityContentSection>
      </div>

      {post && <ActivityReservationBar activityData={post} />}
    </>
  );
};

export default ActivitiesPage;
