import React from "react";

import { Box, Button, Typography } from "@mui/material";

import styles from "./PaymentForm.module.css";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import LaunchIcon from "@mui/icons-material/Launch";

const PaymentsAndSubscriptions: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "1122px",
        boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
        borderRadius: "2px",
        alignItems: "center",
        marginBottom: "24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "2px solid #c1c1c1",
          marginTop: "60px",
          paddingBottom: "34px",
          width: "80%",
        }}
      >
        <Typography
          sx={{
            color: "#030303",
            fontSize: "20px",
            fontFamily: "Roboto",
            fontWeight: 700,
            lineHeight: "24px",
            textAlign: "start",
          }}
        >
          SeekerConcierge
        </Typography>

        <Button
          variant="contained"
          startIcon={
            <PowerSettingsNewIcon
              className={styles.img}
              sx={{ fontSize: "12px !important" }}
            />
          }
          // onClick={() => setModalStripeOpen(true)}
          sx={{
            backgroundColor: "#38813b",
            height: "20px",
            fontSize: "10px",
            textTransform: "capitalize",
            fontWeight: "400",
            marginRight: "24px",
            "&:hover": {
              backgroundColor: "#5A3AB6",
            },
          }}
        >
          Concierge is Active
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "2px solid #c1c1c1",
          marginTop: "60px",
          paddingBottom: "34px",
          width: "80%",
        }}
      >
        <Typography
          sx={{
            color: "#030303",
            fontSize: "20px",
            fontFamily: "Roboto",
            fontWeight: 700,
            lineHeight: "24px",
            textAlign: "start",
          }}
        >
          Token Balance
        </Typography>

        <Button
          variant="contained"
          startIcon={
            <PowerSettingsNewIcon
              className={styles.img}
              sx={{ fontSize: "12px !important" }}
            />
          }
          sx={{
            backgroundColor: "#5A3AB6",
            height: "20px",
            fontSize: "10px",
            textTransform: "capitalize",
            fontWeight: "400",
            marginRight: "24px",
            "&:hover": {
              backgroundColor: "#5A3AB6",
            },
          }}
        >
          20
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "60px",
          paddingBottom: "34px",
          width: "80%",
          marginBottom: "24px",
        }}
      >
        <Typography
          sx={{
            color: "#030303",
            fontSize: "20px",
            fontFamily: "Roboto",
            fontWeight: 700,
            lineHeight: "24px",
            textAlign: "start",
          }}
        >
          Payments History & Other Payments Information
        </Typography>

        <Button
          variant="contained"
          endIcon={
            <LaunchIcon
              className={styles.img}
              sx={{ fontSize: "12px !important" }}
            />
          }
          sx={{
            backgroundColor: "#5A3AB6",
            height: "20px",
            fontSize: "10px",
            textTransform: "capitalize",
            fontWeight: "400",
            marginRight: "24px",
            "&:hover": {
              backgroundColor: "#5A3AB6",
            },
          }}
        >
          Go to Stripe Customer Portl
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentsAndSubscriptions;
