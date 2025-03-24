import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }

  // 이미지 파일명
  const imageFileName = `${id}.jpeg`;

  // 로컬 저장 경로
  const imagePath = path.join(
    process.cwd(),
    "public",
    "images",
    "thumbnail",
    imageFileName,
  );

  try {
    // 이미지 존재 확인
    if (fs.existsSync(imagePath)) {
      // 이미지 삭제
      await fs.promises.unlink(imagePath);
      return res.status(200).json({ message: "이미지 삭제 완료" });
    }
    return res.status(500).json({ error: "이미지가 존재하지 않음" });
  } catch (error) {
    return res.status(500).json({ error: "이미지 삭제 실패" });
  }
};

export default handler;
