import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
  Chip,
} from "@mui/material";

import { usePage } from "@/context/PageNaming";

import api from "@/services/apiService";

import routes from "@/routes";

import { PasteTextModal, PasteTextJDModal } from "@/components";

import { JobCriteriaMatch } from "./JobCriteriaMatch";

import { ProfileMatch } from "./ProfileMatch";

import { JobsItem } from "./JobsItem";

import { InterviewQuestions } from "./InterviewQuestions";
import { IInterviewQuestions } from "@/interfaces/questions.interface";

import styles from "./MainPage.module.css";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PlusIcon from "@/assets/cvpage/PlusIcon";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ReplayIcon from "@mui/icons-material/Replay";

interface FormValues {
  job_desc: string;
}

interface ICVs {
  id: number;
  name: string;
  text: string;
  created: string;
  user_id: number;
  recommended: boolean;
  gpt_best_cv_name: string;
}

interface IResume {
  resume: ICVs[];
}

interface IGPTResponce {
  context_based_recommendations_to_improve_match: string;
  context_based_resume_evaluation: string;
  job_description_criteria: string;
  job_description_text: string;
  resume_match_for_each_criteria: string;
  resume_text: string;
}

const validationSchema = Yup.object().shape({
  cv: Yup.string().required("CV is required"),
  job_desc: Yup.string().required("Job Description is required"),
});

const sortOption = [
  "Saved",
  "Applied",
  "Interviewing",
  "Offer Received",
  "Offer Accepted",
  "Offer Declined",
  "No Longer in Consideration",
];

const typeOption = ["Gaps", "Strenghts", "Super_Strenghts"];

interface IGPTResponce {
  context_based_recommendations_to_improve_match: string;
  context_based_resume_evaluation: string;
  job_description_criteria: string;
  job_description_text: string;
  resume_match_for_each_criteria: string;
  resume_text: string;
}

interface ResultsData {
  cv: string;
  job_desc: string;
  object: {
    cv: number;
    id: number;
    job_desc: number;
    rows: IGPTResponce[];
    context_based_recommendations_to_improve_match?: string;
    context_based_resume_evaluation?: string;
    user: number;
  };
}

const MainPage: React.FC = () => {
  const { setPageName } = usePage();

  const methotPopUpRef = useRef<HTMLDivElement | null>(null);
  const methodTypePopUpRef = useRef<HTMLDivElement | null>(null);

  const { reset } = useForm<FormValues>({
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const [modalCVOpen, setModalCVOpen] = useState<boolean>(false);
  const [modalJPOpen, setModalJPOpen] = useState<boolean>(false);
  const [formattedData1, setFormattedData1] = useState<
    {
      job_description_criteria: string;
      job_description_text: string;
      resume_match_for_each_criteria: string;
    }[]
  >([]);
  const [formattedData2, setFormattedData2] = useState<
    {
      job_description_criteria: string;
      context_based_recommendations_to_improve_match: string;
      context_based_resume_evaluation: string;
      resume_match_for_each_criteria: string;
    }[]
  >([]);
  const [openSaveModal, setOpenSaveModal] = useState<boolean>(false);
  const [chatGptRespons, setChanGptResponce] = useState<IGPTResponce[] | null>(
    null
  );
  const [resultNotFound, setResultNotFound] = useState<boolean>(false);
  const [avaragePercent, setAvaragePercent] = useState<number | null>(null);
  const [table, setTable] = useState(1);
  const [jbID, setJDID] = useState<number | null>(null);
  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false);
  const [isMethodTypeDropdownOpen, setIsMethodTypeDropdownOpen] =
    useState(false);

  const [typeOfMethodType, setTypeOfMethodtype] = useState<string | null>(
    "Gaps"
  );

  const [typeOfMethod, setTypeOfMethod] = useState<string | null>(
    "Interviewing"
  );

  const apiUrl =
    typeOfMethod && typeOfMethodType
      ? `${routes.allJobDesc}?status=${typeOfMethod}&type=${typeOfMethodType}`
      : typeOfMethod
      ? `${routes.allJobDesc}?status=${typeOfMethod}`
      : typeOfMethodType
      ? `${routes.allJobDesc}?type=${typeOfMethodType}`
      : `${routes.allJobDesc}`;

  const getJobDescQuery = async () =>
    api.get<IResume>(apiUrl).then((res) => res.data);

  const getInterviewQuestionsQuery = async () =>
    api
      .post<IInterviewQuestions>(`${routes.getInterviewQuestions}`, {
        job_desc: jbID,
      })
      .then((res) => res.data);

  const getResultByJDQuery = async () =>
    api
      .get<ResultsData>(`${routes.getResultByJd}${jbID}/`)
      .then((res) => res.data);

  const getResultsQuery = (values: FormValues) =>
    api.post(routes.getResults, values).then((res) => res.data);

  const saveResultsQuery = (values: FormValues) =>
    api.post(routes.saveResults, values).then((res) => res.data);

  const { mutateAsync: saveResults, isLoading: saveResultsIsLoading } =
    useMutation(
      "saveResultsQuery",
      (values: FormValues) => saveResultsQuery(values),
      {
        onSuccess: () => {
          toast.success(
            "Congrats! the current insights have been saved. Come back to this page to view these insights anytime"
          );
          reset();
          setOpenSaveModal(false);
        },
        onError: (error) => {
          toast.error(
            <>
              <h3> hmmm, there seems to be an error </h3>
              <p>
                Make sure that you have pinned a resume to your target job you
                want to analyse.
              </p>
              <p>to do this, go to the "My Target Jobs" menu </p>
            </>
          );
        },
      }
    );

  const { mutateAsync: getResults, isLoading: getResultsIsLoading } =
    useMutation(
      "getResultsQuery",
      (values: FormValues) => getResultsQuery(values),
      {
        onError: (error) => {
          toast.error(
            <>
              <h3> hmmm, there seems to be an error </h3>
              <p>
                Make sure that you have pinned a resume to your target job you
                want to analyse.
              </p>
              <p>to do this, go to the "My Target Jobs" menu </p>
            </>
          );
        },
      }
    );

  const {
    data: dataByJD,
    isFetching: isFetchingByJD,
    isLoading: isLoadingByJD,
    refetch: dataByJDRefetch,
  } = useQuery<ResultsData>(["resultByJDQuery", jbID], getResultByJDQuery);

  const {
    data: questionsData,
    isLoading: questionsIsLoading,
    isFetching: questionsIsFetching,
    refetch: questionsRefetch,
  } = useQuery<IInterviewQuestions>(
    ["getInterviewQuestionsQuery", jbID],
    getInterviewQuestionsQuery,
    { enabled: false }
  );

  const {
    data: jobDescData,
    isFetching: jobDescIsFatching,
    isLoading: jobDescIsLoading,
    refetch: jobDescRefetch,
  } = useQuery<IResume>(
    ["getJobDescQuery", typeOfMethod, typeOfMethodType],
    getJobDescQuery
  );

  useEffect(() => {
    const formattedData1 =
      chatGptRespons?.map((item) => ({
        job_description_criteria: item.job_description_criteria,
        job_description_text: item.job_description_text,
        resume_match_for_each_criteria: item.resume_match_for_each_criteria,
      })) || [];

    const formattedData2 =
      chatGptRespons?.map((item) => ({
        job_description_criteria: item.job_description_criteria,
        context_based_recommendations_to_improve_match:
          item.context_based_recommendations_to_improve_match || "",
        context_based_resume_evaluation:
          item.context_based_resume_evaluation || "",
        resume_match_for_each_criteria: item.resume_match_for_each_criteria,
      })) || [];

    setFormattedData1(formattedData1);
    setFormattedData2(formattedData2);

    if (formattedData1.length > 0 && formattedData2.length > 0) {
      setResultNotFound(false);
    } else {
      setResultNotFound(true);
    }
  }, [chatGptRespons]);

  useEffect(() => {
    const formattedData1 =
      dataByJD?.object?.rows?.map((item) => ({
        job_description_criteria: item.job_description_criteria,
        job_description_text: item.job_description_text,
        resume_match_for_each_criteria: item.resume_match_for_each_criteria,
      })) || [];

    const formattedData2 =
      dataByJD?.object?.rows?.map((item) => ({
        job_description_criteria: item.job_description_criteria,
        context_based_recommendations_to_improve_match:
          item.context_based_recommendations_to_improve_match || "",
        context_based_resume_evaluation:
          item.context_based_resume_evaluation || "",
        resume_match_for_each_criteria: item.resume_match_for_each_criteria,
      })) || [];

    setFormattedData1(formattedData1);
    setFormattedData2(formattedData2);
  }, [dataByJD]);

  const filteredJDs = useMemo(() => jobDescData?.resume ?? [], [jobDescData]);

  const filteredQuestions = useMemo(
    () => (questionsData ? questionsData : null),
    [questionsData]
  );

  useEffect(() => {
    if (filteredJDs.length > 0 && filteredJDs[0]?.id !== null) {
      const firstJobDescId = filteredJDs[0].id;
      setJDID(firstJobDescId);
      dataByJDRefetch();
    }
  }, [filteredJDs]);

  useEffect(() => {
    setPageName("Ace My Interview");
  }, []);

  const handleChangeTable = (newValue: number) => {
    setTable(newValue);
  };

  const handleCloseJDModal = () => {
    setModalJPOpen(false);
  };

  const handleCloseCVModal = () => {
    setModalCVOpen(false);
  };

  const handleOpenSaveModal = () => {
    setOpenSaveModal(true);
  };

  const handleCloseSaveModal = () => {
    setOpenSaveModal(false);
  };

  const onSubmit = async () => {
    questionsRefetch();
    setFormattedData1([]);
    setFormattedData2([]);
    setAvaragePercent(null);
    try {
      if (jbID) {
        const res = await getResults({ job_desc: jbID.toString() });

        if (res.length) {
          const formattedArray = res.map((obj: IGPTResponce) => {
            const newObj: Record<string, any> = {};
            Object.keys(obj).forEach((key) => {
              const newKey = key.toLowerCase().replace(/\s+/g, "_");
              newObj[newKey] = (obj as any)[key];
            });
            return newObj;
          });

          setChanGptResponce(formattedArray);
          const sum = formattedArray.reduce((acc: any, item: any) => {
            const match = parseInt(item.resume_match_for_each_criteria, 10);
            return acc + match;
          }, 0);

          const average = sum / formattedArray.length;

          setAvaragePercent(+average.toFixed(1));
          setResultNotFound(true);
        }
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  const handleSaveGPTsResult = async () => {
    if (jbID) {
      const formattedData = chatGptRespons?.map((item) => {
        if (Array.isArray(item.resume_text)) {
          const formattedResumeText = item.resume_text.join("\n");
          return {
            ...item,
            resume_text: formattedResumeText,
          };
        }
        return item;
      });
      const data = {
        job_desc: jbID.toString(),
        rows: formattedData,
      };

      await saveResults(data);
    }
  };

  const handleSetId = (id: number) => {
    setJDID(id);
  };

  const handleRegenerateResponce = () => {
    onSubmit();
  };

  const toggleDropdown = useCallback(() => {
    setIsMethodDropdownOpen((prev) => !prev);
  }, []);

  const toggleTypeDropdown = useCallback(() => {
    setIsMethodTypeDropdownOpen((prev) => !prev);
  }, []);

  if (jobDescIsFatching || jobDescIsLoading || isFetchingByJD || isLoadingByJD)
    return (
      <CircularProgress
        size={50}
        sx={{
          color: "#5A3AB6",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );

  return (
    <Box sx={{ display: "flex", marginLeft: "12px", marginTop: "26px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "14px" }}
        >
          <div className={styles.smallWrapper}>
            <Typography
              sx={{
                color: "#495057",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "14px",
                marginLeft: "20px",
              }}
            >
              Filter
            </Typography>
            <div
              className={styles.filterBtnWrapper}
              onClick={toggleDropdown}
              ref={methotPopUpRef}
            >
              <Typography
                sx={{
                  color: "#495057",
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "300",
                  lineHeight: "14px",
                }}
              >
                Status
              </Typography>
              <KeyboardArrowDownIcon />
            </div>
            {isMethodDropdownOpen && (
              <div className={styles.optionWrapper}>
                {sortOption.map((method) => {
                  return (
                    <div
                      key={method}
                      onClick={() => {
                        setTypeOfMethod(method);
                        setIsMethodDropdownOpen(false);
                        setJDID(null);
                      }}
                      className={styles.optionFilter}
                    >
                      {method}
                    </div>
                  );
                })}
              </div>
            )}
            {typeOfMethod && (
              <Chip
                sx={{
                  height: "16px",
                  fontSize: "12px",
                  marginLeft: "8px",
                  padding: "12px 8px",
                  "& .MuiChip-deleteIcon": {
                    width: "12px",
                    height: "12px",
                    fontSize: "10px",
                  },
                }}
                label={typeOfMethod.toUpperCase()}
                onDelete={() => setTypeOfMethod(null)}
              />
            )}
          </div>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "14px",
            marginLeft: "54px",
          }}
        >
          <div className={styles.smallWrapper}>
            <div
              className={styles.filterBtnWrapper}
              onClick={toggleTypeDropdown}
              ref={methodTypePopUpRef}
            >
              <Typography
                sx={{
                  color: "#495057",
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "300",
                  lineHeight: "14px",
                }}
              >
                Option
              </Typography>
              <KeyboardArrowDownIcon />
            </div>
            {isMethodTypeDropdownOpen && (
              <div className={styles.optionWrapper}>
                {typeOption.map((method) => {
                  return (
                    <div
                      key={method}
                      onClick={() => {
                        setTypeOfMethodtype(method);
                        setIsMethodTypeDropdownOpen(false);
                        setJDID(null);
                      }}
                      className={styles.optionFilter}
                    >
                      {method === "Super_Strenghts"
                        ? "Super Strenghts"
                        : method}
                    </div>
                  );
                })}
              </div>
            )}
            {typeOfMethodType && (
              <Chip
                sx={{
                  height: "16px",
                  fontSize: "12px",
                  marginLeft: "8px",
                  padding: "12px 8px",
                  "& .MuiChip-deleteIcon": {
                    width: "12px",
                    height: "12px",
                    fontSize: "10px",
                  },
                }}
                label={typeOfMethodType.toUpperCase()}
                onDelete={() => setTypeOfMethodtype(null)}
              />
            )}
          </div>
        </Box>

        <Box
          sx={{
            paddingRight: "12px",
            paddingLeft: "12px",
            height: "70vh",
            overflow: "auto",
          }}
        >
          {filteredJDs.map(
            ({
              name,
              text,
              created,
              id,
              gpt_best_cv_name,
              recommended,
            }: ICVs) => (
              <JobsItem
                name={name}
                text={text}
                created={created}
                recommended={recommended}
                onSetId={() => handleSetId(id)}
                borderPurple={jbID === id ? true : false}
                pinnedCvName={gpt_best_cv_name}
              />
            )
          )}
        </Box>

        <Button
          onClick={() => setModalJPOpen(true)}
          endIcon={<PlusIcon className={styles.img} />}
          sx={{
            cursor: "pointer",
            width: "230px",
            marginLeft: "16px",
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "776px",
          marginLeft: "24px",
          height: "70vh",
          overflow: "auto",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "12px" }}
          >
            {dataByJD?.cv && (
              <>
                <Typography
                  sx={{
                    color: "#495057",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "15px",
                    textTransform: "capitalize",
                  }}
                >
                  CV:
                </Typography>
                <Typography
                  sx={{
                    color: "#495057",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "15px",
                    textTransform: "capitalize",
                    marginLeft: "4px",
                  }}
                >
                  {dataByJD?.cv}
                </Typography>
              </>
            )}

            {dataByJD?.job_desc && (
              <>
                <Typography
                  sx={{
                    color: "#495057",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "15px",
                    textTransform: "capitalize",
                    marginLeft: "14px",
                  }}
                >
                  Job description:
                </Typography>
                <Typography
                  sx={{
                    color: "#495057",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "15px",
                    textTransform: "capitalize",
                    marginLeft: "4px",
                  }}
                >
                  {dataByJD?.job_desc}
                </Typography>
              </>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            marginBottom: "24px",
            position: "relative",
            minHeight: "500px",
          }}
        >
          <Box>
            <Chip
              label="Job Criteria Match"
              variant="outlined"
              sx={
                table === 1
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      color: "#ffffff",
                      whiteSpace: "normal",
                      width: "100px",
                      textAlign: "center",
                      userSelect: "none",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "#c2c2c2",
                      border: "none",
                      whiteSpace: "normal",
                      width: "100px",
                      textAlign: "center",
                      userSelect: "none",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
              }
              onClick={() => handleChangeTable(1)}
            />
            <Chip
              label="Profile Insights"
              variant="outlined"
              sx={
                table === 2
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      width: "140px",
                      color: "#ffffff",
                      textAlign: "center",
                      marginLeft: "12px",
                      userSelect: "none",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "#c2c2c2",
                      border: "none",
                      whiteSpace: "normal",
                      width: "140px",
                      marginLeft: "12px",
                      textAlign: "center",
                      userSelect: "none",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
              }
              onClick={() => handleChangeTable(2)}
            />

            <Chip
              label="Interview Questions"
              variant="outlined"
              onClick={() => handleChangeTable(3)}
              sx={
                table === 3
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      width: "140px",
                      color: "#ffffff",
                      textAlign: "center",
                      marginLeft: "12px",
                      flexWrap: "wrap",
                      userSelect: "none",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "#c2c2c2",
                      border: "none",
                      whiteSpace: "normal",
                      userSelect: "none",
                      width: "140px",
                      marginLeft: "12px",
                      textAlign: "center",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
              }
            />
          </Box>
          {formattedData1?.length && formattedData2?.length ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginRight: "14px",
                marginTop: "12px",
              }}
            >
              {avaragePercent && (
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "26px",
                    marginRight: "12px",
                  }}
                >
                  {typeof avaragePercent === "number" &&
                    `Overall resume match: ${avaragePercent} %`}
                </Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  startIcon={<SaveAltIcon className={styles.saveIcon} />}
                  onClick={handleOpenSaveModal}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "25px",
                    background: "var(--text-color-60, #5A3AB6)",
                    color: "var(--text-color-20, #fff)",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "14px",
                    textTransform: "capitalize",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "12px",
                    "&:hover": {
                      backgroundColor: "#5A3AB6",
                    },
                  }}
                >
                  Save Insights
                </Button>

                <Button
                  variant="contained"
                  startIcon={<ReplayIcon sx={{ height: "12px" }} />}
                  onClick={() => handleRegenerateResponce()}
                  sx={{
                    backgroundColor: "transparent",
                    color: "#5A3AB6",
                    height: "20px",
                    marginRight: "8px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                    fontWeight: "400",
                    "&:hover": {
                      backgroundColor: "#5A3AB6",
                      color: "#fff",
                    },
                  }}
                >
                  Regenerate Insights
                </Button>
              </Box>
            </Box>
          ) : (
            <></>
          )}

          {!formattedData1.length && !formattedData2.length ? (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Button
                onClick={onSubmit}
                sx={{
                  display: "flex",
                  padding: "12px 8px",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "200px",
                  borderRadius: "25px",
                  background: "var(--text-color-60, #5A3AB6)",
                  color: "var(--text-color-20, #fff)",
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "14px",
                  textTransform: "capitalize",
                  border: "none",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#5A3AB6",
                  },
                }}
              >
                {getResultsIsLoading ? (
                  <CircularProgress sx={{ color: "#FFF" }} size={10} />
                ) : (
                  "Generate insights"
                )}
              </Button>
            </Box>
          ) : (
            <Box sx={{ marginTop: "14px", paddingRight: "14px" }}>
              {table === 1 &&
              Array.isArray(formattedData1) &&
              formattedData1.length > 0 ? (
                <JobCriteriaMatch
                  chatGptRespons={formattedData1}
                  resultNotFond={resultNotFound}
                  isLoading={getResultsIsLoading}
                />
              ) : (
                <Box />
              )}
              {table === 2 &&
              Array.isArray(formattedData2) &&
              formattedData2.length > 0 ? (
                <ProfileMatch
                  chatGptRespons={formattedData2}
                  resultNotFond={resultNotFound}
                  isLoading={getResultsIsLoading}
                />
              ) : (
                <Box />
              )}
              {table === 3 ? (
                <InterviewQuestions
                  data={filteredQuestions}
                  isLoading={questionsIsLoading}
                  questionsIsFetching={questionsIsFetching}
                />
              ) : (
                <Box />
              )}
            </Box>
          )}
        </Box>

        {
          // @ts-ignore
          <PasteTextModal
            isOpen={modalCVOpen}
            handleClose={handleCloseCVModal}
          />
        }
        <PasteTextJDModal
          isOpen={modalJPOpen}
          handleClose={handleCloseJDModal}
          refetch={jobDescRefetch}
        />

        <Modal
          open={openSaveModal}
          onClose={handleCloseSaveModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              background: "#fff",
              padding: "24px",
              transform: "translate(-50%, -50%)",
              boxShadow: 24,
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Save this insights?
            </Typography>

            <Typography
              id="modal-modal-text"
              sx={{ marginTop: "8px", marginBottom: "24px" }}
            >
              Your previous saved values will be replaced
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "14px auto 0 auto",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  border: "1px solid #5A3AB6",
                  color: "#5A3AB6",
                  "&:hover": {
                    backgroundColor: "#5A3AB6",
                    color: "#fff",
                  },
                }}
                onClick={handleCloseSaveModal}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#5A3AB6",
                  "&:hover": {
                    backgroundColor: "#5A3AB6",
                  },
                }}
                onClick={handleSaveGPTsResult}
              >
                {saveResultsIsLoading ? (
                  <CircularProgress size={24} sx={{ color: "#FFF" }} />
                ) : (
                  "Save"
                )}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default MainPage;
