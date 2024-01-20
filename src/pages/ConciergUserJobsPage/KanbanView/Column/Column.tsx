import React from "react";

import { Box, Typography } from "@mui/material";

import { Droppable } from "react-beautiful-dnd";
// import { JobItem } from "../../JobsItem";
import Item from "../Item/Item";

interface ICVs {
  id: number;
  name: string;
  text: string;
  created: string;
  user_id: number;
  status: string | null;
  employer_name: string;
  location: string;
  matching: string;
  gpt_best_cv: string;
  job_overview: string;
  responsibilities: string;
}

interface IColumn {
  title: string;
  jd: ICVs[];
  id: string;
}

const Column: React.FC<IColumn> = ({ title, jd, id }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        marginBottom: "24px",
        backgroundColor: "#ffffff",
        borderRadius: "2px",
        boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
        padding: "32px",
      }}
    >
      <Typography
        sx={{
          color: "#030303",
          fontSize: "24px",
          fontFamily: "Roboto",
          lineHeight: "34px",
        }}
      >
        {title}
      </Typography>
      <Droppable droppableId={id}>
        {(provided) => {
          return (
            <div
              style={{
                height: "600px",
                overflow: "auto",
              }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {jd.map((el) => (
                // @ts-ignore
                <Item
                  isColumn={true}
                  name={el.name}
                  employerName={el.employer_name}
                  data={el.created}
                  location={el.location}
                  match={el.matching}
                  gpt_best_cv={el.gpt_best_cv}
                  id={el.id}
                />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </Box>
  );
};

export default Column;
