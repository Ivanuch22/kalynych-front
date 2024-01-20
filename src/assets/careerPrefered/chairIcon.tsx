import React from "react";

import { IIcon } from "@/interfaces/icon.interface";

const ChairIcon: React.FC<IIcon> = ({ className }) => {
  return (
    <div className={className}>
      <svg viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 3h-4.42v3.33H11v3.33H8.42V16H6v2h4.42v-3.33H13v-3.33h2.58V8H18V6z"></path>
      </svg>
    </div>
  );
};

export default ChairIcon;
