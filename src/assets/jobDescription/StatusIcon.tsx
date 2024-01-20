import React from "react";

import { IIcon } from "@/interfaces/icon.interface";

const StatusIcon: React.FC<IIcon> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Icon/status-online">
          <path
            id="Icon"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.02049 1.45407C2.1767 1.61028 2.1767 1.86355 2.02049 2.01976C0.927024 3.11322 0.927023 4.88609 2.02049 5.97956C2.1767 6.13576 2.1767 6.38903 2.02049 6.54524C1.86428 6.70145 1.61102 6.70145 1.45481 6.54524C0.0489188 5.13935 0.0489189 2.85996 1.45481 1.45407C1.61102 1.29786 1.86428 1.29786 2.02049 1.45407ZM5.98029 1.45416C6.1365 1.29795 6.38977 1.29795 6.54598 1.45416C7.95187 2.86005 7.95187 5.13945 6.54598 6.54533C6.38977 6.70154 6.1365 6.70154 5.98029 6.54533C5.82408 6.38912 5.82408 6.13586 5.98029 5.97965C7.07376 4.88618 7.07376 3.11332 5.98029 2.01985C5.82408 1.86364 5.82408 1.61037 5.98029 1.45416ZM3.15186 2.58544C3.30807 2.74165 3.30807 2.99492 3.15186 3.15113C2.68324 3.61976 2.68324 4.37956 3.15186 4.84818C3.30807 5.00439 3.30807 5.25766 3.15186 5.41387C2.99565 5.57008 2.74239 5.57008 2.58618 5.41387C1.80513 4.63282 1.80513 3.36649 2.58618 2.58544C2.74239 2.42923 2.99566 2.42923 3.15186 2.58544ZM4.84892 2.58554C5.00513 2.42933 5.2584 2.42933 5.41461 2.58554C6.19565 3.36658 6.19565 4.63291 5.41461 5.41396C5.2584 5.57017 5.00513 5.57017 4.84892 5.41396C4.69271 5.25775 4.69271 5.00449 4.84892 4.84828C5.31755 4.37965 5.31755 3.61985 4.84892 3.15122C4.69271 2.99501 4.69271 2.74174 4.84892 2.58554ZM4.00039 3.59975C4.22131 3.59975 4.40039 3.77883 4.40039 3.99975V4.00375C4.40039 4.22466 4.22131 4.40375 4.00039 4.40375C3.77948 4.40375 3.60039 4.22466 3.60039 4.00375V3.99975C3.60039 3.77883 3.77948 3.59975 4.00039 3.59975Z"
            fill="#495057"
          />
        </g>
      </svg>
    </div>
  );
};

export default StatusIcon;
