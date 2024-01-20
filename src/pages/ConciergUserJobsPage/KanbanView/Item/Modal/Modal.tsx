import React from "react";

import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

interface IModal {
  openModal: boolean;
  closeModal: () => void;
  name: string;
  employerName: string;
  data: string;
  location: string;
  match: string;
  id: number;
}

const JobDescModal: React.FC<IModal> = ({
  openModal,
  closeModal,
  name,
  employerName,
  data,
  location,
  match,
  id,
}) => {
  return (
    <Modal
      open={openModal}
      onClose={closeModal}
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
          Job Description
        </Typography>

        {id && (
          <form>
            <Box style={{ marginTop: "8px" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Name"
                  disabled
                  defaultValue={name}
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
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Employer name"
                  disabled
                  defaultValue={employerName}
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
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Data"
                  disabled
                  defaultValue={data}
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
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Location"
                  disabled
                  defaultValue={location}
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
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Match"
                  disabled
                  defaultValue={match}
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
                />
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
                onClick={closeModal}
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
            </Box>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default JobDescModal;
