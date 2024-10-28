import Avatar from "@/src/components/Avatar";
import Dropdown from "@/src/components/Dropdown";
import PATH_NAMES from "@/src/constants/pathname";
import useUserStore from "@/src/stores/userStore";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const user = { name: null };
  return {
    props: { user }, // 페이지에 전달
  };
}

const UserProfile = () => {
  const { setUser } = useUserStore();
  const router = useRouter();

  const handleSignOut = () => {
    setUser(null);
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
