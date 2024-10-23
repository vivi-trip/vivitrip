import dayjs from "dayjs";
import "dayjs/locale/ko";

export const getTSBefore = (
  value: number,
  unit: "hour" | "day" | "week" | "year",
) => {
  return dayjs().subtract(value, unit).toDate();
};

dayjs.locale("ko");

export const getTimeDiff = (_date?: dayjs.ConfigType) => {
  const now = dayjs();
  const date = typeof _date === "number" ? dayjs.unix(_date) : dayjs(_date);

  const diff = {
    second: now.diff(date, "second"),
    minute: now.diff(date, "minute"),
    hour: now.diff(date, "hour"),
    day: now.diff(date, "day"),
    week: now.diff(date, "week"),
    month: now.diff(date, "month"),
    year: now.diff(date, "year"),
  };

  return diff;
};

export const getTimeDiffText = (
  _date?: dayjs.ConfigType,
  preserveDay?: boolean,
) => {
  const diff = getTimeDiff(_date);
  const date = typeof _date === "number" ? dayjs.unix(_date) : dayjs(_date);
  switch (true) {
    case diff.year > 0:
      return preserveDay
        ? dayjs(date).format("YYYY.MM.DD")
        : `${diff.year}년 전`;
    case diff.month > 0:
      return preserveDay
        ? dayjs(date).format("YYYY.MM.DD")
        : `${diff.month}달 전`;
    case diff.week > 0:
      return preserveDay
        ? dayjs(date).format("YYYY.MM.DD")
        : `${diff.week}주 전`;
    case diff.day > 0:
      return preserveDay
        ? dayjs(date).format("YYYY.MM.DD")
        : `${diff.day}일 전`;
    case diff.hour > 0:
      return `${diff.hour}시간 전`;
    case diff.minute > 0:
      return `${diff.minute}분 전`;
    default:
      return "방금 전";
  }
};

export { dayjs };
