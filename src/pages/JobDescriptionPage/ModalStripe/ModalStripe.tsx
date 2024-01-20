import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-query";

import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

import { IEditUser, IUser } from "@/interfaces/user.interfaces";
import api from "@/services/apiService";
import routes from "@/routes";
import { localStorageManager } from "@/services";

import CloseIcon from "@mui/icons-material/Close";

interface IModal {
  isOpen: boolean;
  handleClose: () => void;
  userId: number | undefined;
}

export const ModalStripe = ({ isOpen, handleClose, userId }: IModal) => {
  const updateUserQuery = (values: IEditUser) =>
    api.patch(`${routes.editUser}${userId}/`, values).then((res) => res.data);

  const getUserByIdQuery = async () =>
    api.get<IUser>(`${routes.editUser}${userId}/`).then((res) => res.data);

  const { data: userById, refetch: userByIdRefetch } = useQuery<IUser>(
    ["getUserByIdQuery", userId],
    getUserByIdQuery,
    {
      enabled: false,
    }
  );

  const { mutateAsync: updateUser, isLoading } = useMutation(
    "updateJobDescQuery",
    (values: IEditUser) => updateUserQuery(values)
  );

  useEffect(() => {
    if (userById?.id) {
      localStorageManager.removeUser();
      localStorageManager.setUser(userById);
    }
  }, [userById]);

  const handleButtonClick = async () => {
    await updateUser({ status: "Requested" });
    userByIdRefetch();
    window.open("https://buy.stripe.com/4gwdSn8O6grugKc9AB", "_blank");
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "inline-flex",
          padding: "32px 16px",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: "16px",
          background: "var(--text-color-10, #FFF)",
          boxShadow: "1px 4px 15px 4px rgba(0, 0, 0, 0.10)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                color: "var(--text-color-20, #495057)",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "16px",
              }}
            >
              SeekerConcierge at your service!
            </Typography>

            <Typography
              sx={{
                color: "#858585",
                fontSize: "14px",
                fontFamily: "Inter",
                lineHeight: "18px",
                marginTop: "8px",
              }}
            >
              1 token = 1 job application submitted by seekerConceirge for you
            </Typography>
          </Box>

          <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
        </Box>

        <Box
          sx={{
            width: "706px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0px 1px 12px rgba(3,3,3,0.08)",
            display: "flex",
            flexDirection: "column",
            marginTop: "32px",
            alignItems: "center",
            padding: "14px",
          }}
        >
          <Typography
            sx={{
              color: "#858585",
              fontSize: "14px",
              fontFamily: "Poppins",
              fontWeight: 300,
              lineHeight: "18px",
              textAlign: "center",
            }}
          >
            You dont have an active Subscription
          </Typography>

          <Button
            variant="contained"
            onClick={handleButtonClick}
            sx={{
              backgroundColor: "#5A3AB6",
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "100px",
              marginTop: "18px",
              fontWeight: "400",
              "&:hover": {
                backgroundColor: "#5A3AB6",
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "#FFF" }} />
            ) : (
              "Subscribe now and get 150 tokens!"
            )}
          </Button>

          <Typography
            sx={{
              color: "#858585",
              fontSize: "12px",
              fontFamily: "Poppins",
              fontWeight: 400,
              lineHeight: "13px",
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            You will be redirected to Stripe, our payments partner
          </Typography>
        </Box>

        <Box
          sx={{
            marginTop: "24px",
            borderTop: "2px solid rgba(3,3,3,0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "12px" }}
          >
            <Typography
              sx={{
                color: "#030303",
                fontSize: "16px",
                fontFamily: "Inter",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              What is SeekerConcierge?
            </Typography>

            <Typography
              sx={{
                color: "#858585",
                fontSize: "12px",
                fontFamily: "Inter",
                lineHeight: "16px",
                marginTop: "8px",
              }}
            >
              We will curate and apply to jobs for you at any employer. We focus
              on applying to Fresh Jobs - jobs that were posted within the last
              2 days. Powered by AI, vetted by real people.
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "12px" }}
          >
            <Typography
              sx={{
                color: "#030303",
                fontSize: "16px",
                fontFamily: "Inter",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              What are tokens?
            </Typography>

            <Typography
              sx={{
                color: "#858585",
                fontSize: "12px",
                fontFamily: "Inter",
                lineHeight: "16px",
                marginTop: "8px",
              }}
            >
              1 token = 1 job application by SeekerConcierge, once you
              subscribe, 180 tokens automatically gets added to your account for
              the month. This means, your SeekerConcierge team will curate and
              apply to 150 jobs for you within this month
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "12px" }}
          >
            <Typography
              sx={{
                color: "#030303",
                fontSize: "16px",
                fontFamily: "Inter",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              I've made a payment, what next?
            </Typography>

            <Typography
              sx={{
                color: "#858585",
                fontSize: "12px",
                fontFamily: "Inter",
                lineHeight: "16px",
                marginTop: "8px",
              }}
            >
              Your subscription will be activated in 24 - 48hrs. You will
              recieve access to a shared gmail account Make sure you complete
              your profile. Your SeekerConceirge will curate and apply to at
              least 10 jobs for you everyday. You can remove jobs from the
              curated list and it will be replaced a job from your "Target Jobs"
              space. Come back to this page to see the progress of your token
              usage.
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "12px" }}
          >
            <Typography
              sx={{
                color: "#030303",
                fontSize: "16px",
                fontFamily: "Inter",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              I've exhausted all my tokens but still want SeekerConcierge to
              apply for me
            </Typography>

            <Typography
              sx={{
                color: "#858585",
                fontSize: "12px",
                fontFamily: "Inter",
                lineHeight: "16px",
                marginTop: "8px",
              }}
            >
              No problem! , buy more tokens and load up your account so that we
              will continue curating and applying to jobs for you.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
