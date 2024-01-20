import React, { useState, ChangeEvent } from "react";
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

import routes from "@/routes";

import { localStorageManager } from "@/services";
import { TOKEN } from "@/constants";

import styles from "./PasteTextModal.module.css";

import LinkIcon from "@/assets/cvpage/LinkIcon";

interface IModal {
  isOpen: boolean;
  handleClose: () => void;
  // @ts-ignore
  refetch: () => void;
}

interface FormValues {
  name: string;
  text: string;
}

type FileState = {
  selectedFile: File | null;
  fileName: string;
};

const initialState: FileState = {
  selectedFile: null,
  fileName: "",
};

const PasteTextModal = ({ isOpen, handleClose, refetch }: IModal) => {
  const [fileState, setFileState] = useState<FileState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    text: Yup.string().test(
      "is-text-or-file-provided",
      "Text or file is required",
      function (value) {
        const isTextProvided = !!value;
        const isFileUploaded = !!fileState.selectedFile;
        return isTextProvided || isFileUploaded;
      }
    ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema) as any,
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const token = localStorageManager.getItem(TOKEN);

      const formData = new FormData();
      if (fileState.selectedFile) {
        formData.append("name", data.name);
        formData.append("file", fileState.selectedFile);
      } else {
        formData.append("name", data.name);
        formData.append("text", data.text);
      }

      const response = await fetch(`${routes.baseURL}${routes.createResume}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token ? `${token}` : "",
        },
      });

      if (!response.ok) {
        console.error("Failed to create CV:", response.statusText);
        setIsLoading(false);
        return;
      }

      const responseData = await response.json();
      console.log("CV created successfully:", responseData);
      toast.success("CV has been successfully created");

      reset();
      handleClose();
      refetch();
      setIsLoading(false);
    } catch (error) {
      console.error("Error during CV creation:", error);
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    reset();
    setFileState(initialState);
    handleClose();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const name = selectedFile.name;
      const truncatedName =
        name.length > 8 ? name.substring(0, 8) + "..." : name;
      setFileState({
        selectedFile,
        fileName: truncatedName,
      });
    }
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
          Save new CV
        </Typography>

        <Typography
          sx={{
            color: "#555B6D",
            fontFamily: "Poppins",
            fontSize: "12px",
            width: "250px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "20px",
            textTransform: "capitalize",
            marginTop: "8px",
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, quos.
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

              {errors.text && !fileState.selectedFile?.name && (
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  {errors.text.message}
                </Typography>
              )}
            </Box>

            <Box>
              <div className={styles.inputWrapper} style={{ marginTop: "8px" }}>
                <input
                  className={styles.inputFile}
                  type="file"
                  accept=".pdf"
                  id="fileInput"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFileChange(e)
                  }
                />

                <label className={styles.uploadButton} htmlFor="fileInput">
                  <LinkIcon className={styles.icon} />
                  <span className={styles.fileName}>
                    {fileState.fileName ? fileState.fileName : "Upload Your CV"}
                  </span>
                </label>
              </div>
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
              {isLoading ? (
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

export default PasteTextModal;
