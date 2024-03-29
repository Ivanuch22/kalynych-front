import React from "react";

import { IIcon } from "@/interfaces/icon.interface";

const LeftIcon: React.FC<IIcon> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Icon/chevron-double-left">
          <path
            id="Icon"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.28304 6.28285C6.12683 6.43906 5.87356 6.43906 5.71735 6.28285L3.71735 4.28285C3.56114 4.12664 3.56114 3.87337 3.71735 3.71716L5.71735 1.71716C5.87356 1.56095 6.12683 1.56095 6.28304 1.71716C6.43925 1.87337 6.43925 2.12664 6.28304 2.28285L4.56588 4.00001L6.28304 5.71716C6.43925 5.87337 6.43925 6.12664 6.28304 6.28285ZM3.88304 6.28285C3.72683 6.43906 3.47356 6.43906 3.31735 6.28285L1.31735 4.28285C1.16114 4.12664 1.16114 3.87337 1.31735 3.71716L3.31735 1.71716C3.47356 1.56095 3.72683 1.56095 3.88304 1.71716C4.03925 1.87337 4.03925 2.12664 3.88304 2.28285L2.16588 4.00001L3.88304 5.71716C4.03925 5.87337 4.03925 6.12664 3.88304 6.28285Z"
            fill="#495057"
          />
        </g>
      </svg>
    </div>
  );
};

export default LeftIcon;
