import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import { toast } from "react-toastify";

import api from "@/services/apiService";

import routes from "@/routes";

import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { usePage } from "@/context/PageNaming";

import { PasteTextModal } from "@/components";

import { EditCVModal } from "./EditCVModal/EditCVModal";

import { DeleteCVModal } from "./DeleteCVModal/DeleteCvModal";

import {
  CreateCoverLetter,
  DeleteCoverLetterModal,
  EditCoverLetterModal,
} from "./CoverLetter";

import styles from "./СVPage.module.css";

import ModeIcon from "@mui/icons-material/Mode";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";

interface ICVs {
  id: number;
  name: string;
  text: string;
  created: string;
  user_id: number;
  file_url: string;
}

interface IResume {
  resume: ICVs[];
}

interface ICoverLetter {
  cover_letter: ICVs[];
}

const CVPage: React.FC = () => {
  const { setPageName } = usePage();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [createCVModalOpen, setCreateCVModalOpen] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openCoveerLetterDeleteDialog, setOpenCoverLetterDeleteDialog] =
    useState<boolean>(false);
  const [cvToDelete, setCVToDelete] = useState<string>();
  const [coverLetterToDelete, setCoverLetterToDelete] = useState<string>();
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openEditCoverLetterDialog, setOpenEditCoverLetterDialog] =
    useState<boolean>(false);
  const [cvToEditId, setCVToEditId] = useState<string | null>(null);
  const [cvToEdit, setCVToEdit] = useState<ICVs | null>(null);

  const [coverLetterToEditId, setCoverLetterToEditId] = useState<string | null>(
    null
  );
  const [coverLetterToEdit, setCoverLetterToEdit] = useState<ICVs | null>(null);

  const getCVsQuery = async () =>
    api.get<IResume>(routes.allResumes).then((res) => res.data);

  const getCoverLetterQuery = async () =>
    api.get<ICoverLetter>(routes.getAllCoverLetters).then((res) => res.data);

  const deleteCVQuery = (id: string) =>
    api.delete(`${routes.getCvById}${id}/`).then((res) => res.data);

  const deleteCoverLetterQuery = (id: string) =>
    api.delete(`${routes.coverLetterById}${id}/`).then((res) => res.data);

  const getCVByIdQuery = async () =>
    api.get<ICVs>(`${routes.getCvById}${cvToEditId}/`).then((res) => res.data);

  const getCoverLetterByIdQuery = async () =>
    api
      .get<ICVs>(`${routes.coverLetterById}${coverLetterToEditId}/`)
      .then((res) => res.data);

  const {
    data: getCVById,
    isLoading: cvLoading,
    isFetching: cvFetching,
    refetch: getCVByIdRefetch,
  } = useQuery<ICVs>(["getCVByIdQuery", cvToEditId], getCVByIdQuery, {
    enabled: false,
  });

  const {
    data: getCoverLetterById,
    isLoading: coverLetterByIdLoading,
    isFetching: coverLetterByIdFetching,
    refetch: getCoverLetterByIdRefetch,
  } = useQuery<ICVs>(
    ["getCoverLetterByIdQuery", coverLetterToEditId],
    getCoverLetterByIdQuery,
    {
      enabled: false,
    }
  );

  const { data, isFetching, isLoading, refetch } = useQuery<IResume>(
    "cvsQuery",
    getCVsQuery
  );

  const {
    data: coverLetters,
    isFetching: coverLettersIsFetching,
    isLoading: coverLettersIsLoading,
    refetch: coverLettersRefetch,
  } = useQuery<ICoverLetter>("getCoverLetterQuery", getCoverLetterQuery);

  const { mutateAsync: deletePostMutation, isLoading: deleteLoading } =
    useMutation("deleteCVQuery", (id: string) => deleteCVQuery(id), {
      onSuccess: () => {
        setOpenDeleteDialog(false);
        refetch();
        toast.success("Resume has been successfully deleted");
      },
    });

  const {
    mutateAsync: deleteCoverLetterMutation,
    isLoading: deleteCoverLetterLoading,
  } = useMutation(
    "deleteCoverLetterQuery",
    (id: string) => deleteCoverLetterQuery(id),
    {
      onSuccess: () => {
        setOpenCoverLetterDeleteDialog(false);
        coverLettersRefetch();
        toast.success("Cover Letter has been successfully deleted");
      },
    }
  );

  const filteredCoverLetters = useMemo(
    () => coverLetters?.cover_letter ?? [],
    [coverLetters]
  );

  const filteredResumes = useMemo(() => data?.resume ?? [], [data]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseCvModal = () => {
    setCreateCVModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteDialog(false);
  };

  const handleCloseCoverLetterDeleteModal = () => {
    setOpenCoverLetterDeleteDialog(false);
  };

  const handleDeleteOpen = useCallback((id: string) => {
    setOpenDeleteDialog(true);
    setCVToDelete(id);
  }, []);

  const handleDeleteCoverLetterOpen = useCallback((id: string) => {
    setOpenCoverLetterDeleteDialog(true);
    setCoverLetterToDelete(id);
  }, []);

  const handleDeleteCV = async () => {
    cvToDelete && (await deletePostMutation(cvToDelete));
  };

  const handleDeleteCoverLetter = async () => {
    coverLetterToDelete &&
      (await deleteCoverLetterMutation(coverLetterToDelete));
  };

  const handleOpenEdit = useCallback((id: string) => {
    setOpenEditDialog(true);
    setCVToEditId(id);
    setCVToEdit(null);
  }, []);

  const handleOpenEditCoverLetter = useCallback((id: string) => {
    setOpenEditCoverLetterDialog(true);
    setCoverLetterToEditId(id);
    setCoverLetterToEdit(null);
  }, []);

  const handleCloseEditModal = () => {
    setOpenEditDialog(false);
    setCVToEditId(null);
  };

  const handleCloseEditCoverLetterModal = () => {
    setOpenEditCoverLetterDialog(false);
    setCoverLetterToEditId(null);
    setCoverLetterToEdit(null);
  };

  useEffect(() => {
    cvToEditId && getCVByIdRefetch();
  }, [cvToEditId]);

  useEffect(() => {
    coverLetterToEditId && getCoverLetterByIdRefetch();
  }, [coverLetterToEditId]);

  getCoverLetterById;
  useEffect(() => {
    getCoverLetterById?.id && setCoverLetterToEdit(getCoverLetterById);
  }, [getCoverLetterById]);

  useEffect(() => {
    getCVById?.id && setCVToEdit(getCVById);
  }, [getCVById]);

  useEffect(() => {
    setPageName("My Resumes");
  }, []);

  if (
    isLoading ||
    isFetching ||
    coverLettersIsFetching ||
    coverLettersIsLoading
  )
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
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "80px",
          marginLeft: "12px",
          width: "1000px",
        }}
      >
        <Box
          sx={{
            width: "451px",
            backgroundColor: "#ffffff",
            borderRadius: "2px",
            boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
            display: "flex",
            flexDirection: "column",
            padding: "25px 12px",
          }}
        >
          <Typography
            sx={{
              color: "#030303",
              fontSize: "24px",
              fontFamily: "Roboto",
              fontWeight: 500,
              lineHeight: "32px",
              paddingBottom: "12px",
              borderBottom: "1px solid #d3d3d3",
            }}
          >
            Resumes
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              margin: "0 auto",
            }}
          >
            {filteredResumes.map((el: ICVs) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "24px",
                  paddingBottom: "24px",
                  borderBottom: "1px solid #d3d3d3",
                }}
              >
                <InsertDriveFileIcon sx={{ fill: "#6741d9" }} />
                {el.file_url ? (
                  <a
                    className={styles.linkStyle}
                    href={el.file_url}
                    download={el.name}
                  >
                    {el.name}
                  </a>
                ) : (
                  <Link
                    className={styles.linkStyle}
                    to={`${routes.cvById}${el.id}`}
                  >
                    {el.name}
                  </Link>
                )}

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ModeIcon
                    sx={{
                      cursor: "pointer",
                      marginLeft: "8px",
                      height: "20px",
                      fill: "#6741d9",
                    }}
                    onClick={() => handleOpenEdit(el.id.toString())}
                  />

                  <DeleteIcon
                    onClick={() => handleDeleteOpen(el.id.toString())}
                    sx={{
                      cursor: "pointer",
                      marginLeft: "8px",
                      height: "20px",
                      fill: "#6741d9",
                    }}
                  />
                </Box>
              </Box>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                startIcon={<AddBoxIcon sx={{ fill: "#21338e" }} />}
                onClick={() => setModalOpen(true)}
                sx={{
                  width: "132px",
                  height: "40px",
                  padding: "0px 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row-reverse",
                  gap: "8px",
                  border: "0",
                  boxSizing: "border-box",
                  borderRadius: "100px",
                  backgroundColor: "#e3e7fd",
                  color: "#21338e",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: 600,
                  lineHeight: "20px",
                  outline: "none",
                  marginTop: "12px",
                  "&:hover": {
                    backgroundColor: "#e3e7fd",
                  },
                }}
              >
                Add new
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "451px",
            backgroundColor: "#ffffff",
            borderRadius: "2px",
            boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
            display: "flex",
            flexDirection: "column",
            padding: "25px 12px",
          }}
        >
          <Typography
            sx={{
              color: "#030303",
              fontSize: "24px",
              fontFamily: "Roboto",
              fontWeight: 500,
              lineHeight: "32px",
              paddingBottom: "12px",
              borderBottom: "1px solid #d3d3d3",
            }}
          >
            Cover Letters
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              margin: "0 auto",
            }}
          >
            {filteredCoverLetters.map((el: ICVs) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "24px",
                  paddingBottom: "24px",
                  borderBottom: "1px solid #d3d3d3",
                }}
              >
                <InsertDriveFileIcon sx={{ fill: "#6741d9" }} />
                <Link
                  className={styles.linkStyle}
                  to={`${routes.cvById}${el.id}`}
                >
                  {el.name}
                </Link>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ModeIcon
                    sx={{
                      cursor: "pointer",
                      marginLeft: "8px",
                      height: "20px",
                      fill: "#6741d9",
                    }}
                    onClick={() => handleOpenEditCoverLetter(el.id.toString())}
                  />

                  <DeleteIcon
                    onClick={() =>
                      handleDeleteCoverLetterOpen(el.id.toString())
                    }
                    sx={{
                      cursor: "pointer",
                      marginLeft: "8px",
                      height: "20px",
                      fill: "#6741d9",
                    }}
                  />
                </Box>
              </Box>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                startIcon={<AddBoxIcon sx={{ fill: "#21338e" }} />}
                onClick={() => setCreateCVModalOpen(true)}
                sx={{
                  width: "132px",
                  height: "40px",
                  padding: "0px 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row-reverse",
                  gap: "8px",
                  border: "0",
                  boxSizing: "border-box",
                  borderRadius: "100px",
                  backgroundColor: "#e3e7fd",
                  color: "#21338e",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: 600,
                  lineHeight: "20px",
                  outline: "none",
                  marginTop: "12px",
                  "&:hover": {
                    backgroundColor: "#e3e7fd",
                  },
                }}
              >
                Add new
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <CreateCoverLetter
        isOpen={createCVModalOpen}
        handleClose={handleCloseCvModal}
        refetch={coverLettersRefetch}
      />

      <PasteTextModal
        isOpen={modalOpen}
        handleClose={handleCloseModal}
        refetch={refetch}
      />

      <DeleteCoverLetterModal
        handleConfirm={handleDeleteCoverLetter}
        isOpen={openCoveerLetterDeleteDialog}
        handleClose={handleCloseCoverLetterDeleteModal}
        deleteLoading={deleteCoverLetterLoading}
        refetch={coverLettersRefetch}
      />

      <DeleteCVModal
        handleConfirm={handleDeleteCV}
        isOpen={openDeleteDialog}
        handleClose={handleCloseDeleteModal}
        deleteLoading={deleteLoading}
        refetch={refetch}
      />

      <EditCoverLetterModal
        isOpen={openEditCoverLetterDialog}
        handleClose={handleCloseEditCoverLetterModal}
        refetch={coverLettersRefetch}
        cvToEdit={coverLetterToEdit}
        cvLoading={coverLetterByIdLoading}
        cvFetching={coverLetterByIdFetching}
      />

      <EditCVModal
        isOpen={openEditDialog}
        handleClose={handleCloseEditModal}
        refetch={refetch}
        cvToEdit={cvToEdit}
        cvLoading={cvLoading}
        cvFetching={cvFetching}
      />
    </Box>
  );
};

export default CVPage;
