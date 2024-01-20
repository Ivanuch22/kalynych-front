import React, { useCallback, useEffect, useRef, useState } from "react";

import { Box, Chip, Typography } from "@mui/material";

import StatusIcon from "@/assets/jobDescription/StatusIcon";

import styles from "./Filtering.module.css";

interface IFiltering {
  sortOption: string[];
  setTypeOfMethod: (typeOfMethod: string) => void;
  typeOfMethod: string;
}

const Filtering: React.FC<IFiltering> = ({
  sortOption,
  setTypeOfMethod,
  typeOfMethod,
}) => {
  const methotPopUpRef = useRef<HTMLDivElement | null>(null);

  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideStatuses);

    return () => {
      document.removeEventListener("click", handleClickOutsideStatuses);
    };
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsMethodDropdownOpen((prev) => !prev);
  }, []);

  const handleClickOutsideStatuses = (event: MouseEvent) => {
    if (
      methotPopUpRef.current &&
      !methotPopUpRef.current.contains(event.target as Node)
    ) {
      setIsMethodDropdownOpen(false);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <div className={styles.smallWrapper}>
        <Typography
          sx={{
            color: "#495057",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "14px",
            marginLeft: "20px",
          }}
        >
          Filter
        </Typography>
        <div
          className={styles.filterBtnWrapper}
          onClick={toggleDropdown}
          ref={methotPopUpRef}
        >
          <StatusIcon className={styles.statusImg} />
          <Typography
            sx={{
              color: "#495057",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "300",
              lineHeight: "14px",
            }}
          >
            Role
          </Typography>
        </div>
        {isMethodDropdownOpen && (
          <div className={styles.optionWrapper}>
            {sortOption.map((method) => {
              return (
                <div
                  key={method}
                  onClick={() => {
                    setTypeOfMethod(method);
                    setIsMethodDropdownOpen(false);
                  }}
                  className={styles.optionFilter}
                >
                  {method}
                </div>
              );
            })}
          </div>
        )}
        {typeOfMethod && (
          <Chip
            sx={{
              height: "16px",
              fontSize: "12px",
              marginLeft: "8px",
              padding: "12px 8px",
              "& .MuiChip-deleteIcon": {
                width: "12px",
                height: "12px",
                fontSize: "10px",
              },
            }}
            label={typeOfMethod.toUpperCase()}
            onDelete={() => setTypeOfMethod("")}
          />
        )}
      </div>
    </Box>
  );
};

export default Filtering;
