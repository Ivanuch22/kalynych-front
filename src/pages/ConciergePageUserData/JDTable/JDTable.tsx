import React, { useCallback, useEffect, useState } from "react";
import { Column } from "react-table";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useQuery } from "react-query";

import { Row } from "@/interfaces/table.interfaces";
import routes from "@/routes";
import api from "@/services/apiService";

import { EditjobDescModal } from "./EditJDModal";
import { TableComponent } from "@/components";

import PlusIcon from "@/assets/cvpage/PlusIcon";
import DownloadIcon from "@mui/icons-material/Download";
import ModeIcon from "@mui/icons-material/Mode";
import PushPinIcon from "@mui/icons-material/PushPin";

import styles from "./JDTable.module.css";

interface ICVs {
  id: number;
  name: string;
  text: string;
  created: string;
  user_id: number;
  status: string | null;
}

interface IResume {
  resume: ICVs[];
}

interface ITable {
  filteredJD: ICVs[] | null;
  resultNotFond?: boolean;
  isLoading: boolean;
  jdRefetch: () => void;
}

const cvPerPage = 4;

const JDTable: React.FC<ITable> = ({
  filteredJD,
  resultNotFond,
  isLoading,
  jdRefetch,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [jobDescToEditId, setJobDescToEditId] = useState<string | null>(null);
  const [jobDescToEdit, setJobDescToEdit] = useState<ICVs | null>(null);

  const getJobDescByIdQuery = async () =>
    api
      .get<ICVs>(`${routes.getJobDescById}${jobDescToEditId}/`)
      .then((res) => res.data);

  const {
    data: getJobDescById,
    isLoading: jobDescLoading,
    isFetching: jobDescFetching,
    refetch: getJobDescByIdRefetch,
  } = useQuery<ICVs>(
    ["getJobDescByIdQuery", jobDescToEditId],
    getJobDescByIdQuery,
    {
      enabled: false,
    }
  );

  useEffect(() => {
    getJobDescById?.id && setJobDescToEdit(getJobDescById);
  }, [getJobDescById]);

  useEffect(() => {
    jobDescToEditId && getJobDescByIdRefetch();
  }, [jobDescToEditId]);

  const handleDeleteOpen = useCallback((id: string) => {
    // setOpenDeleteDialog(true);
    // setJobDescToDelete(id);
  }, []);

  const handleOpenEdit = useCallback((id: string) => {
    setOpenEditDialog(true);
    setJobDescToEditId(id);
    setJobDescToEdit(null);
  }, []);

  const handleCloseEditModal = () => {
    setOpenEditDialog(false);
    setJobDescToEditId(null);
  };

  const columns = [
    {
      Header: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "26px",
              color: "#343a40",
            }}
          >
            Name
          </Typography>
        </Box>
      ),
      accessor: "name",
      width: 110,
      Cell: ({ row }: { row: any }) => {
        return (
          <Link
            className={styles.linkStyle}
            to={`${routes.jobsDescriptions}/${row.original.id}`}
          >
            {row.original.name}
          </Link>
        );
      },
    },
    {
      Header: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "26px",
              color: "#343a40",
            }}
          >
            Text
          </Typography>
        </Box>
      ),
      accessor: "text",
      width: 130,
      Cell: ({ row }: { row: any }) => {
        return (
          <Link
            className={styles.linkStyle}
            to={`${routes.jobsDescriptions}/${row.original.id}`}
          >
            {row.original.text?.length > 40
              ? row.original.text?.substring(0, 40) + "..."
              : row.original.text}
          </Link>
        );
      },
    },
    {
      Header: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "26px",
              color: "#343a40",
            }}
          >
            Created
          </Typography>
        </Box>
      ),
      accessor: "created",
      width: 110,
      Cell: ({ value, row }: { value: string; row: any }) => (
        <Link
          className={styles.linkStyle}
          to={`${routes.jobsDescriptions}/${row.original.id}`}
        >
          {format(new Date(value), "dd.MM.yyyy")}
        </Link>
      ),
    },
    {
      Header: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PushPinIcon sx={{ height: "14px", display: "flex" }} />
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "26px",
              color: "#343a40",
            }}
          >
            Pinned CV
          </Typography>
        </Box>
      ),
      accessor: "gpt_best_cv_name",
      width: 110,
      Cell: ({ row }: { row: any }) => {
        return (
          <Box className={styles.linkStyleCv}>
            {row.original.gpt_best_cv_name}
          </Box>
        );
      },
    },
    {
      Header: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "26px",
              color: "#343a40",
            }}
          >
            Status
          </Typography>
        </Box>
      ),
      accessor: "status",
      width: 110,
      Cell: ({ row }: { row: any }) => (
        <Box className={styles.linkStyle}>{row.original.status}</Box>
      ),
    },
    {
      Header: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "26px",
              color: "#343a40",
            }}
          >
            Action
          </Typography>
        </Box>
      ),
      accessor: "id",
      with: 120,
      Cell: ({ row }: { row: any }) => {
        const id = row.original.id;
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DownloadIcon sx={{ cursor: "pointer", height: "20px" }} />

            <ModeIcon
              sx={{ cursor: "pointer", marginLeft: "8px", height: "20px" }}
              onClick={() => handleOpenEdit(id)}
            />

            <Button
              onClick={() => handleDeleteOpen(id)}
              variant="outlined"
              sx={{
                color: "#f46a6a",
                border: "1px solid #f46a6a",
                height: "20px",
                fontSize: "10px",
                textTransform: "capitalize",
                fontWeight: "400",
                marginLeft: "8px",
                "&:hover": {
                  backgroundColor: "#f46a6a",
                  color: "#fff",
                  border: "none",
                },
              }}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  const indexOfLastCV = (currentPage + 1) * cvPerPage;
  const indexOfFirstCV = indexOfLastCV - cvPerPage;
  const currentCVs = filteredJD?.slice(indexOfFirstCV, indexOfLastCV);
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "2px",
        boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
        display: "flex",
        flexDirection: "column",
        padding: "26px 20px 26px 20px",
      }}
    >
      <Box sx={{ marginTop: "14px" }}>
        <TableComponent
          resultsFound={resultNotFond}
          columns={columns}
          // @ts-ignore
          data={currentCVs}
          isLoading={isLoading}
        />
      </Box>

      <EditjobDescModal
        isOpen={openEditDialog}
        handleClose={handleCloseEditModal}
        refetch={jdRefetch}
        // @ts-ignore
        jobDescToEdit={jobDescToEdit}
        jobDescLoading={jobDescLoading}
        jobDescFetching={jobDescFetching}
      />
    </Box>
  );
};

export default JDTable;
