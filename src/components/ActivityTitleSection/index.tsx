import IcLocation from "@/assets/svgs/ic_location.svg";
import IcStar from "@/assets/svgs/star.svg";
import { ActivityDetailResponse } from "@/src/types/activitiesResponses";
import { ChildrenProp } from "@/src/types/type";
import { ReactNode } from "react";

const Category = ({ children }: ChildrenProp) => {
  return <p className="font-14px-regular">{children}</p>;
};

const Title = ({ children }: ChildrenProp) => {
  return <p className="font-24px-bold md:font-32px-bold mt-10">{children}</p>;
};

const Rating = ({ rating, reviewCount }: Partial<ActivityDetailResponse>) => {
  return (
    <div className="flex items-center gap-6">
      <IcStar />
      <p className="font-14px-regular">{`${rating} (${reviewCount})`}</p>
    </div>
  );
};

const Address = ({ children }: ChildrenProp) => {
  return (
    <div className="flex items-center gap-2">
      <IcLocation />
      <p className="font-14px-regular">{children}</p>
    </div>
  );
};

interface ActivityTitleSectionProps extends Partial<ActivityDetailResponse> {
  userMenu: ReactNode;
}

const ActivityTitleSection = ({
  category,
  title,
  rating,
  reviewCount,
  address,
  userMenu,
}: ActivityTitleSectionProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Category>{category}</Category>
        <Title>{title}</Title>
        <div className="mt-16 flex flex-col gap-12 lg:flex-row">
          <Rating rating={rating} reviewCount={reviewCount} />
          <Address>{address}</Address>
        </div>
      </div>
      {userMenu && <div>{userMenu}</div>}
    </div>
  );
};

export default ActivityTitleSection;
