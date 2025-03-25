import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

// AWS 환경 변수
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
const region = process.env.NEXT_PUBLIC_AWS_REGION;

if (!accessKeyId || !secretAccessKey || !bucketName || !region) {
  throw new Error("AWS 환경 변수가 설정되지 않았습니다.");
}

// AWS S3 설정
const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

// S3에서 파일 삭제 함수
const deleteThumbnail = async (
  fileName: string,
): Promise<{ success: boolean; message?: string }> => {
  try {
    // 파일 경로
    const key = `thumbnails/${fileName}.jpeg`;

    // S3 객체 삭제 명령
    const deleteParams = {
      Bucket: bucketName,
      Key: key,
    };

    // DeleteObjectCommand로 S3에서 파일 삭제
    const command = new DeleteObjectCommand(deleteParams);
    await s3.send(command);

    return { success: true, message: "파일이 성공적으로 삭제되었습니다." };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("파일 삭제 중 오류:", error);
    return {
      success: false,
      message: `파일 삭제 중 오류가 발생했습니다: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
    };
  }
};

export default deleteThumbnail;
