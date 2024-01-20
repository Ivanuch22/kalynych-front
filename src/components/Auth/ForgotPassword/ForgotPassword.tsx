import React, { useState } from "react";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { Box, CircularProgress, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useAuth } from "@/context/Auth";
import { IForm } from "../Auth.interfaces";

const styleTypography = {
  color: "var(--009-efd, #343A40)",
  fontSize: "36px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
  margin: "18px auto 0 auto",
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

interface ISingUp {
  handleFormChange: (type: IForm) => void;
}

interface FormValues {
  email: string;
}
interface IRes {
    message?: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Неправильний email").required("Email обов'язковий"),
});

const ForgotPassword: React.FC<ISingUp> = ({ handleFormChange }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const { forgotPassword } = useAuth();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    const formattedData = {
      email: data.email,
    };
    try {




        const res = await forgotPassword(formattedData);
      console.log(res);
      if (res) {
          handleFormChange({ type: 'signInForm' });
          setIsLoading(false);
          toast.success('Ласкаво просимо!');
          setIsAuthenticated(true);
      }
    } catch (e) {
      toast.error("Щось тут не так.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", margin: "0 auto" }}>
        <Box
          sx={{

            padding: "12px",
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
            background: "#FFF",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
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
          Ласкаво просимо до  KALYNYCH! <br /> Введіть свій email для відновлення паролю
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",

              }}
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
                label="Email"
                variant="outlined"
                id="filled-basic"
                {...register("email")}
              />
              {errors.email && (
                <Typography sx={{ color: "red" }}>
                  {errors.email.message}
                </Typography>
              )}

              <Button
                sx={{
                  marginTop: "16px",
                    padding: "13px 16px !important",
                  backgroundColor: "#5A3AB6",
                  "&:hover": {
                    backgroundColor: "#5A3AB6",
                  },
                }}
                type="submit"
                variant="contained"
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: "#FFF" }} />
                ) : (
                  "Напишіть мені листа"
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
        У вас є профіль?
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

export default ForgotPassword;
