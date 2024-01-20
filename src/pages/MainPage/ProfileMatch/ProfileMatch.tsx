import React from "react";
import { alpha, styled } from "@mui/material/styles";

import { Box, Switch, Typography } from "@mui/material";
import { TableComponent } from "@/components";

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

interface IProfileMatch {
  chatGptRespons: IGPTResponce[] | null;
  resultNotFond: boolean;
  isLoading: boolean;
}

const ProfileMatch: React.FC<IProfileMatch> = ({
  chatGptRespons,
  resultNotFond,
  isLoading,
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
            Context based Recommendations to improve match
          </Typography>
        </Box>
      ),
      accessor: "context_based_recommendations_to_improve_match",
      width: 320,
    },
  ];

  return (
    <Box
      sx={{
        // width: "876px",
        // height: "489px",
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
          data={chatGptRespons}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default ProfileMatch;
