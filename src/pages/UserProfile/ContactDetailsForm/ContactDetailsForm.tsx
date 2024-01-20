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

import styles from "./ContactDetailsForm.module.css";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneIcon from "@mui/icons-material/Phone";
import MapIcon from "@mui/icons-material/Map";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IEditUser, IUser } from "@/interfaces/user.interfaces";

interface IContactdetails {
  name: string;
  preferred_name: string;
  phone_number: number;
  phone_number_type: string;
  address: string;
  city: string;
  zip_code: string;
  linkedin: string;
}

interface IContactForm {
  handleChangeForm: (form: number) => void;
  id: string | undefined;
  userByIdRefetch: () => void;
  // @ts-ignore
  user: IUser | null;
}

interface IContactDetailsWithState extends IContactdetails {
  state?: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Email is required"),
  preferred_name: Yup.string().required("Preferred name is required"),
  phone_number: Yup.number().required("Number is required"),
  phone_number_type: Yup.string().required("Number type is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  zip_code: Yup.string().required("Zip code is required"),
  linkedin: Yup.string().required("Linked in is required"),
});

const ContactDetailsForm: React.FC<IContactForm> = ({
  handleChangeForm,
  id,
  userByIdRefetch,
  user,
}) => {
  const [state, setState] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactdetails>({
    resolver: yupResolver(validationSchema),
  });

  const updateUserQuery = (values: IContactDetailsWithState) =>
    api.patch(`${routes.editUser}${id}/`, values).then((res) => res.data);

  const { mutateAsync: updateUser, isLoading } = useMutation(
    "updateJobDescQuery",
    (values: IContactDetailsWithState) => updateUserQuery(values),
    {
      onSuccess: () => {
        toast.success("User data has been successfully updated");
        userByIdRefetch();
      },
    }
  );

  useEffect(() => {
    if (user?.state) {
      setState(user.state);
    }
  }, []);

  const handleChangeState = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  const onSubmit: SubmitHandler<IContactdetails> = async (data) => {
    const updatedData: IContactDetailsWithState = {
      ...data,
      state: state,
    };
    await updateUser(updatedData);
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PermIdentityIcon sx={{ display: "flex" }} />
          <Box
            sx={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
          >
            <TextField
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
              defaultValue={user?.name || ""}
              label="Full name"
              variant="outlined"
              {...register("name")}
            />
            {errors.name && (
              <Typography sx={{ color: "red" }}>
                {errors.name.message}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}>
          <PermIdentityIcon sx={{ display: "flex" }} />
          <Box
            sx={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
          >
            <TextField
              defaultValue={user?.preferred_name || ""}
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
              label="Preferred Name (in full)"
              variant="outlined"
              {...register("preferred_name")}
            />
            {errors.preferred_name && (
              <Typography sx={{ color: "red" }}>
                {errors.preferred_name.message}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}>
          <PhoneIcon sx={{ display: "flex" }} />
          <Box
            sx={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
          >
            <TextField
              defaultValue={user?.phone_number || ""}
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
              label="Phone number"
              variant="outlined"
              {...register("phone_number")}
            />
            {errors.phone_number && (
              <Typography sx={{ color: "red" }}>
                {errors.phone_number.message}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}>
          <PhoneIcon sx={{ display: "flex" }} />
          <Box
            sx={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
          >
            <TextField
              defaultValue={user?.phone_number_type || ""}
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
              label="Phone number type"
              variant="outlined"
              {...register("phone_number_type")}
            />
            {errors.phone_number_type && (
              <Typography sx={{ color: "red" }}>
                {errors.phone_number_type.message}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}>
          <MapIcon sx={{ display: "flex" }} />
          <Box
            sx={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
          >
            <TextField
              defaultValue={user?.address || ""}
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
              label="Address"
              variant="outlined"
              {...register("address")}
            />
            {errors.address && (
              <Typography sx={{ color: "red" }}>
                {errors.address.message}
              </Typography>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "26px",
            marginLeft: "33px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              defaultValue={user?.city || ""}
              sx={{
                width: "85px",
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
              label="City"
              variant="outlined"
              {...register("city")}
            />
            {errors.city && (
              <Typography sx={{ color: "red" }}>
                {errors.city.message}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "12px",
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="state" sx={{ top: "-6px" }}>
                State
              </InputLabel>
              <Select
                defaultValue={user?.state || ""}
                sx={{
                  width: "95px",
                  height: "40px",
                  "& label": {
                    top: "-6px",
                  },
                }}
                labelId="state"
                id="state"
                value={state}
                onChange={handleChangeState}
                autoWidth
                label="State"
              >
                <MenuItem value="Denmark">Denmark</MenuItem>
                <MenuItem value="Sweden">Sweden</MenuItem>
                <MenuItem value="Norway">Norway</MenuItem>
              </Select>
            </FormControl>
            {errors.city && (
              <Typography sx={{ color: "red" }}>
                {errors.city.message}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "4px",
            }}
          >
            <TextField
              defaultValue={user?.zip_code || ""}
              sx={{
                width: "94px",
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
              label="Zip Code"
              variant="outlined"
              {...register("zip_code")}
            />
            {errors.zip_code && (
              <Typography sx={{ color: "red" }}>
                {errors.zip_code.message}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}>
          <LinkedInIcon sx={{ display: "flex" }} />
          <Box
            sx={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
          >
            <TextField
              defaultValue={user?.linkedin || ""}
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
              label="Linkedin link"
              variant="outlined"
              {...register("linkedin")}
            />
            {errors.linkedin && (
              <Typography sx={{ color: "red" }}>
                {errors.linkedin.message}
              </Typography>
            )}
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

export default ContactDetailsForm;
