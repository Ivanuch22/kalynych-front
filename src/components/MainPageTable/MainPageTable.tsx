import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import ReactPaginate from "react-paginate";

import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { TableComponent, TableHeader } from "@/components";

import { Row } from "@/interfaces/table.interfaces";

import PlusIcon from "@/assets/cvpage/PlusIcon";

import styles from "./MainPageTable.module.css";
import LeftIcon from "@/assets/paginationArrow/LeftIcon";
import RightIcon from "@/assets/paginationArrow/RightIcon";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

type ColumnWithCustomHeader = Column<Row> & {
  customHeader: React.ReactNode;
};

const cvPerPage = 4;

const Data = [
  {
    id: 1,
    job_description_criteria: "Job Description criteria",
    job_description_text: "Job Description text",
    context_based_resume_evaluation: "Context based Resume Evaluation",
    resume_match_for_each_criteria: "Resume % Match for each criteria",
    resume_text: "Resume Text",
    context_based_Recommendations_to_improve_match:
      "Context based Recommendations to improve match",
  },
];

interface IGPTResponce {
  context_based_recommendations_to_improve_match: string;
  context_based_resume_evaluation: string;
  job_description_criteria: string;
  job_description_text: string;
  resume_match_for_each_criteria: string;
  resume_text: string;
}

interface IMainPageTable {
  chatGptRespons: IGPTResponce[] | null;
  resultNotFond: boolean;
  isLoading: boolean;
  handleOpenModal: () => void;
}

const MainPageTable: React.FC<IMainPageTable> = ({
  chatGptRespons,
  resultNotFond,
  isLoading,
  handleOpenModal,
}) => {
  // const [resultsFound, setResultsFound] = useState<boolean>(true);
  // const [currentPage, setCurrentPage] = useState(0);

  // const [formattedData1, setFormattedData1] = useState<IGPTResponce | null>(
  //   null
  // );
  // const [formattedData2, setFormattedData2] = useState<IGPTResponce | null>(
  //   null
  // );

  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const formattedData1 = chatGptRespons?.map((item) => {
  //     return {
  //       job_description_criteria: item.job_description_criteria,
  //       job_description_text: item.job_description_text,
  //       resume_match_for_each_criteria: item.resume_match_for_each_criteria,
  //     };
  //   });

  //   const formattedData2 = chatGptRespons?.map((item) => {
  //     return {
  //       context_based_recommendations_to_improve_match:
  //         item.context_based_recommendations_to_improve_match,
  //       context_based_resume_evaluation: item.context_based_resume_evaluation,
  //       resume_text: item.resume_text,
  //       resume_match_for_each_criteria: item.resume_match_for_each_criteria,
  //     };
  //   });

  //   setFormattedData1(formattedData1);
  //   setFormattedData2(formattedData2);

  // }, [chatGptRespons]);

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
            Job Description criteria
          </Typography>
        </Box>
      ),
      accessor: "job_description_criteria",
      width: 170,
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
            Job Description text
          </Typography>
        </Box>
      ),
      accessor: "job_description_text",
      width: 170,
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
            Context based Resume Evaluation
          </Typography>
        </Box>
      ),
      accessor: "context_based_resume_evaluation",
      width: 250,
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
            Resume % Match for each criteria
          </Typography>
        </Box>
      ),
      accessor: "resume_match_for_each_criteria",
      width: 220,
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
            Resume Text
          </Typography>
        </Box>
      ),
      accessor: "resume_text",
      width: 120,
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
            Context based Recommendations to improve match
          </Typography>
        </Box>
      ),
      accessor: "context_based_recommendations_to_improve_match",
      width: 320,
    },
  ];

  const columnsHeader: ColumnWithCustomHeader[] = [
    {
      Header: "LeftHeader",
      width: 432,
      customHeader: (
        <Box sx={{ padding: "20px" }}>
          <Typography
            sx={{
              color: " #343a40",
              fontFamily: "Poppins",
              fontSize: "16px;",
              fontWeight: "600",
              lineHeight: "26px",
            }}
          >
            Ace My Interview Recommendations
          </Typography>
        </Box>
      ),
    },
    {
      Header: "RightHeader",
      width: 166,
      customHeader: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "20px",
          }}
        >
          {chatGptRespons?.length && (
            <Button
              variant="contained"
              startIcon={
                <SaveAltIcon sx={{ height: "14px" }} className={styles.img} />
              }
              onClick={() => handleOpenModal()}
              sx={{
                backgroundColor: "#5A3AB6",
                height: "20px",
                fontSize: "10px",
                textTransform: "capitalize",
                borderRadius: "25px",
                fontWeight: "400",
                "&:hover": {
                  backgroundColor: "#5A3AB6",
                },
              }}
            >
              Save Insights
            </Button>
          )}
        </Box>
      ),
    },
  ];

  //   const indexOfLastCV = (currentPage + 1) * cvPerPage;
  //   const indexOfFirstCV = indexOfLastCV - cvPerPage;
  //   const currentCVs = filteredCVs?.slice(indexOfFirstCV, indexOfLastCV);

  return (
    <Box>
      <TableHeader columns={columnsHeader} />
      {chatGptRespons && chatGptRespons.length > 0 && (
        <TableComponent
          resultsFound={resultNotFond}
          columns={columns}
          data={chatGptRespons}
          isLoading={isLoading}
        />
      )}

      {/* <Box sx={{ marginTop: "12px", marginBottom: "12px" }}>
        <ReactPaginate
          pageCount={Math.ceil(filteredCVs?.length / cvPerPage)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          initialPage={currentPage}
          containerClassName={styles.pagination}
          activeClassName={styles.activePage}
          previousLabel={
            <button className={styles.pagination__prev}>
              <LeftIcon className={styles.paginationImg} />
              Prev
            </button>
          }
          nextLabel={
            <button className={styles.pagination__prev}>
              Next
              <RightIcon className={styles.paginationImg} />
            </button>
          }
        />
      </Box> */}
    </Box>
  );
};

export default MainPageTable;
