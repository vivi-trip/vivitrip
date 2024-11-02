import Avatar from "@/src/components/Avatar";
import Dropdown from "@/src/components/Dropdown";
import { useSignOut } from "@/src/queries/auth";

const UserProfile = () => {
  const { handleSignOut } = useSignOut();

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
