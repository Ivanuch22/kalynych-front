import React, { useEffect } from "react";
import { useQuery } from "react-query";

import { Box, CircularProgress, Typography } from "@mui/material";

import api from "@/services/apiService";
import routes from "@/routes";

import SearchIcon from "@mui/icons-material/Search";
import TimerIcon from "@mui/icons-material/Timer";
import WhatshotIcon from "@mui/icons-material/Whatshot";

interface IJD {
  name: string;
  employerName: string;
  data: string;
  location: string;
  match: string;
  gpt_best_cv: string;
  setJdID: (id: number) => void;
  jdID: number | null;
  id: number;
}

const JobsItem: React.FC<IJD> = ({
  name,
  employerName,
  data,
  gpt_best_cv,
  location,
  match,
  setJdID,
  jdID,
  id,
}) => {
  const getCVByIdQuery = async () =>
    api.get<IJD>(`${routes.getCvById}${gpt_best_cv}/`).then((res) => res.data);

  const {
    data: getCVById,
    isLoading: cvLoading,
    refetch: getCVByIdRefetch,
  } = useQuery<IJD>(["getCVByIdQuery", gpt_best_cv], getCVByIdQuery);

  useEffect(() => {
    gpt_best_cv && getCVByIdRefetch;
  }, [gpt_best_cv]);

  function calculateDateXDaysAgo(dateString: string) {
    const date = new Date(dateString);
    const currentDate = new Date();
    // @ts-ignore
    const difference = currentDate - date;
    const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));

    return daysAgo;
  }

  function extractNumericValue(inputString: string) {
    const numericValue = inputString.replace(/\D/g, "");
    const intValue = parseInt(numericValue, 10);

    return intValue;
  }

  if (cvLoading)
    return <CircularProgress sx={{ color: "#5A3AB6" }} size={50} />;

  return (
    <Box
      onClick={() => setJdID(id)}
      sx={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        borderRadius: "2px",
        boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
        padding: "8px",
        cursor: "pointer",
        border: jdID === id ? "1px solid #6741d9" : "1px solid #ffffff",
      }}
    >
      <Typography
        sx={{
          color: "#030303",
          fontSize: "18px",
          fontFamily: "Roboto",
          fontWeight: 800,
          lineHeight: "24px",
        }}
      >
        {name}
      </Typography>

      {employerName && (
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
          <SearchIcon sx={{ fontSize: "14px" }} />
          <Typography
            sx={{
              color: "#030303",
              fontSize: "14px",
              fontFamily: "Roboto",
              lineHeight: "20px",
            }}
          >
            {employerName}
          </Typography>
        </Box>
      )}

      <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
        <TimerIcon sx={{ fontSize: "14px" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "#030303",
            fontSize: "14px",
            fontFamily: "Roboto",
            lineHeight: "20px",
            padding: "4px 8px",
            border: "0",
            boxSizing: "border-box",
            borderRadius: "25px",
            boxShadow: "0px 0px 10px rgba(3,3,3,0.1)",
            backgroundColor: "#ffffff",
            outline: "none",
          }}
        >
          {calculateDateXDaysAgo(data)} days ago
        </Box>

        {getCVById?.name && (
          <Box
            sx={{
              color: "#030303",
              fontSize: "14px",
              fontFamily: "Roboto",
              lineHeight: "20px",
              padding: "4px 8px",
              border: "0",
              boxSizing: "border-box",
              borderRadius: "25px",
              boxShadow: "0px 0px 10px rgba(3,3,3,0.1)",
              backgroundColor: "#ffffff",
              outline: "none",
              marginLeft: "4px",
            }}
          >
            {getCVById?.name}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "8px",
        }}
      >
        {location && (
          <Box
            sx={{
              color: "#030303",
              fontSize: "14px",
              fontFamily: "Roboto",
              lineHeight: "20px",
              padding: "4px 8px",
              border: "0",
              boxSizing: "border-box",
              borderRadius: "25px",
              boxShadow: "0px 0px 10px rgba(3,3,3,0.1)",
              backgroundColor: "#ffffff",
              outline: "none",
            }}
          >
            {location}
          </Box>
        )}

        {match && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "0",
              boxSizing: "border-box",
              borderRadius: "40px",
              backgroundColor:
                +match < 50 ? "#e5b3b3" : +match < 70 ? "#ffeeaa" : "#38813b",
              color: "#000000",
              fontSize: "12px",
              fontFamily: "Roboto",
              lineHeight: "16px",
              outline: "none",
              padding: "4px 8px",
              //   marginBottom: "8px",
            }}
          >
            <WhatshotIcon sx={{ fontSize: "14px" }} />
            {extractNumericValue(match)}% Match
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default JobsItem;
