import React from "react";

import { Box, Typography } from "@mui/material";

import { FirstSubItem } from "./FirstSubItem";
import { SecondSubItem } from "./SecondSubItem";
import { ThirdSubItem } from "./ThirdSubItem";

import styles from "./Footer.module.css";

import FaceBookIcon from "@/assets/footer/FaceBookIcon";
import InstagramIcon from "@/assets/footer/InstagramIcon";
import TwitterIcon from "@/assets/footer/TwitterIcon";
import LinkedInIcon from "@/assets/footer/LinkedInIcon";
import YouTubeIcon from "@/assets/footer/YouTubeIcon";

const Footer: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          padding: "30px",
          justifyContent: "space-between",
          alignItems: "flex-start",
          alignSelf: "stretch",
          borderRadius: "6px",
          background: "#FFF",
        }}
      >
        <FirstSubItem />
        <SecondSubItem />
        <ThirdSubItem />
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "8px 62px 8px 21px",
          alignItems: "flex-start",
          alignSelf: "stretch",
          background: "#F2F2F5",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "#74788D",
            fontFamily: "Poppins",
            fontSize: "8px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "15px",
            textTransform: "capitalize",
          }}
        >
          © Copyright 2022 Skote | All Rights Reserved
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "120px",
            justifyContent: "space-between",
          }}
        >
          <FaceBookIcon className={styles.img} />
          <TwitterIcon className={styles.img} />
          <LinkedInIcon className={styles.img} />
          <InstagramIcon className={styles.img} />
          <YouTubeIcon className={styles.img} />
        </Box>
      </Box>
    </>
  );
};

export default Footer;
