import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";

import {
  Modal,
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";

import api from "@/services/apiService";

import routes from "@/routes";

interface IModal {
  isOpen: boolean;
  handleClose: () => void;
  refetch: () => void;
}

interface FormValues {
  name: string;
  text: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  text: Yup.string().required("Text is required"),
});

const CreateCoverLetter: React.FC<IModal> = ({
  isOpen,
  handleClose,
  refetch,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema) as any,
  });

  const cvQuery = (data: FormValues) =>
    api.post(routes.createCoverLetter, data).then((res) => res.data);

  const { mutateAsync: createJd, isLoading: jdIsLoading } = useMutation(
    "cvQuery",
    (data: FormValues) => cvQuery(data),
    {
      onSuccess: () => {
        toast.success("JD has been successfully created");
        reset();
        handleClose();
        refetch();
      },
    }
  );

  const onSubmit = (data: FormValues) => {
    createJd(data);
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
          Save new Cover Letter
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box style={{ marginTop: "8px" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                label="Name"
                sx={{
                  marginTop: "16px",
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
                {...register("name")}
              />
              {errors.name && (
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  {errors.name.message}
                </Typography>
              )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                label="Text"
                multiline
                rows={5}
                sx={{
                  marginTop: "16px",
                  "& .MuiOutlinedInput-input": {},
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
                background: "var(--text-color-60, #6741d9)",
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
                  backgroundColor: "#6741d9",
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

export default CreateCoverLetter;
