import React, { useEffect, useState } from "react";
import { Box, Chip, CircularProgress, Typography } from "@mui/material";

import { IInterviewQuestions } from "@/interfaces/questions.interface";

interface IQuestions {
  data: IInterviewQuestions | null;
  isLoading: boolean;
  questionsIsFetching: boolean;
}

const InterviewQuestions: React.FC<IQuestions> = ({
  data,
  isLoading,
  questionsIsFetching,
}) => {
  const [resultNotFound, setResultNotFound] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("to Expect");
  const [viewBy, setViewBy] = useState<string>("Question Type");
  const [questionTypeFilter, setQuestionTypeFilter] = useState<string>("All");
  const [interviewerFilter, setInterviewerFilter] = useState<string>("All");

  const getFilteredQuestions = () => {
    if (!data) return {};

    let filteredData = { ...data.Interview_Preparation };

    let filteredDataCultural = {
      // @ts-ignore
      ...data.Interview_Questions_Assessing_Cultural_Value,
    };

    if (sortOption === "to Expect") {
      // @ts-ignore
      filteredData = { Questions_to_Expect: filteredData.Questions_to_Expect };
    } else if (sortOption === "to Ask") {
      // @ts-ignore
      filteredData = {
        Questions_to_Ask_Interviewer: filteredData.Questions_to_Ask_Interviewer,
      };
    } else if (sortOption === "Cultural Value") {
      // @ts-ignore
      filteredData = {
        Interview_Questions_Assessing_Cultural_Value: filteredDataCultural,
      };
    }

    if (viewBy === "Question Type") {
      const newFilteredData = {};
      Object.keys(filteredData).forEach((key) => {
        // @ts-ignore
        newFilteredData[key] = {};
        // @ts-ignore
        Object.keys(filteredData[key]).forEach((interviewerKey) => {
          // @ts-ignore
          newFilteredData[key][interviewerKey] = {};
          // @ts-ignore
          Object.keys(filteredData[key][interviewerKey]).forEach(
            (questionType) => {
              if (
                questionTypeFilter === "All" ||
                questionTypeFilter === questionType
              ) {
                // @ts-ignore
                newFilteredData[key][interviewerKey][questionType] =
                  // @ts-ignore
                  filteredData[key][interviewerKey][questionType];
              }
            }
          );
        });
      });
      // @ts-ignore
      filteredData = newFilteredData;
    }

    if (interviewerFilter !== "All") {
      const interviewerKeyMap = {
        HR: "Recruiter",
        "Team Members": "Team_Members",
        "Hiring Manager": "Hiring_Manager",
      };
      // @ts-ignore
      const interviewerKey = interviewerKeyMap[interviewerFilter];
      const newFilteredData = {};
      Object.keys(filteredData).forEach((key) => {
        // @ts-ignore
        if (filteredData[key][interviewerKey]) {
          // @ts-ignore
          newFilteredData[key] = {
            // @ts-ignore
            [interviewerKey]: filteredData[key][interviewerKey],
          };
        }
      });
      // @ts-ignore
      filteredData = newFilteredData;
    }

    return filteredData;
  };

  // @ts-ignore
  const displayQuestions = (data) => {
    // @ts-ignore
    const renderQuestions = (questions) => {
      if (typeof questions === "object" && !Array.isArray(questions)) {
        questions = Object.values(questions);
      }

      return Array.isArray(questions)
        ? questions.map((question, index) => (
            <Typography key={index} sx={{ my: 1 }}>
              {question} <br />
            </Typography>
          ))
        : null;
    };

    return (
      <Box
        sx={{
          marginTop: "12px",
          mx: "auto",
          p: 2,
          backgroundColor: "#f7f5ff",
          borderRadius: "12px",
          border: "1px solid #aa93f3",
          boxSizing: "border-box",
          width: "400px",
        }}
      >
        {Object.keys(data).length ? (
          Object.keys(data).map((mainKey) => (
            <Box key={mainKey} sx={{ mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                {mainKey.replace(/_/g, " ")}
              </Typography>
              {Object.keys(data[mainKey]).map((subKey) => {
                const subData = data[mainKey][subKey];
                return (
                  <Box key={subKey} sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {subKey.replace(/From_|To_/, "").replace(/_/g, " ")}
                    </Typography>
                    <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
                      {renderQuestions(subData)}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ))
        ) : (
          <Typography>Not found</Typography>
        )}
      </Box>
    );
  };

  useEffect(() => {
    getFilteredQuestions();
  }, [sortOption, viewBy, questionTypeFilter, interviewerFilter]);

  if (isLoading || questionsIsFetching)
    return <CircularProgress sx={{ color: "#5A3AB6" }} size={50} />;

  return (
    <Box sx={{ display: "flex", alignItems: "baseline" }}>
      <Box>{displayQuestions(getFilteredQuestions())}</Box>

      <Box
        sx={{
          height: "388px",
          backgroundColor: "#ffffff",
          borderRadius: "2px",
          boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
          padding: "16px",
          marginLeft: "12px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              color: "#030303",
              fontSize: "14px",
              fontFamily: "Roboto",
              lineHeight: "18px",
            }}
          >
            Questions:
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
            <Chip
              label="to Expect"
              variant="outlined"
              sx={
                sortOption === "to Expect"
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      width: "100px",
                      textAlign: "center",
                      userSelect: "none",
                      flexWrap: "wrap",
                      color: "#ffffff",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "grey",
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
              onClick={() => setSortOption("to Expect")}
            />

            <Chip
              label="to Ask"
              variant="outlined"
              sx={
                sortOption === "to Ask"
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      width: "100px",
                      textAlign: "center",
                      userSelect: "none",
                      flexWrap: "wrap",
                      marginLeft: "8px",
                      color: "#ffffff",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "grey",
                      border: "none",
                      whiteSpace: "normal",
                      width: "100px",
                      textAlign: "center",
                      userSelect: "none",
                      marginLeft: "8px",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
              }
              onClick={() => setSortOption("to Ask")}
            />

            <Chip
              label="Cultural Value"
              variant="outlined"
              sx={
                sortOption === "Cultural Value"
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      width: "100px",
                      textAlign: "center",
                      userSelect: "none",
                      color: "#ffffff",
                      flexWrap: "wrap",
                      marginLeft: "8px",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "grey",
                      border: "none",
                      whiteSpace: "normal",
                      width: "100px",
                      textAlign: "center",
                      userSelect: "none",
                      marginLeft: "8px",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
              }
              onClick={() => setSortOption("Cultural Value")}
            />
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", marginTop: "12px" }}
        >
          <Typography
            sx={{
              color: "#030303",
              fontSize: "14px",
              fontFamily: "Roboto",
              lineHeight: "18px",
            }}
          >
            View by:
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
            <Chip
              label="Question Type"
              variant="outlined"
              sx={
                viewBy === "Question Type"
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      width: "100px",
                      color: "#ffffff",
                      textAlign: "center",
                      userSelect: "none",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "grey",
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
              onClick={() => setViewBy("Question Type")}
            />

            <Chip
              label="Culture Fit"
              variant="outlined"
              sx={
                viewBy === "Culture Fit"
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      color: "#ffffff",
                      width: "100px",
                      textAlign: "center",
                      userSelect: "none",
                      flexWrap: "wrap",
                      marginLeft: "8px",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "grey",
                      border: "none",
                      whiteSpace: "normal",
                      width: "100px",
                      textAlign: "center",
                      userSelect: "none",
                      marginLeft: "8px",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
              }
              onClick={() => setViewBy("Culture Fit")}
            />
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", marginTop: "12px" }}
        >
          <Typography
            sx={{
              color: "#030303",
              fontSize: "14px",
              fontFamily: "Roboto",
              lineHeight: "18px",
            }}
          >
            Question Type:
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "8px",
              flexWrap: "wrap",
              gap: "4px",
            }}
          >
            <Chip
              label="All"
              variant="outlined"
              sx={
                questionTypeFilter === "All"
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      color: "#ffffff",
                      width: "100px",
                      textAlign: "center",
                      userSelect: "none",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "grey",
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
              onClick={() => setQuestionTypeFilter("All")}
            />

            <Chip
              label="General"
              variant="outlined"
              sx={
                questionTypeFilter === "General"
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      width: "100px",
                      color: "#ffffff",
                      textAlign: "center",
                      userSelect: "none",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "grey",
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
              onClick={() => setQuestionTypeFilter("General")}
            />

            <Chip
              label="Competency"
              variant="outlined"
              sx={
                questionTypeFilter === "Competency"
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      width: "100px",
                      textAlign: "center",
                      color: "#ffffff",
                      userSelect: "none",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "grey",
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
              onClick={() => setQuestionTypeFilter("Competency")}
            />

            <Chip
              label="Behavioral"
              variant="outlined"
              sx={
                questionTypeFilter === "Behavioral"
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      width: "100px",
                      color: "#ffffff",
                      textAlign: "center",
                      userSelect: "none",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "grey",
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
              onClick={() => setQuestionTypeFilter("Behavioral")}
            />
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", marginTop: "12px" }}
        >
          <Typography
            sx={{
              color: "#030303",
              fontSize: "14px",
              fontFamily: "Roboto",
              lineHeight: "18px",
            }}
          >
            Interviewer:
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "8px",
              flexWrap: "wrap",
              gap: "4px",
            }}
          >
            <Chip
              label="All"
              variant="outlined"
              sx={
                interviewerFilter === "All"
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      width: "100px",
                      textAlign: "center",
                      userSelect: "none",
                      color: "#ffffff",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "grey",
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
              onClick={() => setInterviewerFilter("All")}
            />

            <Chip
              label="HR"
              variant="outlined"
              sx={
                interviewerFilter === "HR"
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      width: "100px",
                      color: "#ffffff",
                      textAlign: "center",
                      userSelect: "none",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "grey",
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
              onClick={() => setInterviewerFilter("HR")}
            />

            <Chip
              label="Team Members"
              variant="outlined"
              sx={
                interviewerFilter === "Team Members"
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      width: "100px",
                      textAlign: "center",
                      userSelect: "none",
                      color: "#ffffff",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "grey",
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
              onClick={() => setInterviewerFilter("Team Members")}
            />

            <Chip
              label="Hiring Manager"
              variant="outlined"
              sx={
                interviewerFilter === "Hiring Manager"
                  ? {
                      background: "#5A3AB6",
                      border: "none",
                      whiteSpace: "normal",
                      width: "100px",
                      color: "#ffffff",
                      textAlign: "center",
                      userSelect: "none",
                      flexWrap: "wrap",
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                      },
                    }
                  : {
                      background: "grey",
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
              onClick={() => setInterviewerFilter("Hiring Manager")}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewQuestions;
