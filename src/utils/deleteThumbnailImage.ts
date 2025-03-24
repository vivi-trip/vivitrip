const deleteThumbnailImage = async ({ id }: { id: number }) => {
  const res = await fetch("/api/deleteThumbnailImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  return data;
};

export default deleteThumbnailImage;
