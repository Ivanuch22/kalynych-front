import React, { useState } from "react";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const styleTypography = {
  color: "var(--009-efd, #343A40)",
  fontSize: "36px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
  margin: "18px auto 0 auto",
};

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",

      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            padding: "20px 28px",
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
            background: "#FFF",
            borderRadius: "10px",
            width: "300px",

          }}
        >
          <Typography sx={styleTypography}>KALYNYCH</Typography>

          <Typography
            sx={{
              color: "#74788D",
              fontSize: "14px",
              marginTop: "12px",
              margin: "12px auto 0 auto",
              textAlign: "center",
            }}
          >
           Ласкаво просимо до  KALYNYCH! <br /> Введіть свій email, для відновлення паролю
          </Typography>

          <Box
            sx={{ marginTop: "12px", display: "flex", flexDirection: "column" }}
          >
            <TextField
              sx={{
                marginTop: "16px",
                "& label.Mui-focused": {
                  color: "#495057",
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
              label="New Password"
              variant="outlined"
              type={!showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              sx={{
                marginTop: "16px",
                "& label.Mui-focused": {
                  color: "#495057",
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
              label="Confirm Password"
              variant="outlined"
              type={!showConfirmPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              sx={{
                marginTop: "16px",
                backgroundColor: "#5A3AB6",
                "&:hover": {
                  backgroundColor: "#5A3AB6",
                },
              }}
              variant="contained"
            >
              Change password
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
