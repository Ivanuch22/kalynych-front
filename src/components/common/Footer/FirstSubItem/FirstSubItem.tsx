import React from "react";

import { Box, Button, Typography } from "@mui/material";

const FirstSubItem = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          color: "var(--text-color-70, #343A40)",
          fontFamily: "Poppins",
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "18px",
          textTransform: "capitalize",
        }}
      >
        KALYNYCH
      </Typography>
      <Typography
        sx={{
          color: "var(--text-color-90, #495057)",
          fontFamily: "Poppins",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "16px",
          marginTop: "14px",
        }}
      >
        Start your free trial today
      </Typography>
      <Typography
        sx={{
          color: "var(--text-color-90, #495057)",
          fontFamily: "Poppins",
          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "16px",
          textTransform: "capitalize",
          marginTop: "14px",
        }}
      >
        Try UpLead Free For 7 Days. Plans Start At Just $99/Month With No
        Contract.
      </Typography>
      <Button
        sx={{
          marginTop: "24px",
          height: "20px",
          width: "200px",
          display: "flex",
          padding: "18px 12px",
          justifyContent: "center",
          alignItems: "center",
          gap: "4px",
          borderRadius: "4px",
          background: "var(--text-color-60, #5A3AB6)",
          color: "var(--text-color-20, #fff)",
          fontFamily: "Poppins",
          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "14px",
          textTransform: "capitalize",
          border: "none",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#5A3AB6",
          },
        }}
      >
        Start Free Trial
      </Button>
    </Box>
  );
};

export default FirstSubItem;
