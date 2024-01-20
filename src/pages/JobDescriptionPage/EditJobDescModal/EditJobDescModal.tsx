import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";

import {
  Modal,
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import { IUploadCV } from "@/interfaces/uploadCV.interface";

import api from "@/services/apiService";
import routes from "@/routes";

interface ICVs {
  id: number;
  name: string;
  text: string;
  created: string;
  user_id: number;
}

interface IModal {
  isOpen: boolean;
  handleClose: () => void;
  refetch: () => void;
  // @ts-ignore
  jobDescToEdit: ICVs | undefined;
  jobDescLoading: boolean;
  jobDescFetching: boolean;
}

interface FormValues {
  name: string;
  text: string;
}

interface ICVs {
  id: number;
  name: string;
  text: string;
  created: string;
  user_id: number;
  // @ts-ignore
  gpt_best_cv: number;
  status: string;
}

interface IResume {
  resume: ICVs[];
}

interface IReasign {
  id: number;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  text: Yup.string().required("Text is required"),
});

export const EditjobDescModal = ({
  isOpen,
  handleClose,
  refetch,
  jobDescToEdit,
  jobDescLoading,
  jobDescFetching,
}: IModal) => {
  const [status, setStatus] = useState<string>("");
  const [cvId, setCvId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const getCVsQuery = async () =>
    api.get<IResume>(routes.allResumes).then((res) => res.data);

  const updateJobDescQuery = (values: IUploadCV) =>
    api
      .patch(`${routes.getJobDescById}${jobDescToEdit?.id}/`, values)
      .then((res) => res.data);

  // const reasignCVQuery = (values: IReasign) =>
  //   api.post(routes.reasignCV, values).then((res) => res.data);

  const {
    data,
    isFetching,
    isLoading: cvsIsLoading,
  } = useQuery<IResume>("cvsQuery", getCVsQuery);

  const { mutateAsync: updateJobDesc, isLoading } = useMutation(
    "updateJobDescQuery",
    (values: IUploadCV) => updateJobDescQuery(values),
    {
      onSuccess: () => {
        toast.success("Job Description has been successfully created");
        setCvId("");
        reset();
        handleClose();
        refetch();
      },
    }
  );

  // const { mutateAsync: reasignCv, isLoading: reasignCVIsLoadign } = useMutation(
  //   "reasignCVQuery",
  //   (values: IReasign) => reasignCVQuery(values),
  //   {
  //     onSuccess: () => {
  //       toast.success("CV has been successfully reasigned");
  //     },
  //   }
  // );

  const filteredCVs = useMemo(() => data?.resume ?? [], [data]);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleChangeCvId = (event: SelectChangeEvent) => {
    setCvId(event.target.value as string);
  };

  const onSubmit = async (data: any) => {
    if (status?.length) {
      const updatedData = {
        ...data,
        file_url: "",
        status: status,
        gpt_best_cv: cvId,
      };
      await updateJobDesc(updatedData);
      setCvId("");
    } else {
      const updatedData = { ...data, file_url: "", gpt_best_cv: cvId };
      await updateJobDesc(updatedData);
      setCvId("");
    }
  };

  const handleCloseModal = () => {
    setCvId("");
    reset();
    handleClose();
  };

  // const handleReasignCv = async (id: number) => {
  //   const data = {
  //     id: id,
  //   };

  //   const newData: ICVs = await reasignCv(data);
  //   if (newData.id) {
  //     // @ts-ignore
  //     setCvId(newData?.gpt_best_cv);
  //   }
  // };

  useEffect(() => {
    setLoading(true);
    if (jobDescToEdit) {
      setCvId(jobDescToEdit?.gpt_best_cv?.toString());
      setLoading(false);
    } else {
      setLoading(false);
      setCvId("");
    }
  }, [jobDescToEdit?.gpt_best_cv]);

  useEffect(() => {
    setLoading(true);
    if (jobDescToEdit) {
      setStatus(jobDescToEdit?.status);
      setLoading(false);
    } else {
      setLoading(false);
      setStatus("");
    }
  }, [jobDescToEdit?.status]);

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: "420px",
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
          }}
        >
          Edit Job Description
        </Typography>

        <Typography
          sx={{
            color: "#555B6D",
            fontFamily: "Poppins",
            fontSize: "12px",
            width: "250px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "20px",
            textTransform: "capitalize",
            marginTop: "8px",
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, quos.
        </Typography>
        {!jobDescLoading && jobDescToEdit?.id && !jobDescFetching && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box style={{ marginTop: "8px" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Name"
                  defaultValue={jobDescToEdit?.name}
                  sx={{
                    marginTop: "16px",
                    "& .MuiOutlinedInput-input": {
                      height: "15px",
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
                  {...register("name")}
                />
                {errors.name && (
                  <Typography sx={{ color: "red", fontSize: "12px" }}>
                    {errors.name.message}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Text"
                  multiline
                  rows={5}
                  defaultValue={jobDescToEdit?.text}
                  sx={{
                    marginTop: "16px",
                    "& .MuiOutlinedInput-input": {},
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
                  {...register("text")}
                />

                {errors.text && (
                  <Typography sx={{ color: "red", fontSize: "12px" }}>
                    {errors.text.message}
                  </Typography>
                )}
              </Box>

              <FormControl fullWidth sx={{ marginTop: "14px" }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  onChange={handleChange}
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#5A3AB6",
                    },
                  }}
                >
                  <MenuItem value="Saved">Saved</MenuItem>
                  <MenuItem value="Applied">Applied</MenuItem>
                  <MenuItem value="Interviewing">Interviewing</MenuItem>
                  <MenuItem value="Offer">Offer</MenuItem>
                  <MenuItem value="No Longer in Consideration">
                    No Longer in Consideration
                  </MenuItem>
                </Select>
              </FormControl>

              {!loading && !isFetching && !cvsIsLoading && (
                <FormControl fullWidth sx={{ marginTop: "14px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Pinned CV
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cvId}
                    label="Pinned CV"
                    onChange={handleChangeCvId}
                    sx={{
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#5A3AB6",
                      },
                    }}
                  >
                    {isFetching || cvsIsLoading || loading ? (
                      <CircularProgress sx={{ color: "#5A3AB6" }} size={14} />
                    ) : (
                      filteredCVs.map((cv: ICVs) => (
                        <MenuItem value={cv.id}>{cv.name}</MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "18px",
              }}
            >
              <Button
                onClick={handleCloseModal}
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
                Cancel
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
                {isLoading ? (
                  <CircularProgress sx={{ color: "#FFF" }} size={10} />
                ) : (
                  "Save"
                )}
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Modal>
  );
};
