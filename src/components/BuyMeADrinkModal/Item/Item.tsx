import React from "react";

import { Box, Button, Typography } from "@mui/material";

import styles from "./Item.module.css";

interface IItem {
  //   id: number;
  name: string;
  img: string;
  price: string;
  mouthlyLink: string;
  onetimeLink: string;
}

const Item: React.FC<IItem> = ({
  name,
  img,
  price,
  mouthlyLink,
  onetimeLink,
}) => {
  const handleOpenMouthlyLink = (status: string | undefined) => {
    window.open(status, "_blank");
  };

  const handleOpenOneTimeLink = (status: string | undefined) => {
    window.open(status, "_blank");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "275px",
        height: "365px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
      }}
    >
      <Typography
        sx={{
          color: "#5A3AB6",
          fontSize: "18px",
          fontFamily: "Poppins",
          fontWeight: "500",
          lineHeight: "23px",
          textAlign: "center",
          marginTop: "24px",
        }}
      >
        {name}
      </Typography>

      <img src={img} alt={name} className={styles.img} />

      <Typography
        sx={{
          color: "#030303",
          fontSize: "16px",
          fontFamily: "Roboto",
          fontWeight: 500,
          lineHeight: "19px",
          margin: "24px auto 0 auto",
        }}
      >
        {price}
      </Typography>

      <Button
        variant="contained"
        onClick={() => handleOpenMouthlyLink(mouthlyLink)}
        sx={{
          backgroundColor: "#5A3AB6",
          height: "20px",
          fontSize: "10px",
          textTransform: "capitalize",
          fontWeight: "400",
          marginRight: "24px",
          color: "#fff",
          borderRadius: "25px",
          margin: "24px auto 0 auto",
          "&:hover": {
            backgroundColor: "#5A3AB6",
          },
        }}
      >
        Buy it monthly
      </Button>

      <Button
        variant="contained"
        onClick={() => handleOpenOneTimeLink(onetimeLink)}
        sx={{
          backgroundColor: "#5A3AB6",
          height: "20px",
          fontSize: "10px",
          textTransform: "capitalize",
          fontWeight: "400",
          marginRight: "24px",
          color: "#fff",
          borderRadius: "25px",
          margin: "12px auto 0 auto",
          "&:hover": {
            backgroundColor: "#5A3AB6",
          },
        }}
      >
        Buy one-time
      </Button>
    </Box>
  );
};

export default Item;
