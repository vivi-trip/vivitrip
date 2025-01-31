/* eslint-disable no-console */
import IconClose from "@/assets/svgs/close.svg";
import HighlightText from "@/src/components/HighlightText/HighlightText";
import STATUS_KEYWORD_HIGHLIGHT from "@/src/constants/my-notifications";
import type { MyNotificationsProps } from "@/src/types/my-notifications";
import { getTimeDiffText } from "@/src/utils/date";
import clsx from "clsx";
import Link from "next/link";
import { MouseEvent, useMemo } from "react";

const NotificationItem = ({
  item,
  handleDelete,
}: {
  item: MyNotificationsProps;
  handleDelete: () => void;
}) => {
  /**
   * @todo
   * 1.
   * swagger 에서 응답 객체에는 { id, teamId, userId, content, createdAt, updatedAt, deletedAt } 7가지가 전부이다.
   * 예약 상태에는 [ pending, confirmed, declined, canceled, completed ] 5가지가 있다.
   * 실제 데이터를 확인하여 예약상태를 구현할 것.
   *
   * 2.
   * 알람을 클릭하면 마이페이지의 예약 내역(승인|거절), 예약 현황(새로 들어왔어요.) 으로 이동하는 링크 구현
   */
  const statusColor = useMemo<string | null>(() => {
    if (item.content.includes("승인")) {
      return `bg-${STATUS_KEYWORD_HIGHLIGHT["승인"]}`;
    }

    if (item.content.includes("거절")) {
      return `bg-${STATUS_KEYWORD_HIGHLIGHT["거절"]}`;
    }

    if (item.content.includes("새로 들어왔어요.")) {
      return `bg-${STATUS_KEYWORD_HIGHLIGHT["새로 들어왔어요."]}`;
    }

    return null;
  }, [item]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const MOCK_PATHNAME = {
    blue: `/my-page`,
    red: `/my-page`,
    green: `/my-page`,
  };

  console.log(statusColor?.split("-")[1]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleDelete();
  };

  return (
    <Link
      href="/my-page"
      className="flex flex-col items-stretch justify-center gap-4 rounded border border-brand-100 bg-white p-12 shadow-md">
      <div className="flex items-center justify-between">
        <p className={clsx(statusColor, "size-5 rounded-full")} />
        <IconClose
          className="origin-right scale-75 cursor-pointer text-gray-500"
          onClick={handleClick}
        />
      </div>

      <HighlightText
        className="font-12px-regular"
        text={item.content}
        keywords={STATUS_KEYWORD_HIGHLIGHT}
      />

      <p className="font-12px-regular text-gray-700">
        {getTimeDiffText(item.updatedAt)}
      </p>
    </Link>
  );
};

export default NotificationItem;
