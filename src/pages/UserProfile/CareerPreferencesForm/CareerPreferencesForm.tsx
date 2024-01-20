import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import api from "@/services/apiService";
import routes from "@/routes";
import { IEditUser, IUser } from "@/interfaces/user.interfaces";

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
  handleChangeForm: (form: number) => void;
  id: string | undefined;
  userByIdRefetch: () => void;
  // @ts-ignore
  user: IUser | null;
}

interface ICareerPreference extends IEditUser {
  preferred_job: string;
  compensation: string;
  preferred_industries: string;
  preferred_job_locations_states: string;
  preferred_job_locations_countries: string;
  availability_start: string;
}

const validationSchema = Yup.object().shape({
  preferred_job: Yup.string().required("Preferred Job Titles is required"),
  compensation: Yup.string().required("Required field"),
  preferred_industries: Yup.string().required("Required field"),
  preferred_job_locations_states: Yup.string().required("Required field"),
  preferred_job_locations_countries: Yup.string().required("Required field"),
  availability_start: Yup.string().required("Required field"),
});

const CareerPreferencesForm: React.FC<ICareerPreferenceForm> = ({
  id,
  userByIdRefetch,
  user,
}) => {
  const [willing_to_relocate, setWiling_to_relocate] = useState("");
  const [work_location_type, setWork_location_type] = useState("");
  const [experience_level, setExperience_level] = useState("");
  const [position_level, setPosition_level] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICareerPreference>({
    resolver: yupResolver(validationSchema),
  });

  const updateUserQuery = (values: IEditUser) =>
    api.patch(`${routes.editUser}${id}/`, values).then((res) => res.data);

  const { mutateAsync: updateUser, isLoading } = useMutation(
    "updateJobDescQuery",
    (values: IEditUser) => updateUserQuery(values),
    {
      onSuccess: () => {
        toast.success("User data has been successfully updated");
        userByIdRefetch();
      },
    }
  );

  useEffect(() => {
    if (user?.willing_to_relocate) {
      setWiling_to_relocate(user?.willing_to_relocate);
    }
    if (user?.work_location_type) {
      setWork_location_type(user?.work_location_type);
    }
    if (user?.experience_level) {
      setExperience_level(user?.experience_level);
    }
    if (user?.position_level) {
      setPosition_level(user?.position_level);
    }
  }, []);

  const handleChangeWiling = (event: SelectChangeEvent) => {
    setWiling_to_relocate(event.target.value);
  };

  const handleChangeWorkLocation = (event: SelectChangeEvent) => {
    setWork_location_type(event.target.value);
  };

  const handleChangeExperienceLevel = (event: SelectChangeEvent) => {
    setExperience_level(event.target.value);
  };

  const handleChangePositionLevel = (event: SelectChangeEvent) => {
    setPosition_level(event.target.value);
  };

  const onSubmit: SubmitHandler<ICareerPreference> = async (data) => {
    const updatedDate = {
      ...data,
      willing_to_relocate: willing_to_relocate,
      work_location_type: work_location_type,
      experience_level: experience_level,
      position_level: position_level,
    };
    await updateUser(updatedDate);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "1122px",
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
        Complete your Job Profile
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formStyles}>
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
                  sx={{
                    width: "307px",
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
                  {...register("preferred_job")}
                />
                {errors.preferred_job && (
                  <Typography sx={{ color: "red" }}>
                    {errors.preferred_job.message}
                  </Typography>
                )}
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
                  sx={{
                    width: "307px",
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
                  {...register("compensation")}
                />
                {errors.compensation && (
                  <Typography sx={{ color: "red" }}>
                    {errors.compensation.message}
                  </Typography>
                )}
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
                  sx={{
                    width: "307px",
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
                  {...register("preferred_industries")}
                />
                {errors.preferred_industries && (
                  <Typography sx={{ color: "red" }}>
                    {errors.preferred_industries.message}
                  </Typography>
                )}
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
                  sx={{
                    width: "307px",
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
                  {...register("preferred_job_locations_states")}
                />
                {errors.preferred_job_locations_states && (
                  <Typography sx={{ color: "red" }}>
                    {errors.preferred_job_locations_states.message}
                  </Typography>
                )}
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
                  sx={{
                    width: "307px",
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
                  {...register("preferred_job_locations_countries")}
                />
                {errors.preferred_job_locations_countries && (
                  <Typography sx={{ color: "red" }}>
                    {errors.preferred_job_locations_countries.message}
                  </Typography>
                )}
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
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="wiling_to_relocate" sx={{ top: "-6px" }}>
                    Willing to Relocate?
                  </InputLabel>
                  <Select
                    defaultValue={user?.willing_to_relocate || ""}
                    sx={{
                      width: "300px",
                      height: "40px",
                      "& label": {
                        top: "-6px",
                      },
                    }}
                    labelId="wiling_to_relocate"
                    id="wiling_to_relocate"
                    value={willing_to_relocate}
                    onChange={handleChangeWiling}
                    autoWidth
                    label="Willing to Relocate?"
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "14px" }}
            >
              <PictureIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "12px",
                }}
              >
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="work_location_type" sx={{ top: "-6px" }}>
                    Work Location type
                  </InputLabel>
                  <Select
                    defaultValue={user?.work_location_type || ""}
                    sx={{
                      width: "300px",
                      height: "40px",
                      "& label": {
                        top: "-6px",
                      },
                    }}
                    labelId="work_location_type"
                    id="work_location_type"
                    value={work_location_type}
                    onChange={handleChangeWorkLocation}
                    autoWidth
                    label="Work Location type"
                  >
                    <MenuItem value="Hybrid">Hybrid</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                    <MenuItem value="On-Site">On-Site</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "14px" }}
            >
              <IconIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "12px",
                }}
              >
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="experience_level" sx={{ top: "-6px" }}>
                    Experience Level
                  </InputLabel>
                  <Select
                    defaultValue={user?.experience_level || ""}
                    sx={{
                      width: "300px",
                      height: "40px",
                      "& label": {
                        top: "-6px",
                      },
                    }}
                    labelId="experience_level"
                    id="experience_level"
                    value={experience_level}
                    onChange={handleChangeExperienceLevel}
                    autoWidth
                    label="Experience Level"
                  >
                    <MenuItem value="0-4yrs">0-4yrs</MenuItem>
                    <MenuItem value="5-7yrs">5-7yrs</MenuItem>
                    <MenuItem value="8-10yrs">8-10yrs</MenuItem>
                    <MenuItem value="11-14yrs">11-14yrs</MenuItem>
                    <MenuItem value="15+yrs">15+yrs</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "14px" }}
            >
              <ChairIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "12px",
                }}
              >
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="position_level" sx={{ top: "-6px" }}>
                    Position Level
                  </InputLabel>
                  <Select
                    defaultValue={user?.position_level || ""}
                    sx={{
                      width: "300px",
                      height: "40px",
                      "& label": {
                        top: "-6px",
                      },
                    }}
                    labelId="position_level"
                    id="position_level"
                    value={position_level}
                    onChange={handleChangePositionLevel}
                    autoWidth
                    label="Position Level"
                  >
                    <MenuItem value="Individual Level">
                      Individual Level
                    </MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Director">Director</MenuItem>
                    <MenuItem value="Vice President">Vice President</MenuItem>
                    <MenuItem value="Chief Executive">Chief Executive</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "14px" }}
            >
              <CalendarIcon className={styles.icon} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                }}
              >
                <TextField
                  defaultValue={user?.availability_start || ""}
                  sx={{
                    width: "307px",
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
                  {...register("availability_start")}
                />
                {errors.availability_start && (
                  <Typography sx={{ color: "red" }}>
                    {errors.availability_start.message}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            marginTop: "61px",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              marginLeft: "32px",
              backgroundColor: "#5A3AB6",
              "&:hover": {
                backgroundColor: "#5A3AB6",
              },
            }}
            variant="contained"
            type="submit"
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "#FFF" }} />
            ) : (
              "Save"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CareerPreferencesForm;
