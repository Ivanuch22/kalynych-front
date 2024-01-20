import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";

import { Box, Button, CircularProgress, Typography } from "@mui/material";

import api from "@/services/apiService";
import routes from "@/routes";

import { useAuth } from "@/context/Auth";

import { IGetCvById, IGetJBSummary } from "@/interfaces/uploadCV.interface";
import { RoleEnums } from "@/enums";

const OneJobDescriptionPage: React.FC = () => {
  const { id } = useParams();
  const { role } = useAuth();

  const queryClient = useQueryClient();

  const jobDescQuery = async () =>
    api
      .get<IGetCvById>(`${routes.getJobDescById}${id}/`)
      .then((res) => res.data);

  const jobDescSummaryQuery = async () =>
    api
      .get<IGetJBSummary>(`${routes.getJobDescSumary}${id}/`)
      .then((res) => res.data);

  const {
    data: jobDescription,
    isLoading: jobDescriptionIsLoading,
    isFetching: jobDescriptionIsFetching,
  } = useQuery<IGetCvById>(["jobDescQuery", id], jobDescQuery);

  const handleGetSummary = async () => {
    await queryClient.fetchQuery(
      ["jobDescSummaryQuery", id],
      jobDescSummaryQuery
    );
  };

  const {
    data: jobDescSummary,
    isLoading: jobDescSummaryIsLoading,
    isFetching: jobDescSummaryIsFetching,
  } = useQuery<IGetJBSummary>(
    ["jobDescSummaryQuery", id],
    jobDescSummaryQuery,
    {
      enabled: false,
    }
  );

  if (jobDescriptionIsLoading || jobDescriptionIsFetching)
    return <CircularProgress size={100} sx={{ color: "#5A3AB6" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "1000px",
        marginBottom: "24px",
      }}
    >
      <Typography
        sx={{
          color: "#495057",
          fontFamily: "Poppins",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "20px",
        }}
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Typography>
      <Typography
        sx={{
          color: "#74788d",
          fontFamily: "Poppins",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "20px",
          marginTop: "8px",
        }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae quis
        nihil officiis amet ullam. Ipsa autem maxime vero aspernatur.
      </Typography>

      <Box
        sx={{
          display: "flex",
          marginTop: "12px",
          padding: "10px",
          flexDirection: "column",
          gap: "12px",
          borderRadius: "4px",
          background: "var(--text-color-10, #fff)",
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
              color: "#495057",
              fontFamily: "Poppins",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "20px",
              marginTop: "8px",
            }}
          >
            Name
          </Typography>
          {role === RoleEnums.User && (
            <Button
              onClick={handleGetSummary}
              sx={{
                display: "flex",
                padding: "6px 6px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "4px",
                background: "var(--text-color-60, #5A3AB6)",
                color: "var(--text-color-20, #fff)",
                fontFamily: "Poppins",
                fontSize: "10px",
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
              {jobDescSummaryIsLoading || jobDescSummaryIsFetching ? (
                <CircularProgress sx={{ color: "#FFF" }} size={10} />
              ) : (
                "Get summary"
              )}
            </Button>
          )}
        </Box>

        <Typography
          sx={{
            color: "#74788d",
            fontFamily: "Poppins",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "20px",
            marginTop: "8px",
          }}
        >
          {jobDescription?.name}
        </Typography>

        <Typography
          sx={{
            color: "#495057",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "20px",
            marginTop: "8px",
          }}
        >
          Text
        </Typography>

        <Typography
          component="pre"
          sx={{
            color: "#74788d",
            fontFamily: "Poppins",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "20px",
            marginTop: "8px",
            // overflow: "auto",
            // height: "300px",
            whiteSpace: "pre-wrap",
          }}
        >
          {jobDescription?.text?.split(" ●").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Typography>

        {jobDescSummary?.id && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                color: "#495057",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                marginTop: "8px",
              }}
            >
              Status
            </Typography>

            <Typography
              sx={{
                color: "#74788d",
                fontFamily: "Poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                marginTop: "8px",
              }}
            >
              {jobDescSummary?.status}
            </Typography>

            <Typography
              sx={{
                color: "#495057",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                marginTop: "8px",
              }}
            >
              Employer name
            </Typography>

            <Typography
              sx={{
                color: "#74788d",
                fontFamily: "Poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                marginTop: "8px",
              }}
            >
              {jobDescSummary?.employer_name}
            </Typography>

            <Typography
              sx={{
                color: "#495057",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                marginTop: "8px",
              }}
            >
              Job title
            </Typography>

            <Typography
              sx={{
                color: "#74788d",
                fontFamily: "Poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                marginTop: "8px",
              }}
            >
              {jobDescSummary?.job_title}
            </Typography>

            <Typography
              sx={{
                color: "#495057",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                marginTop: "8px",
              }}
            >
              Location
            </Typography>

            <Typography
              sx={{
                color: "#74788d",
                fontFamily: "Poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                marginTop: "8px",
              }}
            >
              {jobDescSummary?.location}
            </Typography>

            <Typography
              sx={{
                color: "#495057",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                marginTop: "8px",
              }}
            >
              Job overview
            </Typography>

            <Typography
              sx={{
                color: "#74788d",
                fontFamily: "Poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                marginTop: "8px",
              }}
            >
              {jobDescSummary?.job_overview}
            </Typography>

            <Typography
              sx={{
                color: "#495057",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                marginTop: "8px",
              }}
            >
              Responsibilities
            </Typography>

            <Typography
              sx={{
                color: "#74788d",
                fontFamily: "Poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                marginTop: "8px",
              }}
            >
              {jobDescSummary?.responsibilities}
            </Typography>

            <Typography
              sx={{
                color: "#495057",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                marginTop: "8px",
              }}
            >
              Qualification
            </Typography>

            <Typography
              sx={{
                color: "#74788d",
                fontFamily: "Poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                marginTop: "8px",
              }}
            >
              {jobDescSummary?.qualification &&
                jobDescSummary.qualification
                  .replace("[", "")
                  .replace("]", "")
                  .split(", ")
                  .map((item, index) => (
                    <React.Fragment key={index}>
                      {item.replace(/'/g, "")}
                      <br />
                    </React.Fragment>
                  ))}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OneJobDescriptionPage;
