import React from "react";

import { IIcon } from "@/interfaces/icon.interface";

const SavedIcon: React.FC<IIcon> = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <svg viewBox="0 0 24 24">
        <path d="M0 0h24v24H0V0z" fill="none"></path>
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15-5-2.18L7 18V5h10v13z"></path>
      </svg>
    </div>
  );
};

export default SavedIcon;
