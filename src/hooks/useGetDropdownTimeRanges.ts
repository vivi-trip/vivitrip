type TimeRange = { startTime: string; endTime: string };
type DropdownOptions = { startOptions: string[]; endOptions: string[] };

const useGetDropdownTimeRanges = (
  availableRanges: TimeRange[],
  selectedStart?: string,
): DropdownOptions => {
  const startOptions: string[] = [];
  let endOptions: string[] = [];

  availableRanges.forEach(({ startTime, endTime }) => {
    let currentHour = parseInt(startTime.split(":")[0], 10);
    const endHour = parseInt(endTime.split(":")[0], 10);
    while (currentHour < endHour) {
      startOptions.push(`${String(currentHour).padStart(2, "0")}:00`);
      currentHour += 1;
    }
  });

  if (selectedStart) {
    const selectedRange = availableRanges.find(
      ({ startTime, endTime }) =>
        selectedStart >= startTime && selectedStart < endTime,
    );
    if (selectedRange) {
      let currentHour = parseInt(selectedStart.split(":")[0], 10) + 1;
      const endHour = parseInt(selectedRange.endTime.split(":")[0], 10);
      while (currentHour <= endHour) {
        endOptions.push(`${String(currentHour).padStart(2, "0")}:00`);
        currentHour += 1;
      }
    }
  } else {
    endOptions = [...startOptions];
  }

  return { startOptions, endOptions };
};

export default useGetDropdownTimeRanges;
