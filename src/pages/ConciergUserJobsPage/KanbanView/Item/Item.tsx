import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import { Box, Typography } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import TimerIcon from "@mui/icons-material/Timer";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { JobDescModal } from "./Modal";

interface IJD {
  name: string;
  employerName: string;
  data: string;
  location: string;
  match: string;
  gpt_best_cv: string;
  // @ts-ignore
  jdID: string;
  id: number;
  isColumn: boolean;
}

const Item: React.FC<IJD> = ({
  name,
  id,
  employerName,
  data,
  location,
  isColumn,
  match,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Draggable draggableId={id.toString()} key={id} index={0}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={isColumn ? handleOpenModal : undefined}
          >
            <Box
              sx={{
                overflow: "auto",
                height: "148px",
                width: "280px",
                backgroundColor: "#ffffff",
                borderRadius: "2px",
                boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
                margin: "12px auto",
                display: "flex",
                flexDirection: "column",
                padding: "8px",
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
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

              <Box
                sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}
              >
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
                        +match < 50
                          ? "#e5b3b3"
                          : +match < 70
                          ? "#ffeeaa"
                          : "#38813b",
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
          </div>
        )}
      </Draggable>
      <JobDescModal
        openModal={openModal}
        closeModal={handleCloseModal}
        name={name}
        employerName={employerName}
        data={data}
        location={location}
        match={match}
        id={id}
      />
    </>
  );
};

export default Item;
