import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import api from "@/services/apiService";

import routes from "@/routes";

import { IUser } from "@/interfaces/user.interfaces";

import styles from "./CreareQueryModal.module.css";

interface IModal {
  isOpen: boolean;
  handleClose: () => void;
  refetch?: () => void;
  userToEdit: IUser | null;
  finalUrlRefetch: () => void;
  handleClearDropDown: () => void;
}

interface FormValues {
  preferred_job?: string;
  industries?: string;
  company_size?: string;
  location_region?: string;
  location_state?: string;
  location_countries?: string;
  dod_security_clearance?: string;
  work_authorization?: string;
  work_location_type?: string;
  worker_type_hours?: string;
  salary_range?: string;
}

const validationSchema = Yup.object().shape({
  preferred_job: Yup.string(),
  industries: Yup.string(),
  company_size: Yup.string(),
  location_region: Yup.string(),
  location_state: Yup.string(),
  location_countries: Yup.string(),
  dod_security_clearance: Yup.string(),
  work_authorization: Yup.string(),
  work_location_type: Yup.string(),
  worker_type_hours: Yup.string(),
  salary_range: Yup.string(),
});

const CreateQueryModal: React.FC<IModal> = ({
  isOpen,
  handleClose,
  userToEdit,
  finalUrlRefetch,
  handleClearDropDown,
}) => {
  const [salaryRange, setSalaryRange] = useState<string>("");
  const [wt, setWt] = useState<string>("");
  const [jt, setJt] = useState<string>("");

  const { register, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const getDataForQueryModal = async () =>
    api.get<FormValues>(routes.userGetSearchQuery).then((res) => res.data);

  const createQuerySendData = (data: FormValues) =>
    api.post(routes.userSearchJob, data).then((res) => res.data);

  const {
    data,
    isLoading: createdQueryIsLoading,
    isFetching: createdQueryIsFetching,
    refetch: createdQueryRefetch,
  } = useQuery<FormValues>("getDataForQueryModal", getDataForQueryModal);

  const { mutateAsync: createJd, isLoading: jdIsLoading } = useMutation(
    "createQuerySendData",
    (data: FormValues) => createQuerySendData(data),
    {
      onSuccess: () => {
        toast.success("Data has been successfully updated");
        reset();
        createdQueryRefetch();
        handleClose();
        handleClearDropDown();
        finalUrlRefetch();
      },
    }
  );

  const handleChangeSalaryRange = (event: SelectChangeEvent) => {
    setSalaryRange(event.target.value as string);
  };

  const handleChangeWt = (event: SelectChangeEvent) => {
    setWt(event.target.value as string);
  };

  const handleChangeJt = (event: SelectChangeEvent) => {
    setJt(event.target.value as string);
  };

  const onSubmit = (object: FormValues) => {
    const data = {
      ...object,
      user: userToEdit?.id,
      salary_range: salaryRange,
      work_location_type: wt,
      worker_type_hours: jt,
    };
    createJd(data);
  };

  useEffect(() => {
    if (data?.work_location_type) {
      setWt(data?.work_location_type);
    }

    if (data?.worker_type_hours) {
      setJt(data?.worker_type_hours);
    }

    if (data?.salary_range) {
      setSalaryRange(data?.salary_range);
    }
  }, [data]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: "430px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "inline-flex",
          padding: "32px 16px",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: "4px",
          background: "var(--text-color-10, #FFF)",
          boxShadow: "1px 4px 15px 4px rgba(0, 0, 0, 0.10)",
        }}
      >
        <Typography
          sx={{
            color: "var(--text-color-20, #495057)",
            fontFamily: "Poppins",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "16px",
            paddingBottom: "12px",
            borderBottom: "3px solid #c1c1c1",
          }}
        >
          My Job Search Criteria
        </Typography>

        {userToEdit?.id && !createdQueryIsLoading && !createdQueryIsFetching ? (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formStyles}>
            <Box
              style={{
                marginTop: "8px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Preffered Job Title(s)"
                  defaultValue={
                    data?.preferred_job
                      ? data.preferred_job
                      : userToEdit.preferred_job
                  }
                  sx={{
                    marginTop: "16px",
                    "& .MuiOutlinedInput-input": {
                      height: "23px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& label": {
                      fontSize: "14px",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  variant="outlined"
                  {...register("preferred_job")}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Industries"
                  defaultValue={
                    data?.industries
                      ? data.industries
                      : userToEdit.preferred_industries
                  }
                  sx={{
                    marginTop: "16px",
                    "& .MuiOutlinedInput-input": {
                      height: "23px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& label": {
                      fontSize: "14px",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  variant="outlined"
                  {...register("industries")}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Company Size"
                  defaultValue={data?.company_size || ""}
                  sx={{
                    marginTop: "16px",
                    "& .MuiOutlinedInput-input": {
                      height: "23px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& label": {
                      fontSize: "14px",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  variant="outlined"
                  {...register("company_size")}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Location (Region)"
                  defaultValue={data?.location_region || ""}
                  sx={{
                    marginTop: "16px",
                    "& .MuiOutlinedInput-input": {
                      height: "23px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& label": {
                      fontSize: "14px",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  variant="outlined"
                  {...register("location_region")}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Location (State)"
                  defaultValue={
                    data?.location_state
                      ? data.location_state
                      : userToEdit.preferred_job_locations_states
                  }
                  sx={{
                    marginTop: "16px",
                    "& .MuiOutlinedInput-input": {
                      height: "23px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& label": {
                      fontSize: "14px",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  variant="outlined"
                  {...register("location_state")}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Location (Counties)"
                  defaultValue={
                    data?.location_countries
                      ? data.location_countries
                      : userToEdit.preferred_job_locations_countries
                  }
                  sx={{
                    marginTop: "16px",
                    "& .MuiOutlinedInput-input": {
                      height: "23px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& label": {
                      fontSize: "14px",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  variant="outlined"
                  {...register("location_countries")}
                />
              </Box>
            </Box>

            <Box
              style={{
                marginTop: "8px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "12px",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <FormControl fullWidth sx={{ marginTop: "16px" }}>
                  <InputLabel id="demo-simple-select-label-WT">
                    Work Location Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label-WT"
                    id="demo-simple-select-WT"
                    value={wt}
                    label="Work Location Type"
                    onChange={handleChangeWt}
                    sx={{
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#5A3AB6",
                      },
                    }}
                  >
                    <MenuItem value={"1"}>On-site</MenuItem>
                    <MenuItem value={"2"}>Remote</MenuItem>
                    <MenuItem value={"3"}>Hybrid</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <FormControl fullWidth sx={{ marginTop: "16px" }}>
                <InputLabel id="demo-simple-select-label-salary">
                  Salary Range
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label-salary"
                  id="demo-simple-select-salary"
                  value={salaryRange}
                  label="Salary Range"
                  onChange={handleChangeSalaryRange}
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#5A3AB6",
                    },
                  }}
                >
                  <MenuItem value={"1"}>40 000+</MenuItem>
                  <MenuItem value={"2"}>60 000+</MenuItem>
                  <MenuItem value={"3"}>80 000+</MenuItem>
                  <MenuItem value={"4"}>100 000+</MenuItem>
                  <MenuItem value={"5"}>120 000+</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ marginTop: "16px" }}>
                <InputLabel id="demo-simple-select-label-JT">
                  Worker Type & Hours
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label-JT"
                  id="demo-simple-select-JT"
                  value={jt}
                  label="Worker Type & Hours"
                  onChange={handleChangeJt}
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#5A3AB6",
                    },
                  }}
                >
                  <MenuItem value={"F"}>Full time</MenuItem>
                  <MenuItem value={"P"}>Part time</MenuItem>
                  <MenuItem value={"C"}>Contract</MenuItem>
                  <MenuItem value={"T"}>Temperary</MenuItem>
                  <MenuItem value={"V"}>Volunteer</MenuItem>
                  <MenuItem value={"I"}>Internship</MenuItem>
                  <MenuItem value={"O"}>Other</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="DoD Security Clearance"
                  defaultValue={data?.dod_security_clearance}
                  sx={{
                    marginTop: "16px",
                    "& .MuiOutlinedInput-input": {
                      height: "23px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& label": {
                      fontSize: "14px",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  variant="outlined"
                  {...register("dod_security_clearance")}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Work Authorization"
                  defaultValue={data?.work_authorization || ""}
                  sx={{
                    marginTop: "16px",
                    "& .MuiOutlinedInput-input": {
                      height: "23px",
                    },
                    "& label.Mui-focused": {
                      color: "#495057",
                    },
                    "& label": {
                      fontSize: "14px",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#5A3AB6",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#5A3AB6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A3AB6",
                      },
                    },
                  }}
                  variant="outlined"
                  {...register("work_authorization")}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "22px",
                }}
              >
                <Button
                  onClick={handleClose}
                  sx={{
                    display: "flex",
                    padding: "12px 8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
                    background: "var(--text-color-60, #EFF2F7)",
                    color: "var(--text-color-20, #495057)",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "14px",
                    textTransform: "capitalize",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "6px",
                  }}
                >
                  Exit
                </Button>
                <Button
                  type="submit"
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
                  {jdIsLoading ? (
                    <CircularProgress sx={{ color: "#FFF" }} size={10} />
                  ) : (
                    "Save & Update Profile"
                  )}
                </Button>
              </Box>
            </Box>
          </form>
        ) : (
          <CircularProgress
            sx={{ color: "#5A3AB6", top: "75px", left: "213px" }}
            size={10}
          />
        )}
      </Box>
    </Modal>
  );
};

export default CreateQueryModal;
