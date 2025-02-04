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
      <Dropdown.Menu className="left-auto right-0 z-20">
        <Dropdown.Item onClick={() => router.push(PATH_NAMES.MyPage)}>
          마이페이지
        </Dropdown.Item>
        <Dropdown.Item onClick={() => router.push("/my-reservations")}>
          예약내역
        </Dropdown.Item>
        <Dropdown.Item onClick={() => router.push("/my-activities")}>
          내 체험 관리
        </Dropdown.Item>
        <Dropdown.Item onClick={() => router.push("/reservation-history")}>
          예약 현황
        </Dropdown.Item>
        <Dropdown.Item onClick={handleSignOut}>로그아웃</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserProfile;
