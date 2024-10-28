import IconNotification from "@/assets/svgs/ic_notification.svg";
import Dropdown from "@/src/components/Dropdown";
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
          <i className="z-4 absolute right-0 top-0 h-8 w-8 -translate-x-2 -translate-y-2 rounded-full border border-white bg-red-200" />
        )}
        <IconNotification className="text-gray-600" />
      </Dropdown.Trigger>
      <Dropdown.Menu className="left-auto right-0 w-fit">
        <Dropdown.Close>X</Dropdown.Close>
        <NotificationItem />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notification;
