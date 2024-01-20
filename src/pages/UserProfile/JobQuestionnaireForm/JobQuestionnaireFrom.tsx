import React from "react";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import api from "@/services/apiService";
import routes from "@/routes";
import { IEditUser, IUser } from "@/interfaces/user.interfaces";

import styles from "./JQForm.module.css";

import TransgenderIcon from "@mui/icons-material/Transgender";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AccessibleIcon from "@mui/icons-material/Accessible";
import SavedIcon from "@/assets/userDetails/saved";
import LocationIcon from "@/assets/userDetails/location";
import VisaMemberIcon from "@/assets/userDetails/visaMember";

interface IJobQuestionare {
  sex: string;
  sex_orientation: string;
  latino: string;
  veteran: string;
  disability: string;
  authorized_to_work: string;
  visa: string;
  visa_type: string;
}

interface IJobQuestionareForm {
  handleChangeForm: (form: number) => void;
  id: string | undefined;
  userByIdRefetch: () => void;
  // @ts-ignore
  user: IUser | null;
}

interface IJobQuestionare extends IEditUser {
  sex: string;
  sex_orientation: string;
  latino: string;
  veteran: string;
  disability: string;
  authorized_to_work: string;
  visa: string;
  visa_type: string;
}

const validationSchema = Yup.object().shape({
  sex: Yup.string().required("Sex is required"),
  sex_orientation: Yup.string().required("Required field"),
  latino: Yup.string().required("Required field"),
  veteran: Yup.string().required("Required field"),
  disability: Yup.string().required("Required field"),
  authorized_to_work: Yup.string().required("Required field"),
  visa: Yup.string().required("Required field"),
  visa_type: Yup.string().required("Required field"),
});

const JobQuestionnaireFrom: React.FC<IJobQuestionareForm> = ({
  id,
  userByIdRefetch,
  user,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJobQuestionare>({
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

  const onSubmit: SubmitHandler<IJobQuestionare> = async (userData) => {
    await updateUser(userData);
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
                  label="Female"
                  variant="outlined"
                  {...register("sex")}
                />
                {errors.sex && (
                  <Typography sx={{ color: "red" }}>
                    {errors.sex.message}
                  </Typography>
                )}
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
                  label="Sexual Orientation"
                  variant="outlined"
                  {...register("sex_orientation")}
                />
                {errors.sex_orientation && (
                  <Typography sx={{ color: "red" }}>
                    {errors.sex_orientation.message}
                  </Typography>
                )}
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
                  label="Are you Hispanic or Latino?"
                  variant="outlined"
                  {...register("latino")}
                />
                {errors.latino && (
                  <Typography sx={{ color: "red" }}>
                    {errors.latino.message}
                  </Typography>
                )}
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
                  label="Not a Veteran"
                  variant="outlined"
                  {...register("veteran")}
                />
                {errors.veteran && (
                  <Typography sx={{ color: "red" }}>
                    {errors.veteran.message}
                  </Typography>
                )}
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
                  defaultValue={user?.disability || ""}
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
                  label="Disability Status"
                  variant="outlined"
                  {...register("disability")}
                />
                {errors.disability && (
                  <Typography sx={{ color: "red" }}>
                    {errors.disability.message}
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
                  label="Authorized to work in the USA"
                  variant="outlined"
                  {...register("authorized_to_work")}
                />
                {errors.authorized_to_work && (
                  <Typography sx={{ color: "red" }}>
                    {errors.authorized_to_work.message}
                  </Typography>
                )}
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
                  label="Visa Sponsorship Required"
                  variant="outlined"
                  {...register("visa")}
                />
                {errors.visa && (
                  <Typography sx={{ color: "red" }}>
                    {errors.visa.message}
                  </Typography>
                )}
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
                  label="Current visa type"
                  variant="outlined"
                  {...register("visa_type")}
                />
                {errors.visa_type && (
                  <Typography sx={{ color: "red" }}>
                    {errors.visa_type.message}
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

export default JobQuestionnaireFrom;
