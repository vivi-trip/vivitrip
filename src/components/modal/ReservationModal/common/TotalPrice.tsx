import formatWage from "@/src/utils/wageFormatter";
import React from "react";

const TotalPrice = ({ total }: { total: number }) => (
  <div className="flex justify-between border-t-2 mt-24 pt-16 font-20px-bold">
    <p>총 합계</p>
    <div>{formatWage(total)}</div>
  </div>
);

export default TotalPrice;
