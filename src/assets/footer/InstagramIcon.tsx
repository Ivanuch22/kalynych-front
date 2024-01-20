import React from "react";

import { IIcon } from "@/interfaces/icon.interface";

const InstagramIcon: React.FC<IIcon> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        width="14"
        height="13"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="ant-design:instagram-filled">
          <path
            id="Vector"
            d="M6.99921 4.80721C6.06737 4.80721 5.30692 5.56766 5.30692 6.4995C5.30692 7.43133 6.06737 8.19178 6.99921 8.19178C7.93104 8.19178 8.69149 7.43133 8.69149 6.4995C8.69149 5.56766 7.93104 4.80721 6.99921 4.80721ZM12.0748 6.4995C12.0748 5.79872 12.0811 5.10428 12.0418 4.40477C12.0024 3.59227 11.8171 2.87118 11.2229 2.27704C10.6275 1.68163 9.9077 1.49755 9.0952 1.45819C8.39442 1.41883 7.69999 1.42518 7.00047 1.42518C6.29969 1.42518 5.60526 1.41883 4.90575 1.45819C4.09325 1.49755 3.37215 1.6829 2.77801 2.27704C2.1826 2.87245 1.99852 3.59227 1.95917 4.40477C1.91981 5.10555 1.92616 5.79999 1.92616 6.4995C1.92616 7.19901 1.91981 7.89471 1.95917 8.59422C1.99852 9.40672 2.18387 10.1278 2.77801 10.722C3.37342 11.3174 4.09325 11.5015 4.90575 11.5408C5.60653 11.5802 6.30096 11.5738 7.00047 11.5738C7.70126 11.5738 8.39569 11.5802 9.0952 11.5408C9.9077 11.5015 10.6288 11.3161 11.2229 10.722C11.8183 10.1265 12.0024 9.40672 12.0418 8.59422C12.0824 7.89471 12.0748 7.20028 12.0748 6.4995ZM6.99921 9.10331C5.55829 9.10331 4.3954 7.94042 4.3954 6.4995C4.3954 5.05858 5.55829 3.89569 6.99921 3.89569C8.44012 3.89569 9.60301 5.05858 9.60301 6.4995C9.60301 7.94042 8.44012 9.10331 6.99921 9.10331ZM9.70966 4.39715C9.37323 4.39715 9.10155 4.12547 9.10155 3.78905C9.10155 3.45262 9.37323 3.18094 9.70966 3.18094C10.0461 3.18094 10.3178 3.45262 10.3178 3.78905C10.3179 3.86893 10.3022 3.94806 10.2717 4.02188C10.2412 4.0957 10.1964 4.16278 10.1399 4.21927C10.0834 4.27576 10.0163 4.32055 9.94249 4.35107C9.86866 4.38159 9.78954 4.39725 9.70966 4.39715Z"
            fill="#555B6D"
          />
        </g>
      </svg>
    </div>
  );
};

export default InstagramIcon;