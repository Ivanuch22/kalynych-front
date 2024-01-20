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
  var isDeveloped = true;
  if(isDeveloped){
      document.body.style.backgroundColor = "#F7F8F9";
      return (
          <div className={styles.inDevelopment}>
              Магазин в розробці ще, дякую за проявлену зацікавленність. Приходьте до нас 01.02.2024
          </div>
      )
  }

  return (
      <section>
          <div className="container">
              <header className="header">
                  <div className="header__text_block">
                      <p className="header__text">Welcom back!</p>
                      <h1 className="header__name">Ivan</h1>
                  </div>
                  <div className="header__button_block">
                      <button className="header__button">
                          sdlkjlfsa
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                              <g id="SVGRepo_iconCarrier">
                                  <path
                                      d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                      stroke="#000000" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round"></path>
                              </g>
                          </svg>
                      </button>
                      <button className="header__button">
                          <svg width="128px" height="128px" viewBox="0 0 24 24" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                              <g id="SVGRepo_iconCarrier">
                                  <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M12 1.25C7.71983 1.25 4.25004 4.71979 4.25004 9V9.7041C4.25004 10.401 4.04375 11.0824 3.65717 11.6622L2.50856 13.3851C1.17547 15.3848 2.19318 18.1028 4.51177 18.7351C5.26738 18.9412 6.02937 19.1155 6.79578 19.2581L6.79768 19.2632C7.56667 21.3151 9.62198 22.75 12 22.75C14.378 22.75 16.4333 21.3151 17.2023 19.2632L17.2042 19.2581C17.9706 19.1155 18.7327 18.9412 19.4883 18.7351C21.8069 18.1028 22.8246 15.3848 21.4915 13.3851L20.3429 11.6622C19.9563 11.0824 19.75 10.401 19.75 9.7041V9C19.75 4.71979 16.2802 1.25 12 1.25ZM15.3764 19.537C13.1335 19.805 10.8664 19.8049 8.62349 19.5369C9.33444 20.5585 10.571 21.25 12 21.25C13.4289 21.25 14.6655 20.5585 15.3764 19.537ZM5.75004 9C5.75004 5.54822 8.54826 2.75 12 2.75C15.4518 2.75 18.25 5.54822 18.25 9V9.7041C18.25 10.6972 18.544 11.668 19.0948 12.4943L20.2434 14.2172C21.0086 15.3649 20.4245 16.925 19.0936 17.288C14.4494 18.5546 9.5507 18.5546 4.90644 17.288C3.57561 16.925 2.99147 15.3649 3.75664 14.2172L4.90524 12.4943C5.45609 11.668 5.75004 10.6972 5.75004 9.7041V9Z"
                                        fill="#000000"></path>
                              </g>
                          </svg>
                      </button>
                  </div>
              </header>

          </div>
      </section>
  );
};

export default MainPage;
