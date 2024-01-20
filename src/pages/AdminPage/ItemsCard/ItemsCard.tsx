import React from "react";
import { format } from "date-fns";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";

import ModeIcon from "@mui/icons-material/Mode";

interface IPrompt {
  prompt_text: string;
  id: number;
  option: string;
  created_at: string;
  onSetId: () => void;
  current?: boolean;
  openEditModal: (id: number) => void;
}

const ItemsCard: React.FC<IPrompt> = ({
  prompt_text,
  option,
  created_at,
  onSetId,
  current,
  openEditModal,
  id,
}) => {
  return (
    <Card sx={{ marginTop: "12px", maxHeight: "238px" }}>
      <CardActionArea>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "200px",
              background: "var(--text-color-10, #FFF)",
              borderRadius: "4px",
              padding: "10px 12px",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
              onClick={onSetId}
            >
              <Typography
                sx={{
                  color: "var(--text-color-60, #495057)",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "16px",
                  textTransform: "capitalize",
                  textDecoration: "underline",
                }}
              >
                {option}
              </Typography>

              {current && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "66px",
                    height: "26px",
                    padding: "0px 8px",
                    border: "0",
                    boxSizing: "border-box",
                    borderRadius: "25px",
                    boxShadow: "0px 0px 10px rgba(3,3,3,0.1)",
                    backgroundColor: "#ffeeaa",
                    color: "#000000",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                    lineHeight: "16px",
                    outline: "none",
                    userSelect: "none",
                  }}
                >
                  Current
                </Box>
              )}
            </Box>

            <Typography
              sx={{
                color: "var(--text-color-60, #495057)",
                fontFamily: "Poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "16px",
                textTransform: "capitalize",
                marginTop: "12px",
              }}
            >
              {prompt_text?.length > 220
                ? prompt_text?.substring(0, 220) + "..."
                : prompt_text}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  color: "var(--text-color-60, #495057)",
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "16px",
                  textTransform: "capitalize",
                  marginTop: "12px",
                }}
              >
                {created_at && format(new Date(created_at), "dd.MM.yyyy")}
              </Typography>

              <IconButton onClick={() => openEditModal(id)} size="small">
                <ModeIcon sx={{ fontSize: "16px" }} />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemsCard;
