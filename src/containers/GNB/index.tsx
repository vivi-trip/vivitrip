import Logo from "@/src/components/Logo/Logo";
import SignMenu from "@/src/components/SignMenu";
import UserMenu from "@/src/components/UserMenu";
import useUserStore from "@/src/stores/userStore";

export async function getServerSideProps() {
  const user = { name: null };
  return {
    props: { user }, // 페이지에 전달
  };
}

const GNB = () => {
  /**
   * @todo
   * 사용자 확인하기 - 임시
   */
  const { user } = useUserStore();

  return (
    <header className="h-header w-full border-b-[1px] border-solid border-gray-200 px-32 py-16">
      <div className="mx-auto flex h-full max-w-screen-xl justify-between">
        <Logo />
        {user ? <UserMenu /> : <SignMenu />}
      </div>
    </header>
  );
};

export default GNB;
