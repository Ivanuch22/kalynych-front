import React, { useState } from "react";

import { Box } from "@mui/material";

import { SignInForm } from "./SignIn";
import { SignUp } from "./SignUp";
import { ForgotPassword } from "./ForgotPassword";

import { IForm } from "./Auth.interfaces";

const Auth: React.FC = () => {
  const [formName, setFormName] = useState<IForm>({ type: "signInForm" });

  const handleFormChange = (newForm: IForm) => {
    setFormName(newForm);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {formName.type === "signInForm" && (
        <SignInForm handleFormChange={handleFormChange} />
      )}
      {formName.type === "signUpForm" && (
        <SignUp handleFormChange={handleFormChange} />
      )}
      {formName.type === "forgotPasswordForm" && (
        <ForgotPassword handleFormChange={handleFormChange} />
      )}
    </Box>
  );
};

export default Auth;
