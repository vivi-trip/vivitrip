const deleteThumbnailImage = async ({
  id,
}: {
  id: number;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await fetch("/api/deleteThumbnailImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      return { success: false, message: `서버 오류: ${res.status}` };
    }

    const data = await res.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("썸네일 이미지 삭제 중 오류 발생:", error);
    return { success: false, message: "이미지 삭제 중 오류가 발생했습니다." };
  }
};

export default deleteThumbnailImage;
