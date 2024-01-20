import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import api from "@/services/apiService";
import routes from "@/routes";
import { IUser } from "@/interfaces/user.interfaces";

import styles from "./UserProfile.module.css";
import ContactDetailsForm from "./ContactDetailsForm/ContactDetailsForm";
import JobQuestionnaireFrom from "./JobQuestionnaireForm/JobQuestionnaireFrom";
import CareerPreferencesForm from "./CareerPreferencesForm/CareerPreferencesForm";

interface IContactdetails {
  name?: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string(),
});

const UserProfile: React.FC = () => {
  const { id } = useParams();
  const [form, setForm] = useState(1);

  const getUserByIdQuery = async () =>
    api.get<IUser>(`${routes.editUser}${id}/`).then((res) => res.data);

  const updateUserQuery = (values: IContactdetails) =>
    api.patch(`${routes.editUser}${id}/`, values).then((res) => res.data);

  const { mutateAsync: updateUser, isLoading: isLoadingUpdate } = useMutation(
    "updateJobDescQuery",
    (values: IContactdetails) => updateUserQuery(values),
    {
      onSuccess: () => {
        toast.success("User data has been successfully updated");
        refetch();
      },
    }
  );

  const {
    data: userById,
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IUser>(["getUserByIdQuery", id], getUserByIdQuery);

  const handleOpenLink = () => {
    window.open(
      "https://billing.stripe.com/p/login/cN2g0felS2Ll1HyaEE",
      "_blank"
    );
  };

  const handleChangeForm = (newValue: number) => {
    setForm(newValue);
  };

  const onSubmit: SubmitHandler<IContactdetails> = async (data) => {
    await updateUser(data);
  };

  if (isLoading || isFetching)
    return <CircularProgress sx={{ color: "#5A3AB6" }} size={34} />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            color: "#495057",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "16px",
          }}
        >
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Chip
              label="Contact details"
              variant="outlined"
              sx={
                form === 1
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      textAlign: "center",
                      color: "#fff",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      border: "1px solid #5A3AB6",
                      color: "#5A3AB6",
                      whiteSpace: "normal",
                      textAlign: "center",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
              }
              onClick={() => handleChangeForm(1)}
            />
            <Chip
              label="Job Questionnaire"
              variant="outlined"
              sx={
                form === 2
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      textAlign: "center",
                      color: "#fff",
                      marginLeft: "26px",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      border: "1px solid #5A3AB6",
                      color: "#5A3AB6",
                      marginLeft: "26px",
                      whiteSpace: "normal",
                      textAlign: "center",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
              }
              onClick={() => handleChangeForm(2)}
            />
            <Chip
              label="Career Preferences"
              variant="outlined"
              sx={
                form === 3
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      textAlign: "center",
                      marginLeft: "26px",
                      color: "#fff",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      border: "1px solid #5A3AB6",
                      color: "#5A3AB6",
                      whiteSpace: "normal",
                      marginLeft: "26px",
                      textAlign: "center",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
              }
              onClick={() => handleChangeForm(3)}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ marginTop: "24px" }}>
        {form === 1 && (
          <ContactDetailsForm
            handleChangeForm={handleChangeForm}
            id={id}
            userByIdRefetch={refetch}
            // @ts-ignore
            user={userById}
          />
        )}
        {form === 2 && (
          <JobQuestionnaireFrom
            handleChangeForm={handleChangeForm}
            id={id}
            // @ts-ignore
            user={userById}
            userByIdRefetch={refetch}
          />
        )}
        {form === 3 && (
          <CareerPreferencesForm
            handleChangeForm={handleChangeForm}
            id={id}
            // @ts-ignore
            user={userById}
            userByIdRefetch={refetch}
          />
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: "12px",
          marginBottom: "24px",
        }}
      >
        <Button
          onClick={handleOpenLink}
          sx={{
            width: " 200px",
            margin: "0 auto",
            backgroundColor: "#5A3AB6",
            "&:hover": {
              backgroundColor: "#5A3AB6",
            },
          }}
          variant="contained"
        >
          Stripe
        </Button>

        <Typography
          sx={{
            // marginTop: "12px",
            margin: "12px auto",
            color: "#495057",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "16px",
          }}
        >
          Your customer portal
        </Typography>
      </Box>
    </Box>
  );
};

export default UserProfile;
