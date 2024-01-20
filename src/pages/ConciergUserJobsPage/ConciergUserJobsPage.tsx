import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  Typography,
} from "@mui/material";

import { useConcierg } from "@/context/Concierg";
import api from "@/services/apiService";

import { KanbanView } from "./KanbanView";

import { localStorageManager } from "@/services";

import routes from "@/routes";

import { usePage } from "@/context/PageNaming";

import { JobItem } from "./JobsItem";

import { CreatejobDescriptionModal } from "./CreateJobDescriptionModal";

import styles from "./ConciergUserJobsPage.module.css";

import PlusIcon from "@/assets/cvpage/PlusIcon";
import WhatshotIcon from "@mui/icons-material/Whatshot";

interface ICVs {
  id: number;
  name: string;
  text: string;
  created: string;
  user_id: number;
  status: string | null;
  employer_name: string;
  location: string;
  matching: string;
  gpt_best_cv: string;
  job_overview: string;
  responsibilities: string;
}

interface FormValues {
  status: string;
}

const ConciergUserJobsPage: React.FC = () => {
  const { userId, userName } = useConcierg();
  const { setPageName } = usePage();

  const [jdID, setJdID] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [kanbanView, setKanbanView] = useState<boolean>(false);

  const getJobDescByIdQuery = async () =>
    api.get<ICVs>(`${routes.getJobDescById}${jdID}/`).then((res) => res.data);

  const getAllJobDescByIdQuery = async () =>
    api
      .get<ICVs[]>(`${routes.getAllJDByUserId}${userId}/`)
      .then((res) => res.data);

  const jdQuery = (data: FormValues) =>
    api
      .patch(`${routes.changeStatusMinusToken}${jdID}/`, data)
      .then((res) => res.data);

  const { mutateAsync: createJd, isLoading: jdIsLoading } = useMutation(
    "jdQuery",
    (data: FormValues) => jdQuery(data),
    {
      onSuccess: () => {
        toast.success("JD has been successfully updated");
        getJobDescRefetch();
      },
    }
  );

  const {
    data: jobDescById,
    isLoading: jobDescByIdLoading,
    isFetching: jobDescByIdFetching,
    refetch: getJobDescRefetch,
  } = useQuery<ICVs>(["getJobDescByIdQuery", jdID], getJobDescByIdQuery, {
    enabled: false,
  });

  const {
    data: getJobDescById,
    isLoading: jobDescLoading,
    isFetching: jobDescFetching,
    refetch: getJobDescByIdRefetch,
  } = useQuery<ICVs[]>(
    ["getAllJobDescByIdQuery", userId],
    getAllJobDescByIdQuery,
    {
      enabled: false,
    }
  );

  useEffect(() => {
    jdID !== null && getJobDescRefetch();
  }, [jdID]);

  useEffect(() => {
    userId && getJobDescByIdRefetch();
  }, [userId]);

  useEffect(() => {
    setPageName("Concierg | Target Jobs");
  }, []);

  useEffect(() => {
    const canbanView = localStorageManager.getItem("KANBAN");
    if (canbanView) {
      setKanbanView(!!canbanView);
    }
  }, []);

  const handleRefetch = (id: string | number) => {
    if (id) {
      getJobDescRefetch();
    }
  };

  function extractNumericValue(inputString: string) {
    const numericValue = inputString?.replace(/\D/g, "");
    const intValue = parseInt(numericValue, 10);

    return intValue;
  }

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleStatusChange = () => {
    if (status) {
      const data = {
        status: status,
        user_id: userId,
      };
      createJd(data);
    }
  };

  const handleSetKanbanView = () => {
    localStorageManager.setItem("KANBAN", !kanbanView);
    setKanbanView(!kanbanView);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    jobDescById?.status && setStatus(jobDescById?.status);
  }, [jobDescById]);

  if (
    jobDescLoading ||
    jobDescFetching ||
    jobDescByIdFetching ||
    jobDescByIdLoading
  )
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
    <Box sx={{ display: "flex", marginTop: "24px", paddingLeft: "12px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            width: "330px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "120px",
              height: "36px",
              padding: "0px 8px",
              border: "0",
              boxSizing: "border-box",
              borderRadius: "25px",
              boxShadow: "0px 0px 10px rgba(3,3,3,0.1)",
              backgroundColor: "#5A3AB6",
              color: "#ffffff",
              fontSize: "14px",
              fontFamily: "Roboto",
              lineHeight: "16px",
              outline: "none",
            }}
          >
            {userName}
          </Box>

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={kanbanView}
                  sx={{
                    "& .MuiSwitch-thumb": {
                      boxSizing: "border-box",
                      background: "#5A3AB6",
                    },
                    "& .MuiSwitch-track": {
                      background: "#5A3AB6",
                    },
                    "&.Mui-checked .MuiSwitch-track": {
                      background: "#5A3AB6",
                    },
                  }}
                  onChange={handleSetKanbanView}
                />
              }
              label="Kanban view"
            />
          </FormGroup>
        </Box>

        {kanbanView ? (
          <KanbanView
            userId={userId}
            jdItem={getJobDescById}
            // @ts-ignore
            getJobDescRefetch={handleRefetch}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "600px",
              overflow: "auto",
              gap: "8px",
              marginTop: "12px",
              padding: "8px",
            }}
          >
            {getJobDescById?.map((el: ICVs) => (
              <JobItem
                name={el.name}
                employerName={el.employer_name}
                data={el.created}
                location={el.location}
                match={el.matching}
                gpt_best_cv={el.gpt_best_cv}
                setJdID={setJdID}
                jdID={jdID}
                id={el.id}
              />
            ))}
          </Box>
        )}

        <Button
          onClick={() => setModalOpen(true)}
          endIcon={<PlusIcon className={styles.img} />}
          sx={{
            cursor: "pointer",
            width: "230px",
            margin: "0 auto",
            padding: "0px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row-reverse",
            gap: "8px",
            border: "0",
            boxSizing: "border-box",
            borderRadius: "6px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.16)",
            backgroundColor: "#5A3AB6",
            color: "#ffffff",
            fontSize: "14px",
            fontFamily: "Roboto",
            lineHeight: "22px",
            outline: "none",
            "&:hover": {
              backgroundColor: "#5A3AB6",
            },
          }}
        >
          Add job
        </Button>
      </Box>

      {!kanbanView && (
        <Box
          sx={{
            width: "800px",
            display: "flex",
            flexDirection: "column",
            marginLeft: "32px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "2px",
              boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
            }}
          >
            {jobDescById?.name && (
              <Typography
                sx={{
                  color: "#030303",
                  fontSize: "18px",
                  fontFamily: "Roboto",
                  lineHeight: "22px",
                  textTransform: "capitalize",
                  padding: "14px 20px",
                }}
              >
                {jobDescById?.name}
              </Typography>
            )}
          </Box>

          {jobDescById?.id && (
            <Box
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "2px",
                boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                marginTop: "24px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    color: "#030303",
                    fontSize: "16px",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    lineHeight: "20px",
                  }}
                >
                  Location:
                </Typography>
                <Box
                  sx={{
                    padding: "0px 8px",
                    border: "0",
                    boxSizing: "border-box",
                    borderRadius: "25px",
                    boxShadow: "0px 0px 10px rgba(3,3,3,0.1)",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                    lineHeight: "16px",
                    outline: "none",
                  }}
                >
                  {jobDescById?.location}
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "12px",
                    width: "70%",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#ffffff",
                      borderRadius: "2px",
                      boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                      display: "flex",
                      flexDirection: "column",
                      padding: "12px 7px",
                      width: "75%",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#030303",
                        fontSize: "16px",
                        fontFamily: "Roboto",
                        fontWeight: "500",
                        lineHeight: "20px",
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography
                      sx={{
                        color: "#023f81",
                        fontSize: "16px",
                        fontFamily: "Roboto",
                        lineHeight: "20px",
                        marginTop: "12px",
                      }}
                    >
                      {jobDescById.job_overview}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: "#ffffff",
                      borderRadius: "2px",
                      boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                      display: "flex",
                      flexDirection: "column",
                      padding: "12px 7px",
                      marginTop: "12px",
                      width: "75%",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#030303",
                        fontSize: "16px",
                        fontFamily: "Roboto",
                        fontWeight: "500",
                        lineHeight: "20px",
                      }}
                    >
                      Responsibilities
                    </Typography>
                    <Typography
                      sx={{
                        color: "#023f81",
                        fontSize: "16px",
                        fontFamily: "Roboto",
                        lineHeight: "20px",
                        marginTop: "12px",
                      }}
                    >
                      {jobDescById.responsibilities}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "end",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <WhatshotIcon
                      sx={{
                        fontSize: "12px",
                        marginRight: "10px",
                        fill: "#5A3AB6",
                      }}
                    />
                    <Box
                      sx={{
                        padding: "8px 8px",
                        border: "0",
                        boxSizing: "border-box",
                        borderRadius: "25px",
                        boxShadow: "0px 0px 10px rgba(3,3,3,0.1)",
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        fontSize: "12px",
                        fontFamily: "Roboto",
                        lineHeight: "16px",
                        outline: "none",
                        width: "179px",
                        textAlign: "center",
                      }}
                    >
                      {extractNumericValue(jobDescById.matching)}% Profile Match
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      width: "227px",
                      height: "100px",
                      backgroundColor: "#ffffff",
                      borderRadius: "2px",
                      boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                      marginTop: "28px",
                      display: "flex",
                      flexDirection: "column",
                      padding: "12px 15px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#030303",
                        fontSize: "16px",
                        fontFamily: "Roboto",
                        fontWeight: "500",
                        lineHeight: "20px",
                      }}
                    >
                      Status
                    </Typography>

                    <FormControl fullWidth sx={{ marginTop: "14px" }}>
                      <InputLabel id="demo-simple-select-label">
                        Set as current
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Select a status"
                        onChange={handleChange}
                        sx={{
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#5A3AB6",
                          },
                        }}
                      >
                        <MenuItem value="Saved">Not Yet Applied</MenuItem>
                        <MenuItem value="Applied">Applied</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={handleStatusChange}
                      sx={{
                        width: "120px",
                        height: "36px",
                        padding: "0px 8px",
                        border: "0",
                        boxSizing: "border-box",
                        borderRadius: "25px",
                        boxShadow: "0px 0px 10px rgba(3,3,3,0.1)",
                        backgroundColor: "#5A3AB6",
                        color: "#ffffff",
                        fontSize: "14px",
                        fontFamily: "Roboto",
                        lineHeight: "16px",
                        outline: "none",
                        marginTop: "24px",
                        "&:hover": {
                          backgroundColor: "#5A3AB6",
                        },
                      }}
                    >
                      {jdIsLoading ? (
                        <CircularProgress size={14} sx={{ color: "#fff" }} />
                      ) : (
                        "Apply"
                      )}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}

      <CreatejobDescriptionModal
        userId={userId}
        isOpen={modalOpen}
        handleClose={handleCloseModal}
        refetch={getJobDescByIdRefetch}
      />
    </Box>
  );
};

export default ConciergUserJobsPage;
