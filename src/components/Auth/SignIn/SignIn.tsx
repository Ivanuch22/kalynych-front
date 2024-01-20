import React, { useState } from "react";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import routes from "@/routes";

import { useAuth } from "@/context/Auth";

import { IForm } from "../Auth.interfaces";
import { ILoginFormValues } from "@/interfaces/auth.interfaces";

const styleTypography = {
  color: "var(--009-efd, #343A40)",
  fontSize: "36px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "normal",
  margin: "0 auto",
};

const styleLoginTypography = {
  color: "var(--009-efd, #009EFD)",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
};

const styleQuestionTypography = {
  color: "var(--titles, #3A3A3A)",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Неправильний email").required("Email обов'язковий"),
  password: Yup.string()
    .required("Пароль обов'язковий")
    .min(4, "Пароль має містити мінімум 4 символа"),
});

interface ISingUp {
  handleFormChange: (type: IForm) => void;
    isAuthenticated:boolean;
    setIsAuthenticated:(status: boolean)=>void;
}

const SignInForm: React.FC<ISingUp> = ({ handleFormChange,isAuthenticated,setIsAuthenticated }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const { login } = useAuth();

  const onSubmit: SubmitHandler<ILoginFormValues> = async (data) => {
    setIsLoading(true);
    const formattedData = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await login(formattedData);
      if (res.access) {
        handleFormChange({ type: "signInForm" });

        setIsLoading(false);
        toast.success("Ласкаво просимо!");
        setIsAuthenticated(true);
      }
    } catch (e) {
      toast.error("Щось тут не так!");
      setIsLoading(false);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            padding: "20px 28px",
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
            background: "#FFF",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            width: "300px",
            borderRadius: "10px",
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
          Ласкаво просимо до Kalynych! <br /> Увійдіть, щоб продовжити.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                  label="Email"
                  variant="outlined"
                  {...register("email")}
                />
                {errors.email && (
                  <Typography sx={{ color: "red" }}>
                    {errors.email.message}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                  label="Пароль"
                  type={!showPassword ? "text" : "password"}
                  variant="outlined"
                  {...register("password")}
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
                {errors.password && (
                  <Typography sx={{ color: "red" }}>
                    {errors.password.message}
                  </Typography>
                )}
              </Box>

              <Button
                sx={{
                  marginTop: "16px",
                  backgroundColor: "#5A3AB6",
                    padding : "13.5px 14px",
                    fontSize: "15px",
                    fontWeight: "700",
                  "&:hover": {
                    backgroundColor: "#5A3AB6",
                  },
                }}
                variant="contained"
                type="submit"
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: "#FFF" }} />
                ) : (
                  "Увійти"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "12px",
        }}
      >
        <Button
          onClick={() => handleFormChange({ type: "forgotPasswordForm" })}
          sx={{
            color: "var(--009-efd, #5A3AB6)",
            fontFamily: "Roboto",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            textTransform: "none",
          }}
        >
          Забув пароль?
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "12px",
          }}
        >
          <Typography
            sx={{
              ...styleQuestionTypography,
              color: "#74788D",
              fontWeight: "400",
            }}
          >
          Не маєте акаунта?
          </Typography>

          <Button
            sx={{
              ...styleLoginTypography,
              display: "inline",
              textTransform: "none",
              marginLeft: "4px",
              color: "#5A3AB6",
              fontWeight: "400",
            }}
            onClick={() => handleFormChange({ type: "signUpForm" })}
          >
          Зареєструватися
          </Button>
        </Box>
      </Box>

      {isAuthenticated && <Navigate to={routes.index} />}
    </>
  );
};

export default SignInForm;
