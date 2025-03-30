/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { path } = req.query;
    if (!path || typeof path !== "string") {
      return res.status(400).json({ error: "Path is required" });
    }
    await res.revalidate(path);
    return res.json({ revalidate: true });
  } catch (error) {
    console.error("Revalidation error:", error);
    return res.status(500).send("Revalidation Failed");
  }
};

export default handler;
