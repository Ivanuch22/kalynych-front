import React, { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import styles from "./CheckList.module.css";

import SaveIcon from "@mui/icons-material/Save";
import WorkIcon from "@mui/icons-material/Work";

const CheckList: React.FC = () => {
  const [reviewClientProfile, setReviewClientProfile] = useState<string>("");
  const [createSharedEmail, setCreateSharedEmail] = useState<string>("");
  const [createTailored, setCreateTailored] = useState<string>("");
  const [addJobToClient, setAddJobToClient] = useState<string>("");
  const [sharedEmail, setSharedEmail] = useState<string>("");

  const handleChangeReviewClientProfile = (event: SelectChangeEvent) => {
    setReviewClientProfile(event.target.value as string);
  };

  const handleChangeCreateSharedEmail = (event: SelectChangeEvent) => {
    setCreateSharedEmail(event.target.value as string);
  };

  const handleChangeCreateTailored = (event: SelectChangeEvent) => {
    setCreateTailored(event.target.value as string);
  };

  const handleChangeAddJobToClient = (event: SelectChangeEvent) => {
    setAddJobToClient(event.target.value as string);
  };

  const handleChangeSharedEmail = (event: SelectChangeEvent) => {
    setSharedEmail(event.target.value as string);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "666px",
        boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
        borderRadius: "2px",
        paddingTop: "38px",
        paddingBottom: "38px",
        alignItems: "flex-start",
        marginBottom: "24px",
        padding: "12px",
      }}
    >
      <Typography
        sx={{
          color: "#000000",
          fontSize: "24px",
          fontFamily: "Roboto",
          fontWeight: 400,
          lineHeight: "28px",
          textAlign: "start",
        }}
      >
        To do list for client setup
      </Typography>
      <form className={styles.formStyles}>
        <Box
          sx={{
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                color: "#fff",
                background: "#5A3AB6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "34px",
                width: "34px",
                height: "29px",
                borderRadius: "5px",
              }}
            >
              1
            </Box>
            <Typography
              sx={{
                color: "#030303",
                fontSize: "14px",
                fontFamily: "Poppins",
                lineHeight: "18px",
                marginLeft: "12px",
              }}
            >
              Review Clients Profile
            </Typography>
          </Box>
          <FormControl sx={{ width: "120px" }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={reviewClientProfile}
              label="Status"
              onChange={handleChangeReviewClientProfile}
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#5A3AB6",
                },
              }}
            >
              <MenuItem value={"true"}>True</MenuItem>
              <MenuItem value={"false"}>False</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                color: "#fff",
                background: "#5A3AB6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "34px",
                width: "34px",
                height: "29px",
                borderRadius: "5px",
              }}
            >
              2
            </Box>
            <Typography
              sx={{
                color: "#030303",
                fontSize: "14px",
                fontFamily: "Poppins",
                lineHeight: "18px",
                marginLeft: "12px",
              }}
            >
              Create shared email account in gmail
            </Typography>
          </Box>
          <FormControl sx={{ width: "120px" }}>
            <InputLabel id="demo-simple-select-label-1">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label-1"
              id="demo-simple-select-1"
              value={createSharedEmail}
              label="Status"
              onChange={handleChangeCreateSharedEmail}
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#5A3AB6",
                },
              }}
            >
              <MenuItem value={"true"}>True</MenuItem>
              <MenuItem value={"false"}>False</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                color: "#fff",
                background: "#5A3AB6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "34px",
                width: "34px",
                height: "29px",
                borderRadius: "5px",
              }}
            >
              3
            </Box>
            <Typography
              sx={{
                color: "#030303",
                fontSize: "14px",
                fontFamily: "Poppins",
                lineHeight: "18px",
                marginLeft: "12px",
              }}
            >
              Create tailored Job feeds
            </Typography>
          </Box>
          <FormControl sx={{ width: "120px" }}>
            <InputLabel id="demo-simple-select-label-2">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label-2"
              id="demo-simple-select-2"
              value={createTailored}
              label="Status"
              onChange={handleChangeCreateTailored}
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#5A3AB6",
                },
              }}
            >
              <MenuItem value={"true"}>True</MenuItem>
              <MenuItem value={"false"}>False</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                color: "#fff",
                background: "#5A3AB6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "34px",
                width: "34px",
                height: "29px",
                borderRadius: "5px",
              }}
            >
              4
            </Box>
            <Typography
              sx={{
                color: "#030303",
                fontSize: "14px",
                fontFamily: "Poppins",
                lineHeight: "18px",
                marginLeft: "12px",
              }}
            >
              Add jobs to your clients target list
            </Typography>
          </Box>
          <FormControl sx={{ width: "120px" }}>
            <InputLabel id="demo-simple-select-label-3">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label-3"
              id="demo-simple-select-3"
              value={addJobToClient}
              label="Status"
              onChange={handleChangeAddJobToClient}
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#5A3AB6",
                },
              }}
            >
              <MenuItem value={"true"}>True</MenuItem>
              <MenuItem value={"false"}>False</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                color: "#fff",
                background: "#5A3AB6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "34px",
                width: "34px",
                height: "29px",
                borderRadius: "5px",
              }}
            >
              5
            </Box>
            <Typography
              sx={{
                color: "#030303",
                fontSize: "14px",
                fontFamily: "Poppins",
                lineHeight: "18px",
                marginLeft: "12px",
              }}
            >
              Shared email account login information
            </Typography>
          </Box>
          <FormControl sx={{ width: "120px" }}>
            <InputLabel id="demo-simple-select-label-4">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label-4"
              id="demo-simple-select-4"
              value={sharedEmail}
              label="Status"
              onChange={handleChangeSharedEmail}
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#5A3AB6",
                },
              }}
            >
              <MenuItem value={"true"}>True</MenuItem>
              <MenuItem value={"false"}>False</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}
          >
            <IconButton sx={{ marginRight: "12px" }}>
              <SaveIcon
                sx={{
                  stroke: "#fff",
                  fill: "#5A3AB6",
                  fontSize: "24px !important",
                }}
              />
            </IconButton>

            <Button
              startIcon={<WorkIcon />}
              sx={{
                display: "flex",
                padding: "12px 8px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "4px",
                background: "var(--text-color-60, #5A3AB6)",
                color: "var(--text-color-20, #fff)",
                fontFamily: "Poppins",
                fontSize: "12px",
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
              Go To Target List
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CheckList;
