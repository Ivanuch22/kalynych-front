import React from "react";
import { format } from "date-fns";

import { Box, Typography } from "@mui/material";

import PushPinIcon from "@mui/icons-material/PushPin";
import CheckIcon from "@mui/icons-material/Check";

interface IJobItem {
  name: string;
  text: string;
  created: string;
  onSetId?: () => void;
  borderPurple: boolean;
  pinnedCvName: string;
  // @ts-ignore
  recommended: boolean;
}

const JobsItem: React.FC<IJobItem> = ({
  name,
  text,
  created,
  onSetId,
  borderPurple,
  pinnedCvName,
  recommended,
}) => {
  return (
    <Box
      sx={{
        width: "200px",
        height: "156px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
        marginBottom: "14px",
        display: "flex",
        flexDirection: "column",
        padding: "18px",
        justifyContent: "space-between",
        cursor: "pointer",
        border: borderPurple ? "2px solid #5A3AB6" : "2px solid transparent",
      }}
      onClick={onSetId}
    >
      <Typography
        sx={{
          color: "var(--text-color-60, #495057)",
          fontFamily: "Poppins",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "16px",
          textTransform: "capitalize",
          userSelect: "none",
        }}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          color: "var(--text-color-60, #495057)",
          fontFamily: "Poppins",
          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "16px",
          textTransform: "capitalize",
          marginTop: "12px",
          userSelect: "none",
        }}
      >
        {text?.length > 120 ? text?.substring(0, 120) + "..." : text}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
        <PushPinIcon sx={{ height: "14px", display: "flex" }} />
        <Typography
          sx={{
            color: "var(--text-color-60, #495057)",
            fontFamily: "Poppins",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "16px",
            textTransform: "capitalize",
            userSelect: "none",
          }}
        >
          {pinnedCvName}
        </Typography>
      </Box>

      {recommended && (
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
          <CheckIcon sx={{ height: "14px", display: "flex" }} />
          <Typography
            sx={{
              color: "var(--text-color-60, #495057)",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "16px",
              textTransform: "capitalize",
              userSelect: "none",
            }}
          >
            Added by Concierg
          </Typography>
        </Box>
      )}
      <Typography
        sx={{
          color: "var(--text-color-60, #495057)",
          fontFamily: "Poppins",
          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "16px",
          textTransform: "capitalize",
          marginTop: "12px",
          userSelect: "none",
        }}
      >
        {format(new Date(created), "dd.MM.yyyy")}
      </Typography>
    </Box>
  );
};

export default JobsItem;
