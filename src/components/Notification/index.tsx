import IconNotification from "@/assets/svgs/ic_notification.svg";
import Dropdown from "@/src/components/Dropdown/Dropdown";
import NotificationItem from "@/src/components/NotificationItem";

const Notification = () => {
  /**
   * @todo
   * 알람 여부에 따라 인디케이터 출력
   */
  const Indicator = false;

  return (
    <Dropdown sustain>
      <Dropdown.Trigger>
        {Indicator && (
          <i className="absolute right-0 top-0 z-10 h-2 w-2 -translate-x-0.5 -translate-y-0.5 rounded-full bg-red-200" />
        )}
        <IconNotification viewBox="0 0 20 20" className="text-gray-600" />
      </Dropdown.Trigger>
      <Dropdown.Menu className="left-auto right-0 w-fit">
        <Dropdown.Item>X</Dropdown.Item>
        <NotificationItem />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notification;
