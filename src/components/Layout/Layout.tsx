import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import { Box, CircularProgress } from "@mui/material";

import { Header, SideBar } from "../common";

import { IUserData } from "@/interfaces/user.interfaces";

import api from "@/services/apiService";

import routes from "@/routes";

import { localStorageManager } from "@/services";

import { useAuth } from "@/context/Auth";

import { RoleEnums } from "@/enums";

import { useStripeModal } from "@/context/StripeModal";

import { BuyMeADrinkModal } from "../BuyMeADrinkModal";

import { ModalStripe } from "@/pages/JobDescriptionPage/ModalStripe";

import { UserTokensModal } from "../UserTokensModal";
import { ConciergeModalPendingUserData } from "../ConciergModalPendingUserData";

const Layout: React.FC = () => {
  const location = useLocation();
  const { role } = useAuth();
  const navigate = useNavigate();
  const {
    setUser,
    setBuyMeADrinkModal,
    buyMeADrinkModal,
    modalStripeOpen,
    modalConciergOpen,
    setModalConciergOpen,
    setModalStripeOpen,
    setModalWithTokenOpen,
    user,
    modalWithTokenOpen,
  } = useStripeModal();

  const userQuery = async () =>
    api.get<IUserData>(routes.user).then((res) => res.data);

  const {
    data: userDataQuery,
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IUserData>("getUserQuery", userQuery);

  useEffect(() => {
    if (role === RoleEnums.Concierge && location.pathname === "/") {
      navigate(routes.conceirgePage);
    }
  }, [role, location]);

  useEffect(() => {
    if (userDataQuery?.user.name) {
      setUser(userDataQuery.user);
      localStorageManager.setUser(userDataQuery.user);
    }
  }, [userDataQuery]);

  const handleCloseStripeModal = () => {
    setModalStripeOpen(false);
    window.location.reload();
  };

  const handleCloseUserTokensModal = () => {
    setModalWithTokenOpen(false);
    refetch();
  };

  const handleCloseModalConcierg = () => {
    setModalConciergOpen(false);
  };

  if (isLoading || isFetching)
    return <CircularProgress sx={{ color: "#5A3AB6" }} size={50} />;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent:
            location.pathname === "/" ||
            location.pathname === "/conceirge-page-user-data/"
              ? "flex-start"
              : "space-between",
        }}
      >
        <SideBar />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Header />
          <Outlet />
        </Box>

        {location.pathname !== "/" && <Box />}
      </Box>

      <BuyMeADrinkModal
        isOpen={buyMeADrinkModal}
        setModalClose={setBuyMeADrinkModal}
      />

      <ModalStripe
        isOpen={modalStripeOpen}
        handleClose={handleCloseStripeModal}
        userId={user?.id}
      />

      <ConciergeModalPendingUserData
        isOpen={modalConciergOpen}
        handleClose={handleCloseModalConcierg}
        userId={user?.id}
      />

      <UserTokensModal
        isOpen={modalWithTokenOpen}
        handleClose={handleCloseUserTokensModal}
        userId={user?.id}
      />
    </Box>
  );
};

export default Layout;
