import formatWage from "@/src/utils/wageFormatter";
import React from "react";

const TotalPrice = ({ total }: { total: number }) => (
  <div className="font-20px-bold mt-24 flex justify-between border-t-2 pt-16">
    <p>총 합계</p>
    <div>{formatWage(total)}</div>
  </div>
);

export default TotalPrice;
