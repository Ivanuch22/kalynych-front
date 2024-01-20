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

const SecondSubItem = () => {
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
        Menu
      </Typography>
      <Typography sx={styles}>Platform</Typography>
      <Typography sx={styles}>Pricing</Typography>
      <Typography sx={styles}>Sign In</Typography>
      <Typography sx={styles}>Sign Up</Typography>
      <Typography sx={styles}>Affiliates</Typography>
    </Box>
  );
};

export default SecondSubItem;
