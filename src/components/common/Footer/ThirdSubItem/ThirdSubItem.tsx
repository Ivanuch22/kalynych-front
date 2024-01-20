import React from "react";

import { Box, Typography } from "@mui/material";

const styles = {
  color: "var(--text-color-90, #495057)",
  fontFamily: "Poppins",
  fontSize: "12px",
  fontStyle: "normal",
  fontSeight: "400",
  lineSeight: "14px",
  textSransform: "capitalize",
  marginTop: "14px",
  cursor: "pointer",
};

const ThirdSubItem = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "128px",
      }}
    >
      <Typography
        sx={{
          color: "var(--text-color-90, #495057)",
          fontFamily: "Poppins",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "17px",
        }}
      >
        About
      </Typography>
      <Typography sx={styles}>Company</Typography>
      <Typography sx={styles}>Support</Typography>
      <Typography sx={styles}>Terms Conditions</Typography>
      <Typography sx={styles}>Privacy Policy</Typography>
      <Typography sx={styles}>Cookie Notice</Typography>
    </Box>
  );
};

export default ThirdSubItem;
