import Button from "@/src/components/Button/Button";
import { deleteKakaoUser, listKakaoUsers } from "@/src/services/auth";
import useUserStore from "@/src/stores/useUserStore";
import { useEffect, useState } from "react";

const MyPageKakao = () => {
  const { clearUser } = useUserStore();
  const [users, setUsers] = useState<[]>([]);

  const getKakaoUsers = async () => {
    const res = await listKakaoUsers();

    setUsers(res.data.elements as []);
  };

  const handleDeleteKakaoUser = async (id: number) => {
    await deleteKakaoUser(id);
    getKakaoUsers();
  };

  useEffect(() => {
    clearUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto flex min-h-main w-full max-w-640 flex-col items-stretch justify-center py-48">
      <div className="flex flex-col gap-8">
        <div>
          {users.length > 0 &&
            users.map((item) => {
              return (
                <div
                  key={`kakao-user-id-${item}`}
                  className="flex items-center justify-between gap-4 rounded bg-yellow-400 p-8 px-16">
                  <p>{item}</p>
                  <Button
                    type="button"
                    onClick={() => handleDeleteKakaoUser(item)}>
                    연결끊기
                  </Button>
                </div>
              );
            })}
        </div>
        <div className="p-4 px-8">
          <p>
            {users.length > 0
              ? `${users.length}명의 사용자가 있습니다.`
              : `조회된 사용자가 없습니다.`}
          </p>
        </div>
        <Button
          type="button"
          height="56"
          fullWidth
          radius="6"
          backgroundColor="black"
          fontStyle="xl"
          className="disabled:bg-gray-500"
          onClick={getKakaoUsers}>
          카카오 계정 확인
        </Button>
      </div>
    </div>
  );
};

export default MyPageKakao;
