import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";

import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { IUser } from "@/interfaces/user.interfaces";
import { localStorageManager } from "@/services";
import routes from "@/routes";
import api from "@/services/apiService";

interface IModal {
  isOpen: boolean;
  handleClose: () => void;
  userId: number | undefined;
}

interface FormValues {
  requested_tokens: string;
}

const validationSchema = Yup.object().shape({
  requested_tokens: Yup.string().required("Required"),
});

const UserTokensModal: React.FC<IModal> = ({ isOpen, handleClose }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const updateUserQuery = (values: FormValues) =>
    api.patch(`${routes.editUser}${user?.id}/`, values).then((res) => res.data);

  const { mutateAsync: updateUser, isLoading } = useMutation(
    "updateJobDescQuery",
    (values: FormValues) => updateUserQuery(values),
    {
      onSuccess: () => {
        toast.success("User data has been successfully updated");
        reset();
        handleClose();
      },
    }
  );

  useEffect(() => {
    const user = localStorageManager.getUser();
    setUser(user);
  }, []);

  const onSubmit = async (data: FormValues) => {
    updateUser(data);
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
              width: "100%",
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
                marginTop: "12px",
                borderBottom: "2px solid rgba(3,3,3,0.1)",
                paddingBottom: "8px",
              }}
            >
              1 token = 1 job application will be submitted by your
              seekerConceirge team for you
            </Typography>
          </Box>

          <CloseIcon
            onClick={handleClose}
            sx={{ cursor: "pointer", marginBottom: "49px" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "24px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "216px",
              height: "162px",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0px 1px 12px rgba(3,3,3,0.08)",
              display: "flex",
              flexDirection: "column",
              padding: "12px",
            }}
          >
            <Typography
              sx={{
                color: "#5A3AB6",
                fontSize: "18px",
                fontFamily: "Poppins",
                fontWeight: 300,
                lineHeight: "23px",
                textAlign: "center",
                marginTop: "18px",
                userSelect: "none",
              }}
            >
              Balance
            </Typography>
            <Typography
              sx={{
                color: "#5A3AB6",
                fontSize: "18px",
                fontFamily: "Poppins",
                fontWeight: 300,
                lineHeight: "23px",
                textAlign: "center",
                marginTop: "24px",
                userSelect: "none",
              }}
            >
              {user?.tokens}
            </Typography>
          </Box>

          <Box
            sx={{
              width: "216px",
              height: "162px",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0px 1px 12px rgba(3,3,3,0.08)",
              display: "flex",
              flexDirection: "column",
              padding: "12px",
            }}
          >
            <Typography
              sx={{
                color: "#5A3AB6",
                fontSize: "18px",
                fontFamily: "Poppins",
                fontWeight: 300,
                lineHeight: "23px",
                textAlign: "center",
                marginTop: "18px",
                userSelect: "none",
              }}
            >
              Need More Tokens?
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="How Many?"
                  sx={{
                    width: "100px",
                    margin: "16px auto",
                    "& .MuiOutlinedInput-input": {
                      height: "15px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& label": {
                      fontSize: "14px",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  variant="outlined"
                  {...register("requested_tokens")}
                />
                {errors.requested_tokens && (
                  <Typography sx={{ color: "red", fontSize: "12px" }}>
                    {errors.requested_tokens.message}
                  </Typography>
                )}
              </Box>

              <Button
                type="submit"
                sx={{
                  margin: "auto",
                  display: "flex",
                  padding: "12px 8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "100px",
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
                {isLoading ? (
                  <CircularProgress sx={{ color: "#FFF" }} size={10} />
                ) : (
                  "Buy Now!"
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserTokensModal;
