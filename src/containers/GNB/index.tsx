import Logo from "@/src/components/Logo";
import SignMenu from "@/src/components/SignMenu";
import UserMenu from "@/src/components/UserMenu";
import useWindowSize from "@/src/hooks/useWindowSize";
import useUserStore from "@/src/stores/useUserStore";

const GNB = () => {
  const { userData } = useUserStore();
  const windowSize = useWindowSize();

  return (
    <header className="h-header w-full border-b border-solid border-gray-200 p-24 lg:px-24">
      <div className="mx-auto flex h-full max-w-screen-xl justify-between">
        <Logo size={windowSize === "xs" ? "sm" : "md"} />
        {userData ? <UserMenu /> : <SignMenu />}
      </div>
    </header>
  );
};

export default GNB;
