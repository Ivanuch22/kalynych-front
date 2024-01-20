import React from "react";
import {
  Modal,
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import IconButton from "@mui/material/IconButton";
import chai from "../../assets/drinkImages/tea.png";
import coffe from "../../assets/drinkImages/coffe.png";
import champain from "../../assets/drinkImages/champain.png";
import coctail from "../../assets/drinkImages/coctail.png";
import Item from "./Item/Item";

interface IBuyMeADrinkModal {
  isOpen: boolean;
  setModalClose: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IItem {
  id: number;
  name: string;
  img: string;
  price: string;
  mouthlyLink: string;
  onetimeLink: string;
}

const items: IItem[] = [
  {
    id: 1,
    name: "Coffee",
    img: coffe,
    price: "3$",
    mouthlyLink: "https://buy.stripe.com/fZe6pVfcu5MQ9hKfZ4",
    onetimeLink: "https://buy.stripe.com/fZe6pVfcu5MQ9hKfZ4",
  },
  {
    id: 2,
    name: "Chai",
    img: chai,
    price: "5$",
    mouthlyLink: "https://buy.stripe.com/3cs29F0hAb7a2TmeUZ",
    onetimeLink: "https://buy.stripe.com/3cs29F0hAb7a2TmeUZ",
  },
  {
    id: 3,
    name: "Cocktail",
    img: coctail,
    price: "20$",
    mouthlyLink: "https://buy.stripe.com/3csdSn4xQ7UY3Xq6ov",
    onetimeLink: "https://buy.stripe.com/3csdSn4xQ7UY3Xq6ov",
  },
  {
    id: 4,
    name: "Champagne",
    img: champain,
    price: "50$",
    mouthlyLink: "https://buy.stripe.com/00geWr2pI8Z2eC48wE",
    onetimeLink: "https://buy.stripe.com/00geWr2pI8Z2eC48wE",
  },
];

const BuyMeADrinkModal: React.FC<IBuyMeADrinkModal> = ({
  isOpen,
  setModalClose,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={() => setModalClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: "80%",
          height: "578px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "inline-flex",
          padding: "32px 16px",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#5A3AB6",
          borderRadius: "16px",
          border: "1px solid #21338e",
          boxSizing: "border-box",
          boxShadow: "2px 2px 0px #21338e",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            borderBottom: "4px solid #fff",
          }}
        >
          <Typography
            sx={{
              color: "#ffffff",
              fontSize: "24px",
              fontFamily: "Inter",
              fontWeight: 700,
              lineHeight: "31px",
            }}
          >
            Enjoying these tools?, Buy us a Drink!
          </Typography>

          <IconButton onClick={() => setModalClose(false)} aria-label="Close">
            <CloseIcon
              sx={{
                stroke: "#fff",
                fill: "#fff",
                fontSize: "44px !important",
              }}
            />
          </IconButton>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", marginTop: "12px" }}
        >
          <Typography
            sx={{
              color: "#ffffff",
              fontSize: "18px",
              fontFamily: "Inter",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "center",
            }}
          >
            We havent quite figured out our pricing model, but we need to keep
            this egine running in the mean time.
          </Typography>

          <Typography
            sx={{
              color: "#ffffff",
              fontSize: "18px",
              fontFamily: "Inter",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            Buy our team a drink (or many drinks!)
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "12px",
            }}
          >
            {items.map(
              ({ id, name, img, price, mouthlyLink, onetimeLink }: IItem) => (
                <Item
                  key={id}
                  name={name}
                  img={img}
                  price={price}
                  mouthlyLink={mouthlyLink}
                  onetimeLink={onetimeLink}
                />
              )
            )}
          </Box>

          <Typography
            sx={{
              color: "#ffffff",
              fontSize: "18px",
              fontFamily: "Inter",
              fontWeight: 400,
              lineHeight: "22px",
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            You will be redirected to our payment partner -Stripe - to complete
            your purchase
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default BuyMeADrinkModal;
