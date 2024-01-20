import React from "react";
import { alpha, styled } from "@mui/material/styles";

import { Box, Button, Switch, Typography } from "@mui/material";
import { MainPageTable, TableComponent } from "@/components";



const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#aa93f3",
    "&:hover": {
      backgroundColor: alpha("#aa93f3", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#aa93f3",
  },
}));

interface IGPTResponce {
  context_based_recommendations_to_improve_match?: string;
  context_based_resume_evaluation?: string;
  job_description_criteria?: string;
  job_description_text?: string;
  resume_match_for_each_criteria?: string;
  resume_text?: string;
}

interface IJobCriteriaMatch {
  chatGptRespons: IGPTResponce[] | null;
  resultNotFond: boolean;
  isLoading: boolean;
  // handleRegenerateResponce: () => void;
}

const JobCriteriaMatch: React.FC<IJobCriteriaMatch> = ({
  chatGptRespons,
  resultNotFond,
  isLoading,
  // handleRegenerateResponce,
}) => {
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
            Criteria
          </Typography>
        </Box>
      ),
      accessor: "job_description_criteria",
      width: 270,
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
      width: 300,
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
  ];
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "#aa93f3",
            fontSize: "14px",
            fontFamily: "DM Sans",
            fontWeight: 700,
            lineHeight: "16px",
          }}
        >
          Details
        </Typography>
      </Box>
      <Box sx={{ marginTop: "14px" }}>
        <TableComponent
          resultsFound={resultNotFond}
          columns={columns}
          // @ts-ignore
          data={chatGptRespons}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default JobCriteriaMatch;
