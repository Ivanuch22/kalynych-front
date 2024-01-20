import React, { useEffect, useMemo, useState } from "react";

import { Box, Chip, CircularProgress } from "@mui/material";
import ContactDetailsForm from "./ContactDetailsForm/ContactDetailsForm";
import JobQuestionnaireFrom from "./JobQuestionnaireForm/JobQuestionnaireFrom";
import CareerPreferencesForm from "./CareerPreferencesForm/CareerPreferencesForm";
import PaymentsAndSubscriptions from "./PaymentsAndSubscriptionsForm/PaymentsAndSubscriptions";
import { useParams } from "react-router-dom";
import api from "@/services/apiService";
import { IUser } from "@/interfaces/user.interfaces";
import routes from "@/routes";
import { useQuery } from "react-query";
import { localStorageManager } from "@/services";

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const [form, setForm] = useState(1);
  const [userEdit, setUserToEdit] = useState<IUser | null>(null);
  const [isFirstFormComplete, setIsFirstFormComplete] = useState(false);
  const [isSecondFormComplete, setIsSecondFormComplete] = useState(false);

  async function getUserByIdQuery() {
    return api.get<IUser>(`${routes.editUser}${id}/`).then((res) => res.data);
  }

  const {
    data: userById,
    isLoading: userLoading,
    isFetching: userFetching,
    refetch: userByIdRefetch,
  } = useQuery<IUser>(["getUserByIdQuery", id], getUserByIdQuery, {
    enabled: false,
  });

  const filteredUser = useMemo(() => (userById ? userById : null), [userById]);

  useEffect(() => {
    if (userById?.id) {
      setUserToEdit(userById);
      localStorageManager.removeUser();
      localStorageManager.setUser(userById);
    }
  }, [userById]);

  useEffect(() => {
    id && userByIdRefetch();
  }, [id]);

  const handleChangeForm = (newValue: number) => {
    setForm(newValue);
  };

  const handleSetFirstFormComplete = () => {
    setIsFirstFormComplete(true);
  };

  const handleSetSecondFormComplete = () => {
    setIsSecondFormComplete(true);
  };

  if (userLoading || userFetching)
    return <CircularProgress sx={{ color: "#5A3AB6" }} size={24} />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "12px",
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

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Chip
            label="Payments and Subscriptions"
            variant="outlined"
            sx={
              form === 4
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
            onClick={() => handleChangeForm(4)}
          />
        </Box>
      </Box>

      <Box sx={{ marginTop: "24px" }}>
        {form === 1 && (
          <ContactDetailsForm
            handleChangeForm={handleChangeForm}
            id={id}
            userByIdRefetch={userByIdRefetch}
            handleSetFirstFormComplete={handleSetFirstFormComplete}
            user={filteredUser}
            isFirstFormComplete={isFirstFormComplete}
          />
        )}
        {form === 2 && (
          <JobQuestionnaireFrom
            handleChangeForm={handleChangeForm}
            id={id}
            user={filteredUser}
            userByIdRefetch={userByIdRefetch}
            handleSetSecondFormComplete={handleSetSecondFormComplete}
            isSecondFormComplete={isSecondFormComplete}
          />
        )}
        {form === 3 && (
          <CareerPreferencesForm
            handleChangeForm={handleChangeForm}
            id={id}
            user={filteredUser}
            userByIdRefetch={userByIdRefetch}
          />
        )}
        {form === 4 && <PaymentsAndSubscriptions />}
      </Box>
    </Box>
  );
};

export default ProfilePage;
