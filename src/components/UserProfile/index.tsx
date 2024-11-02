import Avatar from "@/src/components/Avatar";
import Dropdown from "@/src/components/Dropdown";
import PATH_NAMES from "@/src/constants/pathname";
import useUserStore from "@/src/stores/userStore";
import { useRouter } from "next/router";

const UserProfile = () => {
  const { clearUser } = useUserStore();
  const router = useRouter();

  const handleSignOut = () => {
    clearUser();
    router.replace(PATH_NAMES.Root);
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Avatar />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleSignOut}>로그아웃</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserProfile;
