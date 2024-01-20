import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { Box, Chip, CircularProgress, Typography } from "@mui/material";

import { UserLinks } from "./UserLinks";
import { CheckList } from "./CheckList";
import { UserCard } from "./UserCard";
import ContactDetails from "../ConciergePageUserData/ContactDetails/ContactDetails";
import JobQuestionnaire from "../ConciergePageUserData/JobQuestionare/JobQuestionare";
import CareerPreferences from "../ConciergePageUserData/CareerPreferences/CareerPreference";

import { useConcierg } from "@/context/Concierg";
import { usePage } from "@/context/PageNaming";

import { IConceirgeUsers, IUser } from "@/interfaces/user.interfaces";

import routes from "@/routes";

import api from "@/services/apiService";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface FormValues {
  user_id: number;
}

interface IAllQuery {
  id: number;
  user_id: number;
  title: string;
  linkedin_url: string;
}

const ConceirgePage: React.FC = () => {
  const { setPageName } = usePage();
  const { userId, handleSetUserName } = useConcierg();

  const [table, setTable] = useState(0);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [userLinks, setUserLinks] = useState<IAllQuery[] | null>(null);

  const getAllConceirgeQuery = async () =>
    api
      .get<IConceirgeUsers>(`${routes.getConceirgeLinkenUsers}`)
      .then((res) => res.data);

  const getUserByIdQuery = async () =>
    api.get<IUser>(`${routes.editUser}${userId}/`).then((res) => res.data);

  const getAllUserLinksQuery = (data: FormValues) =>
    api.post(routes.getAllUserLinks, data).then((res) => res.data);

  const { mutateAsync: getAllUserLinks, isLoading: userLinksIsLoading } =
    useMutation("getAllUserLinksQuery", (data: FormValues) =>
      getAllUserLinksQuery(data)
    );

  const { data, isLoading, isFetching, refetch } = useQuery<IConceirgeUsers>(
    "getAllConceirgeQuery",
    getAllConceirgeQuery
  );

  const { data: userById, isLoading: userByIdIsLoading } = useQuery<IUser>(
    ["getUserByIdQuery", userId],
    getUserByIdQuery
  );

  useEffect(() => {
    const fetchData = async () => {
      if (userById?.id) {
        setUserData(userById);
      }

      if (userId) {
        const data = await getAllUserLinks({ user_id: userId });
        setUserLinks(data);
      }
    };

    fetchData();
  }, [userById, userId]);

  const filteredConceirge = useMemo(
    () => (data && data.users ? data.users : []),
    [data]
  );

  const handleChangeTable = (newValue: number) => {
    setTable(newValue);
  };

  useEffect(() => {
    refetch();
    setPageName("Concierge | My Clients");
  }, []);

  if (isFetching || isLoading)
    return (
      <CircularProgress
        sx={{
          color: "#5A3AB6",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        size={50}
      />
    );

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        marginTop: "24px",
        paddingLeft: " 12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "560px",
          overflow: "auto",
          gap: "12px",
          padding: "8px",
        }}
      >
        {filteredConceirge.map((el: IUser) => (
          <UserCard
            key={el.id}
            name={el.name}
            id={el.id}
            currentId={userId}
            setUserName={handleSetUserName}
            setTable={setTable}
          />
        ))}
      </Box>

      {userByIdIsLoading ? (
        <CircularProgress sx={{ color: "#5A3AB6" }} size={42} />
      ) : (
        userById && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "32px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "2px",
                boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                display: "flex",
                alignItems: "center",
                padding: "14px",
              }}
            >
              <AccountCircleIcon />
              <Typography
                sx={{
                  color: "#030303",
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  lineHeight: "22px",
                  marginLeft: "12px",
                }}
              >
                {userById.name}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "12px" }}
            >
              <Chip
                label="Contact details"
                variant="outlined"
                sx={
                  table === 1
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
                onClick={() => handleChangeTable(1)}
              />
              <Chip
                label="Job Questionnaire"
                variant="outlined"
                sx={
                  table === 2
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
                onClick={() => handleChangeTable(2)}
              />
              <Chip
                label="Career Preferences"
                variant="outlined"
                sx={
                  table === 3
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
                onClick={() => handleChangeTable(3)}
              />

              <Chip
                label="Job Search Queries"
                variant="outlined"
                sx={
                  table === 4
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
                onClick={() => handleChangeTable(4)}
              />

              {/* <Chip
                label="Checklist"
                variant="outlined"
                sx={
                  table === 5
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
                onClick={() => handleChangeTable(5)}
              /> */}
            </Box>

            <Box sx={{ marginTop: "12px" }}>
              {userById && (
                <>
                  {table === 1 && <ContactDetails user={userData} />}
                  {table === 2 && <JobQuestionnaire user={userData} />}
                  {table === 3 && <CareerPreferences user={userData} />}
                  {table === 4 && (
                    <UserLinks userId={userData?.id} userLinks={userLinks} />
                  )}
                  {/* {table === 5 && <CheckList />} */}
                </>
              )}
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};

export default ConceirgePage;
