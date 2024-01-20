import React from "react";

import { Box, TextField, Typography } from "@mui/material";

import { IUser } from "@/interfaces/user.interfaces";

import styles from "./JQForm.module.css";

import TransgenderIcon from "@mui/icons-material/Transgender";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AccessibleIcon from "@mui/icons-material/Accessible";
import SavedIcon from "@/assets/userDetails/saved";
import LocationIcon from "@/assets/userDetails/location";
import VisaMemberIcon from "@/assets/userDetails/visaMember";

interface IJobQuestionareForm {
  user: IUser | null;
}

const JobQuestionnaire: React.FC<IJobQuestionareForm> = ({ user }) => {
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
        alignItems: "center",
        marginBottom: "24px",
      }}
    >
      <Typography
        sx={{
          color: "#000000",
          fontSize: "24px",
          fontFamily: "Roboto",
          fontWeight: 400,
          lineHeight: "28px",
        }}
      >
        Job Profile
      </Typography>
      <form className={styles.formStyles}>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TransgenderIcon sx={{ display: "flex" }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "8px",
                }}
              >
                <TextField
                  defaultValue={user?.sex || ""}
                  disabled
                  sx={{
                    // width: "307px",
                    height: "40px",
                    "& label": {
                      top: "-6px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  label="Female"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}
            >
              <AccountCircleIcon sx={{ display: "flex" }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "8px",
                }}
              >
                <TextField
                  defaultValue={user?.sex_orientation || ""}
                  disabled
                  sx={{
                    // width: "307px",
                    height: "40px",
                    "& label": {
                      top: "-6px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  label="Sexual Orientation"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}
            >
              <AccountCircleIcon sx={{ display: "flex" }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "8px",
                }}
              >
                <TextField
                  defaultValue={user?.latino || ""}
                  disabled
                  sx={{
                    // width: "307px",
                    height: "40px",
                    "& label": {
                      top: "-6px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  label="Are you Hispanic or Latino?"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}
            >
              <MilitaryTechIcon sx={{ display: "flex" }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "8px",
                }}
              >
                <TextField
                  defaultValue={user?.veteran || ""}
                  disabled
                  sx={{
                    // width: "307px",
                    height: "40px",
                    "& label": {
                      top: "-6px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  label="Not a Veteran"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}
            >
              <AccessibleIcon sx={{ display: "flex" }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "8px",
                }}
              >
                <TextField
                  disabled
                  defaultValue={user?.disability || ""}
                  sx={{
                    // width: "307px",
                    height: "40px",
                    "& label": {
                      top: "-6px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  label="Disability Status"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "100px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "8px",
                }}
              >
                <TextField
                  defaultValue={user?.authorized_to_work || ""}
                  disabled
                  sx={{
                    // width: "307px",
                    height: "40px",
                    "& label": {
                      top: "-6px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  label="Authorized to work in the USA"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}
            >
              <VisaMemberIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "8px",
                }}
              >
                <TextField
                  defaultValue={user?.visa || ""}
                  disabled
                  sx={{
                    // width: "307px",
                    height: "40px",
                    "& label": {
                      top: "-6px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  label="Visa Sponsorship Required"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}
            >
              <SavedIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "8px",
                }}
              >
                <TextField
                  defaultValue={user?.visa_type || ""}
                  disabled
                  sx={{
                    // width: "307px",
                    height: "40px",
                    "& label": {
                      top: "-6px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  label="Current visa type"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default JobQuestionnaire;
