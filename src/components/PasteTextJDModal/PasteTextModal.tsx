import React from "react";
import {
  Modal,
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

import api from "@/services/apiService";
import routes from "@/routes";

interface IModal {
  isOpen: boolean;
  handleClose: () => void;
  refetch: () => void;
  isConciergPage?: boolean;
  userId?: string | undefined;
}

interface FormValues {
  text: string;
}

const PasteTextJDModal = ({
  isOpen,
  handleClose,
  refetch,
  isConciergPage,
  userId,
}: IModal) => {
  const validationSchema = Yup.object().shape({
    text: Yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const jdQuery = (data: FormValues) =>
    api.post(routes.createJobDescription, data).then((res) => res.data);

  const { mutateAsync: createJd, isLoading: jdIsLoading } = useMutation(
    "jdQuery",
    (data: FormValues) => jdQuery(data),
    {
      onSuccess: () => {
        toast.success("JD has been successfully created");
        reset();
        handleClose();
        refetch();
      },
    }
  );

  const onSubmit = async (newData: FormValues) => {
    if (isConciergPage) {
      const data = {
        ...newData,
        status: "Saved",
        recommended: true,
        user_id: userId,
      };

      await createJd(data);
    } else {
      const data = {
        ...newData,
        status: "Saved",
      };

      await createJd(data);
    }
  };

  const handleCloseModal = () => {
    reset();
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
          width: "420px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "inline-flex",
          padding: "32px 16px",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: "4px",
          background: "var(--text-color-10, #FFF)",
          boxShadow: "1px 4px 15px 4px rgba(0, 0, 0, 0.10)",
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
          Save new Job Description
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box style={{ marginTop: "8px" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                label="Text"
                multiline
                rows={5}
                sx={{
                  marginTop: "16px",
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
                {...register("text")}
              />

              {errors.text && (
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  {errors.text.message}
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "18px",
            }}
          >
            <Button
              onClick={handleCloseModal}
              sx={{
                display: "flex",
                padding: "12px 8px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "4px",
                background: "var(--text-color-60, #EFF2F7)",
                color: "var(--text-color-20, #495057)",
                fontFamily: "Poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "14px",
                textTransform: "capitalize",
                border: "none",
                cursor: "pointer",
                marginRight: "6px",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              sx={{
                display: "flex",
                padding: "12px 8px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "4px",
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
              {jdIsLoading ? (
                <CircularProgress sx={{ color: "#FFF" }} size={10} />
              ) : (
                "Save"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default PasteTextJDModal;
