import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

import { Box, Button, Chip, CircularProgress, Typography } from "@mui/material";

import { usePage } from "@/context/PageNaming";

import api from "@/services/apiService";

import routes from "@/routes";

import { PasteTextJDModal } from "@/components";

import { JobsItem } from "../MainPage/JobsItem";

import { DeleteJobDescModal } from "./DeleteJobDescModal/DeleteJobDescModal";
import { EditjobDescModal } from "./EditJobDescModal/EditJobDescModal";

import styles from "./JobDescription.module.css";

import PlusIcon from "@/assets/cvpage/PlusIcon";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface ICVs {
  id: number;
  name: string;
  text: string;
  created: string;
  user_id: number;
  status: string | null;
  recommended: boolean;
  location: string;
  matching: string;
  gpt_best_cv_name: string;
  job_overview: string;
  responsibilities: string;
  pay_range: string;
  minimum_qualifications: string;
  prefered_qualifications: string;
  visa_sponsorship: string;
  security_clearance: string;
  work_location_type: string;
}

interface IResume {
  resume: ICVs[];
}

interface IReasign {
  id: number;
}

const sortOption = [
  "Saved",
  "Applied",
  "Interviewing",
  "Offer Received",
  "Offer Accepted",
  "Offer Declined",
  "No Longer in Consideration",
];

const JobDescriptionPage = () => {
  const { setPageName } = usePage();

  const methotPopUpRef = useRef<HTMLDivElement | null>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [jobDescToDelete, setJobDescToDelete] = useState<string>();
  const [jobDescToEditId, setJobDescToEditId] = useState<string | null>(null);
  const [jbID, setJDID] = useState<number | null>(null);
  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false);
  const [typeOfMethod, setTypeOfMethod] = useState<string | null>(
    "Interviewing"
  );

  const apiUrl = typeOfMethod
    ? `${routes.allJobDesc}?status=${typeOfMethod}`
    : `${routes.allJobDesc}`;

  const getJobDescQuery = async () =>
    api.get<IResume>(apiUrl).then((res) => res.data);

  const deleteJobDescQuery = (id: string) =>
    api.delete(`${routes.getJobDescById}${id}/`).then((res) => res.data);

  const reasignCVQuery = (values: IReasign) =>
    api.post(routes.reasignCV, values).then((res) => res.data);

  const getJobDescByIdQuery = async () =>
    api.get<ICVs>(`${routes.getJobDescById}${jbID}/`).then((res) => res.data);

  const {
    data: getJobDescById,
    isLoading: jobDescLoading,
    isFetching: jobDescFetching,
    refetch: getJobDescByIdRefetch,
  } = useQuery<ICVs>(["getJobDescByIdQuery", jbID], getJobDescByIdQuery, {
    enabled: false,
  });

  const { data, isFetching, isLoading, refetch } = useQuery<IResume>(
    ["getJobDescQuery", typeOfMethod],
    getJobDescQuery
  );

  const { mutateAsync: reasignCv, isLoading: reasignCVIsLoadign } = useMutation(
    "reasignCVQuery",
    (values: IReasign) => reasignCVQuery(values),
    {
      onSuccess: () => {
        toast.success("CV has been successfully reasigned");
      },
    }
  );

  const { mutateAsync: deleteJobDescMutation, isLoading: deleteLoading } =
    useMutation("deleteJobDescQuery", (id: string) => deleteJobDescQuery(id), {
      onSuccess: () => {
        setOpenDeleteDialog(false);
        refetch();
        toast.success("Job Description has been successfully deleted");
      },
    });

  const filteredJobDesc = useMemo(() => data?.resume ?? [], [data]);

  useEffect(() => {
    setPageName("My Target Jobs");
  }, []);

  useEffect(() => {
    jbID && getJobDescByIdRefetch();
  }, [jbID]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteOpen = useCallback((id: string) => {
    setOpenDeleteDialog(true);
    setJobDescToDelete(id);
  }, []);

  const handleOpenEdit = useCallback((id: string) => {
    setOpenEditDialog(true);
    setJobDescToEditId(id);
  }, []);

  const handleDeleteJobDesc = async () => {
    jobDescToDelete && (await deleteJobDescMutation(jobDescToDelete));
  };

  const handleCloseEditModal = () => {
    setOpenEditDialog(false);
    setJobDescToEditId(null);
  };

  const handleSetId = (id: number) => {
    setJDID(id);
  };

  const handleReasignCv = async (id: number) => {
    const data = {
      id: id,
    };

    const newData: ICVs = await reasignCv(data);
    if (newData.id) {
      // @ts-ignore
      setCvId(newData?.gpt_best_cv);
    }
  };

  const toggleDropdown = useCallback(() => {
    setIsMethodDropdownOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    jobDescToEditId && getJobDescByIdRefetch();
  }, [jobDescToEditId]);

  useEffect(() => {
    filteredJobDesc.length && setJDID(filteredJobDesc[0].id);
  }, [filteredJobDesc]);

  if (isLoading || isFetching)
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
    <Box sx={{ display: "flex", marginTop: "24px", paddingRight: "12px" }}>
      <Box
        sx={{ display: "flex", marginLeft: "12px", flexDirection: "column" }}
      >
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
            paddingRight: "12px",
            paddingLeft: "12px",
            height: "80vh",
            overflow: "auto",
          }}
        >
          {filteredJobDesc
            .sort(
              (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime()
            )
            .map(
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
          onClick={() => setModalOpen(true)}
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

      {getJobDescById?.id ? (
        <Box
          sx={{ display: "flex", flexDirection: "column", marginLeft: "12px" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                // width: "125px",
              }}
              onClick={() => handleOpenEdit(getJobDescById.id.toString())}
            >
              <Typography sx={{ color: "#5A3AB6" }}>Edit Job</Typography>
              <ModeIcon
                sx={{
                  cursor: "pointer",
                  marginLeft: "8px",
                  height: "20px",
                  fill: "#5A3AB6",
                }}
              />
            </Box>

            {!isFetching && (
              <Box
                sx={{
                  // width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{
                    height: "20px",
                    width: "200px",
                    display: "flex",
                    padding: "18px 12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
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
                  onClick={() => handleReasignCv(getJobDescById.id)}
                >
                  {reasignCVIsLoadign ? (
                    <CircularProgress size={14} sx={{ color: "#fff" }} />
                  ) : (
                    "Reassign CV"
                  )}
                </Button>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                // width: "200px",
              }}
              onClick={() => handleDeleteOpen(getJobDescById.id.toString())}
            >
              <Typography sx={{ color: "#5A3AB6" }}>Delete Project</Typography>
              <DeleteIcon
                sx={{
                  cursor: "pointer",
                  marginLeft: "8px",
                  height: "20px",
                  fill: "#5A3AB6",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              marginBottom: "24px",
              position: "relative",
              // minHeight: "600px",
            }}
          >
            {jobDescLoading && jobDescFetching ? (
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
            ) : (
              <Box
                sx={{
                  height: "72vh",
                  overflow: "auto",
                  backgroundColor: "#ffffff",
                  borderRadius: "2px",
                  boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                  padding: "12px 15px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
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
                        width: "302px",
                        padding: "12px",
                        border: "0",
                        boxSizing: "border-box",
                        borderRadius: "25px",
                        boxShadow: "0px 0px 10px rgba(3,3,3,0.1)",
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        fontSize: "14px",
                        fontFamily: "Roboto",
                        lineHeight: "16px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "4px",
                      }}
                    >
                      {getJobDescById.location}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      width: "302px",
                      height: "29px",
                      padding: "12px",
                      border: "0",
                      boxSizing: "border-box",
                      borderRadius: "25px",
                      boxShadow: "0px 0px 10px rgba(3,3,3,0.1)",
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      fontSize: "14px",
                      fontFamily: "Roboto",
                      lineHeight: "16px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "4px",
                    }}
                  >
                    {getJobDescById.matching} Profile Match
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                    borderRadius: "2px",
                    boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                    padding: "7px 9px",
                    marginTop: "24px",
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
                      marginTop: "8px",
                    }}
                  >
                    {getJobDescById.job_overview}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                    borderRadius: "2px",
                    boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                    padding: "7px 9px",
                    marginTop: "24px",
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
                      marginTop: "8px",
                    }}
                  >
                    {getJobDescById.responsibilities}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                    borderRadius: "2px",
                    boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                    padding: "7px 9px",
                    marginTop: "24px",
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
                    Pay range
                  </Typography>
                  <Typography
                    sx={{
                      color: "#023f81",
                      fontSize: "16px",
                      fontFamily: "Roboto",
                      lineHeight: "20px",
                      marginTop: "8px",
                    }}
                  >
                    {getJobDescById.pay_range}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                    borderRadius: "2px",
                    boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                    padding: "7px 9px",
                    marginTop: "24px",
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
                    Minimum qualifications
                  </Typography>
                  <Typography
                    sx={{
                      color: "#023f81",
                      fontSize: "16px",
                      fontFamily: "Roboto",
                      lineHeight: "20px",
                      marginTop: "8px",
                    }}
                  >
                    {getJobDescById.minimum_qualifications}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                    borderRadius: "2px",
                    boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                    padding: "7px 9px",
                    marginTop: "24px",
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
                    Prefered qualifications
                  </Typography>
                  <Typography
                    sx={{
                      color: "#023f81",
                      fontSize: "16px",
                      fontFamily: "Roboto",
                      lineHeight: "20px",
                      marginTop: "8px",
                    }}
                  >
                    {getJobDescById.prefered_qualifications}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                    borderRadius: "2px",
                    boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                    padding: "7px 9px",
                    marginTop: "24px",
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
                    Visa sponsorship
                  </Typography>
                  <Typography
                    sx={{
                      color: "#023f81",
                      fontSize: "16px",
                      fontFamily: "Roboto",
                      lineHeight: "20px",
                      marginTop: "8px",
                    }}
                  >
                    {getJobDescById.visa_sponsorship}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                    borderRadius: "2px",
                    boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                    padding: "7px 9px",
                    marginTop: "24px",
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
                    Security clearance
                  </Typography>
                  <Typography
                    sx={{
                      color: "#023f81",
                      fontSize: "16px",
                      fontFamily: "Roboto",
                      lineHeight: "20px",
                      marginTop: "8px",
                    }}
                  >
                    {getJobDescById.security_clearance}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                    borderRadius: "2px",
                    boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                    padding: "7px 9px",
                    marginTop: "24px",
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
                    Work location type
                  </Typography>
                  <Typography
                    sx={{
                      color: "#023f81",
                      fontSize: "16px",
                      fontFamily: "Roboto",
                      lineHeight: "20px",
                      marginTop: "8px",
                    }}
                  >
                    {getJobDescById.work_location_type}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box />
      )}

      <PasteTextJDModal
        isOpen={modalOpen}
        handleClose={handleCloseModal}
        refetch={refetch}
      />

      <DeleteJobDescModal
        handleConfirm={handleDeleteJobDesc}
        isOpen={openDeleteDialog}
        handleClose={handleCloseDeleteModal}
        deleteLoading={deleteLoading}
        refetch={refetch}
      />

      <EditjobDescModal
        isOpen={openEditDialog}
        handleClose={handleCloseEditModal}
        refetch={refetch}
        // @ts-ignore
        jobDescToEdit={getJobDescById}
        jobDescLoading={jobDescLoading}
        jobDescFetching={jobDescFetching}
      />
    </Box>
  );
};

export default JobDescriptionPage;
