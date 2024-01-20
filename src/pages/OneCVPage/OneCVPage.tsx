import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { Box, CircularProgress, Typography } from "@mui/material";

import api from "@/services/apiService";

import routes from "@/routes";

import { IGetCvById } from "@/interfaces/uploadCV.interface";

const OneCVPage: React.FC = () => {
  const { id } = useParams();

  const cvQuery = async () =>
    api.get<IGetCvById>(`${routes.getCvById}${id}/`).then((res) => res.data);

  const {
    data: cv,
    isLoading,
    isFetching,
  } = useQuery<IGetCvById>(["getUserQuery", id], cvQuery);

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "500px",
        marginLeft: "12px",
      }}
    >
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
          {cv?.name}
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
            overflow: "auto",
            height: "300px",
          }}
        >
          {cv?.text?.split(" ●").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </Box>
    </Box>
  );
};

export default OneCVPage;
