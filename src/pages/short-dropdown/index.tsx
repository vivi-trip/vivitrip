import AltArrowDown from "@/assets/svgs/altArrowDown.svg";
import ShortDropdown from "@/src/components/shortDropdown/shortDropdown";
import useDropdown from "@/src/hooks/useDropdown";

type ArticleOrder = "like" | "recent";

interface SortDropdownProps {
  orderBy: ArticleOrder;
  onSortChange: (sortType: ArticleOrder) => void;
}

const SortDropdown = ({ orderBy, onSortChange }: SortDropdownProps) => {
  const { isOpen, handleToggleDropdown, handleOffDropdown } = useDropdown();

  const handleSortChange = (sortType: ArticleOrder) => {
    onSortChange(sortType);
    handleOffDropdown();
  };

  return (
    <div className="px-30 pt-40">
      <ShortDropdown onClose={handleOffDropdown}>
        <ShortDropdown.Trigger onClick={handleToggleDropdown}>
          <div className="font-18px-semibold flex h-40 w-140 items-center justify-between rounded-12 border border-green-100 px-10 py-20 text-green-100">
            {orderBy === "like" ? "좋아요 많은순" : "최신순"}
            <AltArrowDown />
          </div>
        </ShortDropdown.Trigger>
        <ShortDropdown.Menu
          isOpen={isOpen}
          className="absolute top-44 w-140 border-green-100">
          <ShortDropdown.List
            onClose={handleOffDropdown}
            onClick={() => handleSortChange("like")}>
            좋아요 많은순
          </ShortDropdown.List>
          <ShortDropdown.List
            onClose={handleOffDropdown}
            onClick={() => handleSortChange("recent")}>
            최신순
          </ShortDropdown.List>
        </ShortDropdown.Menu>
      </ShortDropdown>
    </div>
  );
};

export default SortDropdown;
