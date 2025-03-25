/* eslint-disable no-console */
import {
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import sharp from "sharp";

// AWS 환경 변수
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!;
const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!;
const region = process.env.NEXT_PUBLIC_AWS_REGION!;

// AWS S3 설정
const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

// 파일이 존재하는지 확인하고, 링크를 가져오는 함수
const checkIfFileExists = async (fileName: string) => {
  const key = `thumbnails/${fileName}.jpeg`;

  try {
    // headObject 메서드를 사용하여 파일 존재 여부 확인
    const command = new HeadObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await s3.send(command);

    return true; // 파일이 존재하면 참 반환
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === "NotFound") {
      return false; // 파일이 없으면 거짓 반환
    }

    throw error; // 다른 오류가 있을 경우
  }
};

const downloadThumbnail = async ({
  imageUrl,
  fileName,
}: {
  imageUrl: string;
  fileName: string;
}) => {
  try {
    // 업로드 전에 파일이 이미 존재하는지 확인
    const existingFileUrl = await checkIfFileExists(fileName);
    if (existingFileUrl) {
      console.log("파일이 이미 존재합니다.");
      return; // 파일이 존재하면 얼리 리턴
    }

    // 이미지 다운로드
    const res = await fetch(imageUrl);
    if (!res.ok) {
      throw new Error(`이미지 다운로드 실패: ${res.statusText}`);
    }

    // 이미지 버퍼화
    const buffer = Buffer.from(await res.arrayBuffer());

    // 이미지 최적화 (리사이징)
    const optimizedImage = await sharp(buffer)
      .resize(400, 210, { fit: "cover" })
      .jpeg({ quality: 20 })
      .toBuffer();

    // S3에 업로드할 파일 경로
    const uploadParams = {
      Bucket: bucketName,
      Key: `thumbnails/${fileName}.jpeg`,
      Body: optimizedImage,
      ContentType: "image/jpeg",
    };

    // S3에 업로드
    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    console.log("✅ S3 업로드 성공:", fileName);
  } catch (error) {
    console.error("❌ S3 업로드 실패:", error);
    throw new Error("이미지 다운로드 및 업로드 실패");
  }
};

export default downloadThumbnail;
