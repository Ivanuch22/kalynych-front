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
  textPromptsRefetch: () => void;
  currentPromptsRefetch: () => void;
  promptType: string;
}

interface FormValues {
  prompt_text: string;
}

type FileState = {
  prompt_text: string;
  option: string;
};

const validationSchema = Yup.object().shape({
  prompt_text: Yup.string().required("Prompt text is required"),
});

const CreateNewPromptModal: React.FC<IModal> = ({
  isOpen,
  handleClose,
  textPromptsRefetch,
  currentPromptsRefetch,
  promptType,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema) as any,
  });

  const createNewPromptQuery = (values: FileState) =>
    api.post(routes.createPrompt, values).then((res) => res.data);

  const { mutateAsync: createNewPrompt, isLoading } = useMutation(
    "createNewPromptQuery",
    (values: FileState) => createNewPromptQuery(values),
    {
      onSuccess: () => {
        toast.success("New prompt has been successfully created");
        reset();
        handleClose();
        textPromptsRefetch();
        currentPromptsRefetch();
      },
    }
  );

  const handleCloseModal = () => {
    reset();
    handleClose();
  };

  const handleSubmitForm = async (data: any) => {
    await createNewPrompt({ ...data, option: promptType, current: true });
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
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
          Create new prompt
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
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Box style={{ marginTop: "14px" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                multiline
                rows={10}
                label="Prompt text"
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
                {...register("prompt_text")}
              />
              {errors.prompt_text && (
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  {errors.prompt_text.message}
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

export default CreateNewPromptModal;
