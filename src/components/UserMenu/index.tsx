import Notification from "@/src/components/Notification";
import UserProfile from "@/src/components/UserProfile";

const UserMenu = () => {
  return (
    <div className="flex items-center justify-between">
      <Notification />
      <hr className="mx-16 h-20 border-0 border-l border-gray-200 md:mx-24" />
      <UserProfile />
    </div>
  );
};

export default UserMenu;
