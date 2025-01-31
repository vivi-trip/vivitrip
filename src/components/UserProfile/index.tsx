import Avatar from "@/src/components/Avatar";
import Dropdown from "@/src/components/Dropdown";
import PATH_NAMES from "@/src/constants/pathname";
import { useSignOut } from "@/src/queries/auth";
import { useRouter } from "next/router";

const UserProfile = () => {
  const router = useRouter();
  const { handleSignOut } = useSignOut();

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Avatar />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => router.push(PATH_NAMES.MyPage)}>
          마이페이지
        </Dropdown.Item>
        <Dropdown.Item onClick={handleSignOut}>로그아웃</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserProfile;
