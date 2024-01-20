import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { Box, Button, Chip, CircularProgress } from "@mui/material";

import { CVTable } from "./CVTable";
import { PasteTextJDModal } from "@/components";
import { JobsItem } from "../MainPage/JobsItem";
import CareerPreferences from "./CareerPreferences/CareerPreference";
import ContactDetails from "./ContactDetails/ContactDetails";
import JobQuestionnaire from "./JobQuestionare/JobQuestionare";

import api from "@/services/apiService";

import routes from "@/routes";

import { IUser } from "@/interfaces/user.interfaces";

import PlusIcon from "@/assets/cvpage/PlusIcon";

import styles from "./ConciergePageUserData.module.css";

interface ICVs {
  id: number;
  name: string;
  text: string;
  created: string;
  user_id: number;
  gpt_best_cv_name: string;
}

interface IResume {
  resume: ICVs[];
}

const ConciergePageUserData: React.FC = () => {
  const { id } = useParams();
  const [table, setTable] = useState(1);
  const [jbID, setJDID] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  async function getUserByIdQuery() {
    return api.get<IUser>(`${routes.editUser}${id}/`).then((res) => res.data);
  }

  const getJDQuery = async () =>
    api.get<ICVs[]>(`${routes.getAllJDByUserId}${id}/`).then((res) => res.data);

  const getCVQuery = async () =>
    api
      .get<IResume>(`${routes.getAllResumesByUserId}${id}/`)
      .then((res) => res.data);

  const {
    data: jdQuery,
    isFetching: jdIsFetching,
    isLoading: jdIsLoading,
    refetch: jdRefetch,
  } = useQuery<ICVs[]>(["getJDQuery", id], getJDQuery);

  const {
    data: cvQuery,
    isFetching: cvIsFetching,
    isLoading: cvIsLoading,
  } = useQuery<IResume>(["getCVQuery", id], getCVQuery);

  const {
    data: userById,
    isLoading: userLoading,
    isFetching: userFetching,
  } = useQuery<IUser>(["getUserByIdQuery", id], getUserByIdQuery);

  const filteredUser = useMemo(() => (userById ? userById : null), [userById]);

  const filteredCVs = useMemo(() => cvQuery ?? [], [cvQuery]);

  const filteredJobDesc = useMemo(() => jdQuery ?? [], [jdQuery]);

  const handleChangeTable = (newValue: number) => {
    setTable(newValue);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const sortedJDs = [
    ...(jbID ? filteredJobDesc?.filter(({ id }) => id === jbID) : []),
    ...filteredJobDesc?.filter(({ id }) => id !== jbID),
  ];

  if (
    cvIsFetching ||
    cvIsLoading ||
    jdIsFetching ||
    jdIsLoading ||
    userLoading ||
    userFetching
  )
    return <CircularProgress sx={{ color: "#5A3AB6" }} size={34} />;

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Button
          variant="contained"
          startIcon={<PlusIcon className={styles.img} />}
          onClick={() => setModalOpen(true)}
          sx={{
            backgroundColor: "#5A3AB6",
            height: "20px",
            margin: "0 32px 0 24px",
            fontSize: "10px",
            textTransform: "capitalize",
            fontWeight: "400",
            "&:hover": {
              backgroundColor: "#5A3AB6",
            },
          }}
        >
          Create new
        </Button>

        <Box
          sx={{
            marginLeft: "24px",
            marginRight: "32px",
            marginTop: "24px",
            height: "466px",
            overflow: "auto",
          }}
        >
          {sortedJDs.map(
            ({ name, text, created, id, gpt_best_cv_name }: ICVs) => (
              // @ts-ignore
              <JobsItem
                name={name}
                text={text}
                created={created}
                borderPurple={jbID === id ? true : false}
                pinnedCvName={gpt_best_cv_name}
              />
            )
          )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{ display: "flex", width: "100%", justifyContent: "flex-start" }}
        >
          <Chip
            label="CV list"
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
            label="Contact details"
            variant="outlined"
            sx={
              table === 3
                ? {
                    background: "#5A3AB6",
                    border: "none",
                    marginLeft: "26px",
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
                    marginLeft: "26px",
                    whiteSpace: "normal",
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
            label="Job Questionnaire"
            variant="outlined"
            sx={
              table === 4
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
            onClick={() => handleChangeTable(4)}
          />
          <Chip
            label="Career Preferences"
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
          />
        </Box>

        <Box sx={{ marginTop: "12px" }}>
          {table === 1 && (
            // @ts-ignore
            <CVTable filteredCVs={filteredCVs} isLoading={cvIsLoading} />
          )}

          {table === 3 && <ContactDetails user={filteredUser} />}
          {table === 4 && <JobQuestionnaire user={filteredUser} />}
          {table === 5 && <CareerPreferences user={filteredUser} />}
        </Box>
      </Box>

      <Box sx={{ width: "150px" }} />

      <PasteTextJDModal
        isOpen={modalOpen}
        handleClose={handleCloseModal}
        refetch={jdRefetch}
        isConciergPage={true}
        userId={id}
      />
    </Box>
  );
};

export default ConciergePageUserData;
