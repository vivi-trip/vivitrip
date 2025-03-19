import type { AvailableTimes, TimeRange } from "@/src/types/reservation";

const formatTime = (time: string): string => {
  const [hour, minute] = time.split(":").map(Number);
  return `${String(hour).padStart(2, "0")}:${String(minute || 0).padStart(2, "0")}`;
};

const useGetAvailableTimeRanges = (
  blockedRanges: TimeRange[],
): AvailableTimes => {
  // 기본 전체 시간 범위
  let availableRanges: TimeRange[] = [{ startTime: "00:00", endTime: "24:00" }];

  // 차단된 시간 범위를 기준으로 가능한 시간 계산
  blockedRanges.forEach(({ startTime, endTime }) => {
    const formatBlockStart = formatTime(startTime);
    const formatBlockEnd = formatTime(endTime);

    availableRanges = availableRanges.flatMap(
      ({ startTime: availStart, endTime: availEnd }) => {
        const formatAvailableStart = formatTime(availStart);
        const formatAvailableEnd = formatTime(availEnd);

        if (
          formatBlockEnd <= formatAvailableStart ||
          formatBlockStart >= formatAvailableEnd
        )
          return [
            { startTime: formatAvailableStart, endTime: formatAvailableEnd },
          ];
        const newRanges: TimeRange[] = [];
        if (formatAvailableStart < formatBlockStart)
          newRanges.push({
            startTime: formatAvailableStart,
            endTime: formatBlockStart,
          });
        if (formatAvailableEnd > formatBlockEnd)
          newRanges.push({
            startTime: formatBlockEnd,
            endTime: formatAvailableEnd,
          });
        return newRanges;
      },
    );
  });

  return availableRanges;
};

export default useGetAvailableTimeRanges;
