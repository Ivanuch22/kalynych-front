import React from "react";

import { Box, TextField, Typography } from "@mui/material";

import { IUser } from "@/interfaces/user.interfaces";

import styles from "./CareerPreference.module.css";

import UserIcon from "@/assets/careerPrefered/userIcon";
import DolarIcon from "@/assets/careerPrefered/dolarIcon";
import FactoryIcon from "@/assets/careerPrefered/factoryIcon";
import LocationIcon from "@/assets/userDetails/location";
import MarkerIcon from "@/assets/careerPrefered/markerIcon";
import PlaneIcon from "@/assets/careerPrefered/planeIcon";
import PictureIcon from "@/assets/careerPrefered/pictureIcon";
import IconIcon from "@/assets/careerPrefered/iconIcon";
import ChairIcon from "@/assets/careerPrefered/chairIcon";
import CalendarIcon from "@/assets/careerPrefered/calendarIcon";

interface ICareerPreferenceForm {
  user: IUser | null;
}

const CareerPreferences: React.FC<ICareerPreferenceForm> = ({ user }) => {
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
              <UserIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "8px",
                }}
              >
                <TextField
                  defaultValue={user?.preferred_job || ""}
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
                  label="Preferred Job Titles"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "26px" }}
            >
              <DolarIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "8px",
                }}
              >
                <TextField
                  defaultValue={user?.compensation || ""}
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
                  label="Compensation Range"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "26px" }}
            >
              <FactoryIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "8px",
                }}
              >
                <TextField
                  defaultValue={user?.preferred_industries || ""}
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
                  label="Preferred industries"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "26px" }}
            >
              <LocationIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "8px",
                }}
              >
                <TextField
                  defaultValue={user?.preferred_job_locations_states || ""}
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
                  label="Preferred job Locations (State)"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "26px" }}
            >
              <MarkerIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "8px",
                }}
              >
                <TextField
                  defaultValue={user?.preferred_job_locations_countries || ""}
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
                  label="Preferred job Locations (Contries)"
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
              <PlaneIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "12px",
                }}
              >
                <TextField
                  defaultValue={user?.willing_to_relocate || ""}
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
                  label="Willing to relocate"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "26px" }}
            >
              <PictureIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "12px",
                }}
              >
                <TextField
                  defaultValue={user?.work_location_type || ""}
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
                  label="Work location type"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "26px" }}
            >
              <IconIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "12px",
                }}
              >
                <TextField
                  defaultValue={user?.experience_level || ""}
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
                  label="Experience level"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "26px" }}
            >
              <ChairIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "12px",
                }}
              >
                <TextField
                  defaultValue={user?.position_level || ""}
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
                  label="Position level"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "26px" }}
            >
              <CalendarIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "12px",
                }}
              >
                <TextField
                  defaultValue={user?.availability_start || ""}
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
                  label="Availability to Start"
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

export default CareerPreferences;
