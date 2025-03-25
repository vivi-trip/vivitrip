import ActivityContentSection from "@/src/components/ActivityContentSection";
import ActivityImageList from "@/src/components/ActivityImageList/ActivityImageList";
import ActivityLocation from "@/src/components/ActivityLocation/ActivityLocation";
import ActivityReservationBar from "@/src/components/ActivityReservation/ActivityReservationBar";
import ActivityTitleSection from "@/src/components/ActivityTitleSection";
import MyActivityHandler from "@/src/components/MyActivities/MyActivityHandler";
import Review from "@/src/components/Review";
import useUserStore from "@/src/stores/useUserStore";
import { ActivityDetailResponse } from "@/src/types/activitiesResponses";
import downloadThumbnail from "@/src/utils/downloadThumbnail";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

// 정적 생성할 파라미터 생성
export const getStaticPaths: GetStaticPaths = async () => {
  // 체험 데이터 목록 요청
  const response = await fetch(
    `${BASE_URL}/activities?method=offset&page=1&size=100`,
  );

  // 체험 데이터 목록 추출
  const { activities } = await response.json();

  // 체험 데이터 목록에서 아이디만 추출한 배열 생성
  const paths = activities.map((data: ActivityDetailResponse) => {
    return { params: { activityId: [data.id.toString()] } };
  });

  // fallback: "blocking" 옵션으로 정적페이지가 없는 페이지에 접근 시 정적페이지 생성
  return { paths, fallback: "blocking" };
};

// 정적페이지 생성
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // 체험 아이디 추출
  const { activityId } = params as { activityId: string[] };
  const id = activityId?.[0];

  // 아이디가 없으면 에러페이지 반환
  if (!id) {
    return {
      notFound: true,
    };
  }

  // 체험 상세 데이터 요청
  const url = `${BASE_URL}/activities/${id}`;
  const response = await fetch(url);

  // 정상 응답 아닐 시 에러페이지 반환
  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  // 데이터 json 객체화
  const data = await response.json();

  // 저장할 배너 이미지 url 추출
  const { bannerImageUrl } = data;

  try {
    // 이미지를 AWS S3 버킷에 저장
    await downloadThumbnail({
      imageUrl: bannerImageUrl,
      fileName: id,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("이미지 저장 실패:", error);
  }

  return {
    props: {
      post: data,
    },
    revalidate: 60,
  };
};

const ActivitiesPage = ({ post }: { post: ActivityDetailResponse }) => {
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
  } = post;

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
          content={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/thumbnails/${id}.jpeg`}
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
