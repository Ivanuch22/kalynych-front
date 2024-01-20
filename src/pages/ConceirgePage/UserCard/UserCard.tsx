import React from "react";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";

import AdjustIcon from "@mui/icons-material/Adjust";
import TaskIcon from "@mui/icons-material/Task";

import { Box, Typography } from "@mui/material";
import { useConcierg } from "@/context/Concierg";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 31,
  height: 14,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 10,
    height: 10,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

interface IUserCard {
  name: string;
  currentId: number | null;
  setCurrentCardId?: (id: number | null) => void;
  id: number;
  setTable: (value: number) => void;
  setUserName: (name: string) => void;
}

const UserCard: React.FC<IUserCard> = ({
  name,
  currentId,
  id,
  setUserName,
  setTable,
}) => {
  const { handleSetUserId } = useConcierg();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        borderRadius: "2px",
        boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
        padding: "12px",
        width: "260px",
      }}
    >
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "0",
            boxSizing: "border-box",
            borderRadius: "40px",
            backgroundColor: currentId === id ? "#38813b" : "#ccc",
            width: "122px",
          }}
        >
          <FormControlLabel
            sx={{
              color: "#fff",
              userSelect: "none",
              marginLeft: "8px",
              "& .MuiFormControlLabel-label": {
                fontSize: "12px",
              },
            }}
            control={
              <IOSSwitch
                sx={{ m: 1 }}
                checked={currentId === id}
                onChange={() => {
                  if (currentId === id) {
                    handleSetUserId(null);
                    setTable(0);
                  } else {
                    handleSetUserId(id);
                    setUserName(name);
                    setTable(0);
                  }
                }}
              />
            }
            label={currentId === id ? "Current" : "Select"}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "14px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AdjustIcon sx={{ fill: "#5A3AB6" }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              width: "86px",
              height: "28px",
              padding: "0px 8px",
              border: "0",
              boxSizing: "border-box",
              borderRadius: "25px",
              boxShadow: "0px 0px 10px rgba(3,3,3,0.1)",
              backgroundColor: "#ffffff",
              color: "#000000",
              fontSize: "12px",
              fontFamily: "Roboto",
              lineHeight: "16px",
              outline: "none",
            }}
          >
            30 Jobs
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TaskIcon sx={{ fill: "#5A3AB6" }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              width: "86px",
              height: "28px",
              padding: "0px 8px",
              border: "0",
              boxSizing: "border-box",
              borderRadius: "25px",
              boxShadow: "0px 0px 10px rgba(3,3,3,0.1)",
              backgroundColor: "#ffffff",
              color: "#000000",
              fontSize: "12px",
              fontFamily: "Roboto",
              lineHeight: "16px",
              outline: "none",
            }}
          >
            5 Jobs
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserCard;
