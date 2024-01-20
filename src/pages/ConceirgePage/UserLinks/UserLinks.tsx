import React, { useState } from "react";

import { Box, Chip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import styles from "./UserLinks.module.css";

interface IAllQuery {
  id: number;
  user_id: number;
  title: string;
  linkedin_url: string;
}

interface IUserLinks {
  userId: number | undefined;
  userLinks: IAllQuery[] | null;
}

const UserLinks: React.FC<IUserLinks> = ({ userLinks }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
        padding: "38px",
      }}
    >
      <Typography
        sx={{
          color: "#030303",
          fontSize: "14px",
          fontFamily: "Roboto",
          lineHeight: "18px",
        }}
      >
        For Jobs Posted in the last 24 hrs
      </Typography>

      {/* <Box
        sx={{
          marginTop: "24px",
          width: "100%",
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <Typography
          sx={{
            marginTop: "24px",
            width: "100%",
            display: "flex",
          }}
        >
          Job Title
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
          <Chip
            label="All Job Titles"
            variant="outlined"
            sx={
              type === "All Job Titles"
                ? {
                    background: "#5A3AB6",
                    border: "none",
                    width: '112px',
                    whiteSpace: "normal",
                    textAlign: "center",
                    color: "#fff",
                    flexWrap: "wrap",
                    "& .MuiChip-label": {
                      whiteSpace: "normal",
                    },
                  }
                : {
                    border: "1px solid #5A3AB6",
                    color: "#5A3AB6",
                    width: '112px',
                    whiteSpace: "normal",
                    textAlign: "center",
                    flexWrap: "wrap",
                    "& .MuiChip-label": {
                      whiteSpace: "normal",
                    },
                  }
            }
            onClick={() => setType("All Job Titles")}
          />
          <Chip
            label="Program Manager"
            variant="outlined"
            sx={
              type === "Program Manager"
                ? {
                    background: "#5A3AB6",
                    border: "none",
                    width: '130px',
                    whiteSpace: "normal",
                    textAlign: "center",
                    color: "#fff",
                    marginLeft: "26px",
                    flexWrap: "wrap",
                    "& .MuiChip-label": {
                      whiteSpace: "normal",
                    },
                  }
                : {
                    border: "1px solid #5A3AB6",
                    color: "#5A3AB6",
                    marginLeft: "26px",
                    whiteSpace: "normal",
                    width: '130px',
                    textAlign: "center",
                    flexWrap: "wrap",
                    "& .MuiChip-label": {
                      whiteSpace: "normal",
                    },
                  }
            }
            onClick={() => setType("Program Manager")}
          />
          <Chip
            label="Strategy Manager"
            variant="outlined"
            sx={
              type === "Strategy Manager"
                ? {
                    background: "#5A3AB6",
                    border: "none",
                    width: '130px',
                    whiteSpace: "normal",
                    textAlign: "center",
                    marginLeft: "26px",
                    color: "#fff",
                    flexWrap: "wrap",
                    "& .MuiChip-label": {
                      whiteSpace: "normal",
                    },
                  }
                : {
                    border: "1px solid #5A3AB6",
                    color: "#5A3AB6",
                    whiteSpace: "normal",
                    marginLeft: "26px",
                    textAlign: "center",
                    width: '130px',
                    flexWrap: "wrap",
                    "& .MuiChip-label": {
                      whiteSpace: "normal",
                    },
                  }
            }
            onClick={() => setType("Strategy Manager")}
          />
        </Box>
      </Box> */}

      <Box sx={{ display: "flex", flexDirection: "column", marginTop: "24px" }}>
        {userLinks?.length ? (
          userLinks?.map((el: IAllQuery) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                width: "100%",
                marginBottom: "12px",
              }}
            >
              <Typography
                sx={{
                  color: "#030303",
                  fontSize: "14px",
                  fontFamily: "Roboto",
                  lineHeight: "18px",
                  width: "100px",
                  userSelect: "none",
                }}
              >
                {el.title}:
              </Typography>
              <Link
                className={styles.links}
                to={el.linkedin_url}
                target="blanck"
              >
                {el.linkedin_url}
              </Link>
            </Box>
          ))
        ) : (
          <Typography
            sx={{
              color: "#5A3AB6",
              fontSize: "14px",
              fontFamily: "Roboto",
              lineHeight: "18px",
              userSelect: "none",
            }}
          >
            This user have not links
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserLinks;
