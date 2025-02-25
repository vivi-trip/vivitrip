import formatWage from "@/src/utils/wageFormatter";
import React from "react";

const Price = ({ price }: { price: number }) => (
  <div className="flex flex-row items-center gap-5 pt-30 pb-10">
    <p className="font-28px-bold text-black">{formatWage(price)}</p>
    <p className="font-20px-regular text-gray-600">/ 인</p>
  </div>
);

export default Price;
