import React from "react";
import { footerList1, footerList2, footerList3 } from "../utils/constants";

const List = ({ list, mt = true }: { list: string[]; mt?: boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt ? "mt-5" : ""}`}>
    {list.map((item) => (
      <p
        key={item}
        className="text-gray-400 text-sm hover:underline cursor-pointer"
      >
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <List list={footerList1} mt={false} />
      <List list={footerList2} />
      <List list={footerList3} />
      <p className="text-gray-400 text-sm mt-5">2022 Tok Tik by Tomkovich</p>
    </div>
  );
};

export default Footer;
