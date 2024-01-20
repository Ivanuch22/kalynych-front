import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";

import api from "@/services/apiService";

import routes from "@/routes";

import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import TocIcon from "@mui/icons-material/Toc";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

interface IModal {
  isOpen: boolean;
  handleClose: () => void;
  finalUrl: string | undefined;
  allUrlsRefetch: () => void;
}

interface FormValues {
  title: string;
  url?: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
});

const SaveModal: React.FC<IModal> = ({
  isOpen,
  handleClose,
  finalUrl,
  allUrlsRefetch,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const saveUrlQuery = (data: FormValues) =>
    api.post(routes.userSaveGeneratedUrl, data).then((res) => res.data);

  const { mutateAsync: saveUrl, isLoading: saveUrlIsLoading } = useMutation(
    "saveUrlQuery",
    (data: FormValues) => saveUrlQuery(data),
    {
      onSuccess: () => {
        toast.success("Url has been successfully saved");
        handleClose();
        reset();
        allUrlsRefetch();
      },
    }
  );

  const onSubmit = (input: FormValues) => {
    const data = {
      ...input,
      url: finalUrl,
    };

    saveUrl(data);
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
          width: "340px",
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
            paddingBottom: "12px",
            borderBottom: "3px solid #c1c1c1",
          }}
        >
          Save Job search Query
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", alignItems: "baseline" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "32px",
                }}
              >
                <TocIcon />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "8px",
                  }}
                >
                  <TextField
                    sx={{
                      width: "307px",
                      height: "40px",
                      "& label": {
                        top: "-6px",
                      },
                      "& label.Mui-focused": {
                        color: "#495057",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "#5A3AB6",
                      },
                      "& .MuiOutlinedInput-root": {
                        height: "40px",
                        "&:hover fieldset": {
                          borderColor: "#5A3AB6",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#5A3AB6",
                        },
                      },
                    }}
                    label="Preferred Job Titles"
                    variant="outlined"
                    {...register("title")}
                  />
                  {errors.title && (
                    <Typography sx={{ color: "red" }}>
                      {errors.title.message}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "32px",
                  }}
                >
                  <InsertLinkIcon />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "8px",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#000000",
                        fontSize: "12px",
                        fontFamily: "Open Sans",
                        fontWeight: 400,
                        lineHeight: "14px",
                        width: "300px",
                        overflowWrap: "break-word",
                      }}
                    >
                      {finalUrl}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              marginTop: "61px",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: "#5A3AB6",
                "&:hover": {
                  backgroundColor: "#5A3AB6",
                },
              }}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              sx={{
                marginLeft: "32px",
                backgroundColor: "#5A3AB6",
                "&:hover": {
                  backgroundColor: "#5A3AB6",
                },
              }}
              variant="contained"
              type="submit"
            >
              {saveUrlIsLoading ? (
                <CircularProgress size={24} sx={{ color: "#FFF" }} />
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

export default SaveModal;
