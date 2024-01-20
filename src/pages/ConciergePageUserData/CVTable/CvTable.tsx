import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { Box, Typography } from "@mui/material";
import { TableComponent } from "@/components";

import routes from "@/routes";

import styles from "./CVTable.module.css";

interface ICVs {
  id: number;
  name: string;
  text: string;
  created: string;
  user_id: number;
}

interface IJobCriteriaMatch {
  // @ts-ignore
  filteredCVs: ICVs[] | null;
  resultNotFond?: boolean;
  isLoading: boolean;
}

const cvPerPage = 4;

const CVTable: React.FC<IJobCriteriaMatch> = ({
  filteredCVs,
  resultNotFond,
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

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
      width: 150,
      Cell: ({ row }: { row: any }) => {
        return (
          <Link
            className={styles.linkStyle}
            to={`${routes.cvById}${row.original.id}`}
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
      width: 150,
      Cell: ({ row }: { row: any }) => {
        return (
          <Link
            className={styles.linkStyle}
            to={`${routes.cvById}${row.original.id}`}
          >
            {row.original.text?.length > 40
              ? row.original?.text?.substring(0, 40) + "..."
              : row.original?.text}
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
            File
          </Typography>
        </Box>
      ),
      accessor: "file",
      width: 150,
      Cell: ({ row }: { row: any }) => {
        const filename = row.original.file_url?.substring(
          row.original.file_url?.lastIndexOf("/") + 1
        );

        return (
          <Box className={styles.linkStyle}>
            {filename?.length > 40
              ? filename?.substring(0, 40) + "..."
              : filename}
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
            Created
          </Typography>
        </Box>
      ),
      accessor: "created",
      width: 110,
      Cell: ({ value, row }: { value: string; row: any }) => (
        <Box className={styles.linkStyle}>
          {format(new Date(value), "dd.MM.yyyy")}
        </Box>
      ),
    },
  ];

  const indexOfLastCV = (currentPage + 1) * cvPerPage;
  const indexOfFirstCV = indexOfLastCV - cvPerPage;
  const currentCVs = filteredCVs?.slice(indexOfFirstCV, indexOfLastCV);
  return (
    <Box
      sx={{
        // width: "876px",
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
    </Box>
  );
};

export default CVTable;
