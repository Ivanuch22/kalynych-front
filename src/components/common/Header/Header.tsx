import React, { useEffect, useState } from "react";

import { useAuth } from "@/context/Auth";
import { Link, useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import routes from "@/routes";
import { localStorageManager } from "@/services";
import { useStripeModal } from "@/context/StripeModal";
import { usePage } from "@/context/PageNaming";

import { RoleEnums, StatusEnums } from "@/enums";

import styles from "./header.module.css";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import SearchIcon from '@mui/icons-material/Search';

const Header: React.FC = () => {
  const { pageName } = usePage();
  const navigate = useNavigate();

  const {
    status,
    setModalStripeOpen,
    setBuyMeADrinkModal,
    setModalWithTokenOpen,
    setModalConciergOpen,
  } = useStripeModal();

  const { logout } = useAuth();

  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string>("");

  const handleLogOut = () => {
    setUserName("");
    localStorageManager.removeUser();
    logout();
    navigate(routes.auth);
  };

  const handleSetModalStripeOpen = (status: StatusEnums | undefined) => {
    if (status === StatusEnums.Inactive) {
      setModalStripeOpen(true);
    } else if (status === StatusEnums.PendingProfile) {
      setModalConciergOpen(true);
    } else if (status === StatusEnums.Active) {
      setModalWithTokenOpen(true);
    }
  };

  useEffect(() => {
    const userDataLocalStorage = localStorageManager.getUser();

    if (userDataLocalStorage?.name) {
      setUserName(userDataLocalStorage.name);
      setUserId(userDataLocalStorage.id);
      setUserRole(userDataLocalStorage.role);
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        padding: "24px 12px 12px 12px",
        borderBottom: "1px solid #c1c1c1",
        marginLeft: "12px",
        marginRight: "18px",
        minWidth: "1000px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: "24px",
          fontWeight: "600",
          lineHeight: "26px",
          color: "#343a40",
          userSelect: "none",
        }}
      >
        {pageName}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="contained"
          startIcon={<SearchIcon sx={{ fontSize: "12px !important" }} />}
          sx={{
            backgroundColor: "#5A3AB6",
            height: "20px",
            fontSize: "10px",
            textTransform: "capitalize",
            fontWeight: "400",
            marginRight: "24px",
            color: "#fff",
            borderRadius: "25px",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#5A3AB6",
              border: "1px solid #5A3AB6",
              borderRadius: "25px",
            },
          }}
        >
          Find Jobs
        </Button>
        <Button
          variant="contained"
          startIcon={<SportsBarIcon sx={{ fontSize: "12px !important" }} />}
          onClick={() => setBuyMeADrinkModal(true)}
          sx={{
            backgroundColor: "#5A3AB6",
            height: "20px",
            fontSize: "10px",
            textTransform: "capitalize",
            fontWeight: "400",
            marginRight: "24px",
            color: "#fff",
            borderRadius: "25px",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#5A3AB6",
              border: "1px solid #5A3AB6",
              borderRadius: "25px",
            },
          }}
        >
          Buy me a Drink!
        </Button>
        {userRole === RoleEnums.User && (
          <Button
            variant="contained"
            startIcon={
              <PowerSettingsNewIcon sx={{ fontSize: "12px !important" }} />
            }
            onClick={() => handleSetModalStripeOpen(status)}
            sx={{
              backgroundColor:
                status === StatusEnums.Requested
                  ? "#ffeeaa"
                  : status === StatusEnums.PendingProfile
                  ? "#ffeeaa"
                  : status === StatusEnums.PendingPayment
                  ? "#ffeeaa"
                  : status === StatusEnums.PendingAssignment
                  ? "#ffeeaa"
                  : status === StatusEnums.Active
                  ? "#38813b"
                  : "#5A3AB6",
              height: "20px",
              fontSize: "10px",
              textTransform: "capitalize",
              borderRadius: "25px",
              fontWeight: "400",
              marginRight: "24px",
              color:
                status === StatusEnums.Requested
                  ? "#000000"
                  : status === StatusEnums.PendingProfile
                  ? "#000000"
                  : status === StatusEnums.PendingPayment
                  ? "#000000"
                  : status === StatusEnums.PendingAssignment
                  ? "#000000"
                  : status === StatusEnums.Active
                  ? "#fff"
                  : "#fff",
              "&:hover": {
                backgroundColor:
                  status === StatusEnums.Requested
                    ? "#ffeeaa"
                    : status === StatusEnums.PendingProfile
                    ? "#ffeeaa"
                    : status === StatusEnums.PendingPayment
                    ? "#ffeeaa"
                    : status === StatusEnums.PendingAssignment
                    ? "#ffeeaa"
                    : status === StatusEnums.Active
                    ? "#38813b"
                    : "#5A3AB6",
              },
            }}
          >
            {status === StatusEnums.Requested && "Concierge is Pending"}
            {status === StatusEnums.PendingProfile && "Concierge is Pending"}
            {status === StatusEnums.PendingPayment && "Concierge is Pending"}
            {status === StatusEnums.PendingAssignment && "Concierge is Pending"}
            {status === StatusEnums.Active && "Concierge is Active"}
            {status === StatusEnums.Inactive && "Activate Conceirge"}
          </Button>
        )}

        <Link
          to={`${routes.userProfileSettings}${userId}`}
          className={styles.link}
        >
          {userName}
        </Link>

        <Button
          variant="contained"
          onClick={handleLogOut}
          sx={{
            marginLeft: "12px",
            backgroundColor: "#5A3AB6",
            height: "20px",
            fontSize: "10px",
            textTransform: "capitalize",
            borderRadius: "25px",
            fontWeight: "400",
            "&:hover": {
              backgroundColor: "#5A3AB6",
            },
          }}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
