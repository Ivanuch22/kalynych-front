import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useQuery } from "react-query";

import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";

import { Box, Chip, CircularProgress, Typography } from "@mui/material";

import { usePage } from "@/context/PageNaming";
import { useConcierg } from "@/context/Concierg";

import api from "@/services/apiService";
import routes from "@/routes";

import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import { localStorageManager } from "@/services";

interface IForm {
  type: "Today" | "This Week" | "This Month";
}

interface ObjectData {
  id: number;
  day_applies: number;
  week_applies: number;
  month_applies: number;
  day_update: string;
  week_update: string;
  month_update: string;
  concierge: number;
  user: number;
}

interface ObjectItem {
  user_name: string;
  object_data: ObjectData;
  balance: number;
}

interface Target {
  day_target: number;
  week_target: number;
  month_target: number;
}

interface UpdatedData {
  objects: ObjectItem[];
  targets: Target;
}

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

const ConciergDashBoard: React.FC = () => {
  const { setPageName } = usePage();
  const { userId, handleSetUserName, handleSetUserId } = useConcierg();

  const [currentUserID, setCurrentUserID] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<IForm>({ type: "Today" });
  const [remainingDayTargets, setRemainingDayTargets] = useState<number | null>(
    null
  );
  const [remainingWeekTargets, setRemainingWeekTargets] = useState<
    number | null
  >(null);
  const [remainingMonthTargets, setRemainingMonthTargets] = useState<
    number | null
  >(null);

  const getAllConceirgeQuery = async () =>
    api
      .get<UpdatedData>(`${routes.getConciergDashBoard}${currentUserID}/`)
      .then((res) => res.data);

  const { data, isLoading, isFetching, refetch } = useQuery<UpdatedData>(
    ["getAllConceirgeQuery", currentUserID],
    getAllConceirgeQuery,
    { enabled: false }
  );

  const filteredObjects = useMemo(() => data?.objects ?? [], [data?.objects]);

  useEffect(() => {
    if (data?.targets && filteredObjects.length > 0) {
      const sum = filteredObjects.reduce((accumulator, el) => {
        const calculatedValue =
          data.targets.day_target - el.object_data.day_applies;
        return accumulator + calculatedValue;
      }, 0);

      const sumWeek = filteredObjects.reduce((accumulator, el) => {
        const calculatedValue =
          data.targets.week_target - el.object_data.week_applies;
        return accumulator + calculatedValue;
      }, 0);

      const sumMonth = filteredObjects.reduce((accumulator, el) => {
        const calculatedValue =
          data.targets.month_target - el.object_data.month_applies;
        return accumulator + calculatedValue;
      }, 0);

      setRemainingDayTargets(sum);
      setRemainingWeekTargets(sumWeek);
      setRemainingMonthTargets(sumMonth);
    }
  }, [data?.targets, filteredObjects]);

  const sumReducer = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;

  const totalDayApplies = useReducer(sumReducer, 0);

  const filteredValues = useMemo(
    () => data?.targets ?? ({} as Target),
    [data?.targets]
  );

  useEffect(() => {
    const currentUserId = localStorageManager.getUser();
    if (currentUserId?.id) {
      setCurrentUserID(currentUserId?.id);
    }
    setPageName("Concierge | My Dashboard");
  }, []);

  useEffect(() => {
    currentUserID && refetch();
  }, [currentUserID]);

  if (isLoading || isFetching)
    return (
      <CircularProgress
        sx={{
          color: "#5A3AB6",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        size={14}
      />
    );

  return (
    <Box
      sx={{
        paddingLeft: "12px",
        marginTop: "24px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
        <Chip
          label="Today"
          variant="outlined"
          sx={
            sortOption.type === "Today"
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
          onClick={() => setSortOption({ type: "Today" })}
        />

        <Chip
          label="This Week"
          variant="outlined"
          sx={
            sortOption.type === "This Week"
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
          onClick={() => setSortOption({ type: "This Week" })}
        />

        <Chip
          label="This Month"
          variant="outlined"
          sx={
            sortOption.type === "This Month"
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
          onClick={() => setSortOption({ type: "This Month" })}
        />

        <Box
          sx={{ display: "flex", alignItems: "center", marginLeft: "173px" }}
        >
          <Typography>User Balance</Typography>
          <Typography sx={{ padding: "30px 55px" }}>Target Jobs</Typography>
          <Typography sx={{ padding: "30px 60px" }}>Applied</Typography>
          <Typography sx={{ padding: "30px 76px" }}>Remains</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "24px",
          height: "106px",
          width: "1171px",
          backgroundColor: "#ffffff",
          borderRadius: "2px",
          boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "24px",
            paddingRight: "24px",
            width: "268px",
          }}
        >
          <PeopleIcon sx={{ fill: "#5A3AB6", userSelect: "none" }} />
          <Typography
            sx={{
              color: "#5A3AB6",
              fontSize: "16px",
              fontFamily: "Roboto",
              lineHeight: "20px",
              marginLeft: "8px",
              userSelect: "none",
            }}
          >
            All Clients
          </Typography>
        </Box>

        <Box
          sx={{ display: "flex", alignItems: "center", marginLeft: "280px" }}
        >
          <Box
            sx={{
              padding: "30px 85px",
              borderRight: "4px solid #c2c2c2",
              display: "flex",
              justifyContent: "center",
              userSelect: "none",
            }}
          >
            <Typography
              sx={{
                height: "30px",
                width: "30px",
                backgroundColor: "#5A3AB6",
                borderRadius: "50%",
                color: "#fff",
                display: "flex",
                padding: "4px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {sortOption.type === "Today" &&
                filteredObjects.length * filteredValues.day_target}
              {sortOption.type === "This Week" &&
                filteredObjects.length * filteredValues.week_target}
              {sortOption.type === "This Month" &&
                filteredObjects.length * filteredValues.month_target}
            </Typography>
          </Box>

          <Box
            sx={{
              padding: "30px 76px",
              borderRight: "4px solid #c2c2c2",
              display: "flex",
              justifyContent: "center",
              userSelect: "none",
            }}
          >
            <Typography
              sx={{
                height: "30px",
                width: "30px",
                backgroundColor: "#5A3AB6",
                borderRadius: "50%",
                padding: "4px",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {totalDayApplies[0]}
            </Typography>
          </Box>

          <Box
            sx={{
              padding: "30px 76px",
              display: "flex",
              justifyContent: "center",
              userSelect: "none",
            }}
          >
            <Typography
              sx={{
                height: "30px",
                width: "30px",
                backgroundColor: "#5A3AB6",
                borderRadius: "50%",
                color: "#fff",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {sortOption.type === "Today" && remainingDayTargets}
              {sortOption.type === "This Week" && remainingWeekTargets}
              {sortOption.type === "This Month" && remainingMonthTargets}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", marginTop: "76px" }}>
        <PersonIcon sx={{ fill: "#5A3AB6" }} />
        <Typography
          sx={{
            color: "#5A3AB6",
            fontSize: "16px",
            fontFamily: "Roboto",
            lineHeight: "20px",
            marginLeft: "8px",
          }}
        >
          By Client
        </Typography>
      </Box>

      {filteredObjects.map((el: ObjectItem) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "24px",
            height: "106px",
            width: "1171px",
            backgroundColor: "#ffffff",
            borderRadius: "2px",
            boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
          }}
        >
          <Chip
            label={el.user_name}
            sx={{
              marginLeft: "24px",
              marginRight: "24px",
              backgroundColor: "#5A3AB6",
              color: "#fff",
              width: "128px",
            }}
          />

          <Box sx={{ width: "200px" }}>
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
                  checked={userId === el?.object_data?.user}
                  onChange={() => {
                    if (userId === el?.object_data?.user) {
                      handleSetUserId(null);
                    } else {
                      handleSetUserId(el?.object_data?.user);
                      handleSetUserName(el?.user_name);
                    }
                  }}
                />
              }
              label={userId === el?.object_data?.user ? "Current" : "Select"}
            />
          </Box>

          <Box
            sx={{
              marginLeft: "259px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography>{el.balance}</Typography>
            <Box
              sx={{
                padding: "30px 76px",
                borderRight: "4px solid #c2c2c2",
                display: "flex",
                justifyContent: "center",
                userSelect: "none",
              }}
            >
              <Typography
                sx={{
                  height: "30px",
                  width: "30px",
                  backgroundColor: "#5A3AB6",
                  borderRadius: "50%",
                  padding: "4px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {sortOption.type === "Today" && filteredValues.day_target}
                {sortOption.type === "This Week" && filteredValues.week_target}
                {sortOption.type === "This Month" &&
                  filteredValues.month_target}
              </Typography>
            </Box>

            <Box
              sx={{
                padding: "30px 85px",
                borderRight: "4px solid #c2c2c2",
                display: "flex",
                justifyContent: "center",
                userSelect: "none",
              }}
            >
              <Typography
                sx={{
                  height: "30px",
                  width: "30px",
                  backgroundColor: "#5A3AB6",
                  borderRadius: "50%",
                  color: "#fff",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {el.object_data.day_applies}
              </Typography>
            </Box>

            <Box
              sx={{
                padding: "30px 76px",
                display: "flex",
                justifyContent: "center",
                userSelect: "none",
              }}
            >
              {data?.targets.day_target && (
                <Typography
                  sx={{
                    height: "30px",
                    width: "30px",
                    backgroundColor: "#5A3AB6",
                    borderRadius: "50%",
                    color: "#fff",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {sortOption.type === "Today" &&
                    filteredValues.day_target - el.object_data.day_applies}
                  {sortOption.type === "This Week" &&
                    filteredValues.week_target - el.object_data.week_applies}
                  {sortOption.type === "This Month" &&
                    filteredValues.month_target - el.object_data.month_applies}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ConciergDashBoard;
