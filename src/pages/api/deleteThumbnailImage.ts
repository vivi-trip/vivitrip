import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "허용되지 않는 메소드입니다" });
  }

  const { id } = req.body;

  // id 파라이터 확인
  if (!id) {
    return res.status(400).json({ error: "id 는 필수입니다" });
  }

  // id 의 타입 확인
  if (typeof id !== "number") {
    return res.status(400).json({ error: "id는 숫자로만 구성되어야 합니다" });
  }

  // 이미지 파일명
  const imageFileName = `${id}.jpeg`;

  // 저장 경로
  const rootDir = path.join(process.cwd(), "public", "images", "thumbnail");

  // 이미지 경로
  const imagePath = path.resolve(rootDir, imageFileName);

  // 저장 경로 내 이미지 확인
  if (!imagePath.startsWith(rootDir)) {
    return res.status(404).json({ error: "잘못된 파일 경로입니다" });
  }

  // 파일 존재 여부 확인
  try {
    await fs.promises.access(imagePath, fs.constants.F_OK);
  } catch (error) {
    return res
      .status(404)
      .json({ error: "삭제할 이미지 파일이 존재하지 않습니다" });
  }

  try {
    // 이미지 삭제
    await fs.promises.unlink(imagePath);

    return res.status(200).json({ message: "이미지 파일 삭제 성공" });
  } catch (error) {
    return res.status(500).json({ error: "이미지 파일 삭제 실패" });
  }
};

export default handler;
