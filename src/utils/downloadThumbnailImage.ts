/* eslint-disable no-console */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const isServer = typeof window === "undefined"; // 서버 환경인지 확인

const downloadThumbnailImage = async ({
  imageUrl,
  savePath,
}: {
  imageUrl: string;
  savePath: string;
}) => {
  // 클라이언트 환경이면 실행하지 않음
  if (!isServer) {
    return;
  }

  // 저장 경로를 조회하고 없으면 생성
  const dir = path.dirname(savePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // 저장 경로에 이미지가 존재하면 다운로드 하지 않음
  if (fs.existsSync(savePath)) {
    return;
  }

  // 서버에 이미지 다운로드
  const res = await fetch(imageUrl);

  if (!res.ok) {
    throw new Error("이미지 다운로드 실패");
  }

  // 파일데이터 버퍼 변환
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 이미지 최적화 1200, 630
  const optimizedImage = await sharp(buffer)
    .resize(400, 210, { fit: "cover" })
    .jpeg({ quality: 8 })
    .toBuffer();

  // 이미지 데이터를 로컬 파일 시스템에 저장
  await fs.promises.writeFile(savePath, optimizedImage);
};

export default downloadThumbnailImage;
