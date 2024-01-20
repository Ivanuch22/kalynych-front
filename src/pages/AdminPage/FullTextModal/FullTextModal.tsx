import React, { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import api from "@/services/apiService";

import routes from "@/routes";

import CloseIcon from "@mui/icons-material/Close";

interface IFullTextModal {
  text: string;
  isOpen: boolean;
  handleCloseModal: () => void;
  modalFullTextId: number | null;
  promptType: string;
}

interface IUpdate {
  current: string;
}

const FullTextModal: React.FC<IFullTextModal> = ({
  text,
  isOpen,
  handleCloseModal,
  modalFullTextId,
  promptType,
}) => {
  const [current, setCurrent] = useState<string>("");

  const deletePromptQuery = (id: number) =>
    api.delete(`${routes.getDeletePrompt}${id}`).then((res) => res.data);

  const updatePromptQuery = (values: IUpdate) =>
    api
      .patch(`${routes.getDeletePrompt}${modalFullTextId}/`, values)
      .then((res) => res.data);

  const { mutateAsync: editPrompt, isLoading: editIsLoading } = useMutation(
    "updateJobDescQuery",
    (values: IUpdate) => updatePromptQuery(values),
    {
      onSuccess: () => {
        toast.success("Job Description has been successfully created");
        handleCloseModal(); // refetch();
        // handleClose();
      },
    }
  );

  const { mutateAsync: deletePromptMutation, isLoading } = useMutation(
    "DeletePromptQuery",
    (id: number) => deletePromptQuery(id),
    {
      onSuccess: () => {
        handleCloseModal();
        toast.success("Prompt has been successfully deleted");
      },
    }
  );

  const handleDeletePrompt = () => {
    modalFullTextId && deletePromptMutation(modalFullTextId);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCurrent(event.target.value as string);
  };

  const handleEditPrompt = () => {
    const data = {
      current: current,
      option: promptType,
    };
    if (current) {
      editPrompt(data);
    }
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
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
            Prompt
          </Typography>

          <IconButton onClick={handleCloseModal} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box style={{ marginTop: "14px" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              multiline
              rows={10}
              InputProps={{
                readOnly: true,
              }}
              defaultValue={text}
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
            />

            <FormControl fullWidth sx={{ marginTop: "14px" }}>
              <InputLabel id="demo-simple-select-label">
                Set as current
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={current}
                label="Set as current"
                onChange={handleChange}
                sx={{
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#5A3AB6",
                  },
                }}
              >
                <MenuItem value={"true"}>True</MenuItem>
                <MenuItem value={"false"}>False</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            // flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "18px",
          }}
        >
          <Button
            onClick={handleDeletePrompt}
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
              // marginRight: "6px",
            }}
          >
            {isLoading ? (
              <CircularProgress sx={{ color: "#FFF" }} size={10} />
            ) : (
              "Delete Prompt"
            )}
          </Button>

          <Button
            onClick={handleEditPrompt}
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
              // marginTop: "14px",
              "&:hover": {
                backgroundColor: "#5A3AB6",
              },
            }}
          >
            {editIsLoading ? (
              <CircularProgress sx={{ color: "#FFF" }} size={10} />
            ) : (
              "Save changes"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FullTextModal;
