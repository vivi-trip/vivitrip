import Notification from "@/src/components/Notification";
import UserProfile from "@/src/components/UserProfile";

const UserMenu = () => {
  return (
    <div className="flex items-center justify-between">
      <Notification />
      <hr className="mx-6 h-5 border-0 border-l-[1px] border-gray-200" />
      <UserProfile />
    </div>
  );
};

export default UserMenu;
