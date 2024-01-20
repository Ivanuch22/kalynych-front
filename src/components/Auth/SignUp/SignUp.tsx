import React, { useState } from "react";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { IForm } from "../Auth.interfaces";

import { useAuth } from "@/context/Auth";

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
  full_name: Yup.string().required("Прізвище Ім'я обов'язкові"),
  email: Yup.string().email("Invalid email").required("Email обов'язковий"),
  password: Yup.string()
    .required("Пароль обов'язковий")
    .min(4, "Пароль має бути не менше 4 символів"),
  confirmPassword: Yup.string()
    .required("Потрібно підтвердити пароль")
    .oneOf([Yup.ref("password")], "Паролі не співпадають"),
});

interface ISingUp {
  handleFormChange: (type: IForm) => void;
}

interface ISingUpFormValues {
  full_name: string,
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC<ISingUp> = ({ handleFormChange }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISingUpFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const { signUp } = useAuth();

  const onSubmit: SubmitHandler<ISingUpFormValues> = async (data) => {
    setIsLoading(true);

    const formattedData = {
      full_name: `${data.full_name}`,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await signUp(formattedData);
      if (res.message === "Користувач успішно зареєстрований") {
        setIsLoading(false);
        handleFormChange({ type: "signInForm" });
      }
    } catch (e) {
      toast.error("Щось пішло не так");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", margin: "0 auto" }}>
        <Box
          sx={{
            padding: "20px 28px",
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
            background: "#FFF",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
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
          Створіть свій обліковий запис і почніть користуватися KALYNYCH прямо зараз!
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    label="Прізвище Ім'я"
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
                    variant="outlined"
                    {...register("full_name")}
                  />
                  {errors.full_name && (
                    <Typography sx={{ color: "red" }}>
                      {errors.full_name.message}
                    </Typography>
                  )}
                </Box>

              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Email"
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
                  label="Пароль"
                  type={!showPassword ? "text" : "password"}
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
                  label="Підтвердіть пароль"
                  type={!showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  {...register("confirmPassword")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
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
                {errors.confirmPassword && (
                  <Typography sx={{ color: "red" }}>
                    {errors.confirmPassword.message}
                  </Typography>
                )}
              </Box>

              <Button
                sx={{
                  marginTop: "16px",
                    padding : "13.5px 14px",
                    fontSize: "15px",
                    fontWeight: "700",
                  backgroundColor: "#5A3AB6",
                  "&:hover": {
                    backgroundColor: "#5A3AB6", // Set the same color as the default state
                  },
                }}
                variant="contained"
                type="submit"
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: "#FFF" }} />
                ) : (
                  "Зареєструватися"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
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
            У вас є обліковий запис?
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
          onClick={() => handleFormChange({ type: "signInForm" })}
        >
        Увійти
        </Button>
      </Box>
    </>
  );
};

export default SignUp;
