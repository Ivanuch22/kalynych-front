import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

interface IModal {
  isOpen: boolean;
  handleClose: () => void;
  refetch: () => void;
  handleConfirm: () => void;
  deleteLoading: boolean;
}

export const DeleteJobDescModal = ({
  isOpen,
  handleClose,
  handleConfirm,
  deleteLoading,
}: IModal) => {
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
            color: "#343a40",
            fontFamily: "Poppins",
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "26px",
          }}
        >
          Delete CV
        </Typography>
        <Typography
          sx={{
            color: "var(--text-color-60, #495057)",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "14px",
            marginTop: "8px",
          }}
        >
          Are You sure that You want to delete the Job Description?
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "24px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#5A3AB6",
              height: "24px",
              fontSize: "10px",
              textTransform: "capitalize",
              fontWeight: "400",
              "&:hover": {
                backgroundColor: "#5A3AB6",
              },
            }}
            onClick={handleConfirm}
          >
            {deleteLoading ? (
              <CircularProgress size={14} sx={{ color: "#FFF" }} />
            ) : (
              "Confirm"
            )}
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#5A3AB6",
              border: "1px solid #5A3AB6",
              height: "24px",
              fontSize: "10px",
              textTransform: "capitalize",
              fontWeight: "400",
              marginLeft: "8px",
              "&:hover": {
                backgroundColor: "#5A3AB6",
                color: "#fff",
                border: "none",
              },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
