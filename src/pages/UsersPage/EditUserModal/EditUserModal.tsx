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

import api from "@/services/apiService";
import routes from "@/routes";
import { RoleEnums } from "@/enums";
import { IConceirge, IEditUser, IUser } from "@/interfaces/user.interfaces";
import { useAuth } from "@/context/Auth";

interface IModal {
  isOpen: boolean;
  handleClose: () => void;
  refetch: () => void;
  userToEdit: IUser | null;
  userLoading: boolean;
  userFetching: boolean;
}

interface FormValues {
  name?: string;
  email?: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string(),
});

export const EditUserModal = ({
  isOpen,
  handleClose,
  refetch,
  userToEdit,
  userLoading,
  userFetching,
}: IModal) => {
  const { role } = useAuth();

  const [userRole, setUserRole] = useState<string>("");
  const [userConserige, setConceirge] = useState<number | null>(null);
  const [userStatus, setUserStatus] = useState<string>("");
  const [addTokens, setAddTokens] = useState<number | null>(null);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const getAllConceirgeQuery = async () =>
    api.get<IConceirge[]>(routes.getAllConceirge).then((res) => res.data);

  const updateUserQuery = (values: IEditUser) =>
    api
      .patch(`${routes.editUser}${userToEdit?.id}/`, values)
      .then((res) => res.data);

  const { data, isLoading: conceirgeIsLoading } = useQuery<IConceirge[]>(
    "getAllConceirgeQuery",
    getAllConceirgeQuery
  );

  const { mutateAsync: updateUser, isLoading } = useMutation(
    "updateJobDescQuery",
    (values: IEditUser) => updateUserQuery(values),
    {
      onSuccess: () => {
        toast.success("User has been successfully updated");
        refetch();
        reset();
        handleClose();
      },
    }
  );

  const filteredConceirge = useMemo(() => data ?? [], [data]);

  const handleChange = (event: SelectChangeEvent) => {
    setUserRole(event.target.value as string);
  };

  const handleChangeConceirge = (event: SelectChangeEvent) => {
    // @ts-ignore
    setConceirge(event.target.value as string);
  };

  const handleChangeUserStatus = (event: SelectChangeEvent) => {
    setUserStatus(event.target.value as string);
  };

  const onSubmit = async () => {
    const updatedData = {
      role: userRole ? userRole : userToEdit?.role,
      concierge: userConserige ? userConserige : userToEdit?.concierge,
      status: userStatus,
      tokens: addTokens || (userStatus === "Active" ? 200 : undefined),
    };
    // @ts-ignore
    await updateUser(updatedData);
  };

  const handleCloseModal = () => {
    setConceirge(null);
    reset();
    handleClose();
  };

  useEffect(() => {
    if (userToEdit) {
      setUserRole(userToEdit?.role);
    }
  }, [userToEdit?.role]);

  useEffect(() => {
    if (userToEdit) {
      setUserStatus(userToEdit?.status);
    }
  }, [userToEdit?.status]);

  useEffect(() => {
    if (userToEdit && userToEdit?.concierge) {
      const conceirge = filteredConceirge.find(
        // @ts-ignore
        (el) => el.id === userToEdit?.concierge
      );
      if (conceirge) {
        setConceirge(conceirge.id);
      }
    }
  }, [userToEdit?.concierge]);

  if (conceirgeIsLoading || userLoading || userFetching)
    return <CircularProgress sx={{ color: "#5A3AB6" }} size={14} />;

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
          Edit User
        </Typography>

        {userToEdit?.id && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box style={{ marginTop: "8px" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Name"
                  disabled
                  defaultValue={userToEdit?.name}
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
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Email"
                  disabled
                  defaultValue={userToEdit?.email}
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
                  {...register("email")}
                />
              </Box>

              {userToEdit?.requested_tokens ? (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    label="Add tokens"
                    onChange={(e) => setAddTokens(Number(e.target.value))}
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
                  />
                </Box>
              ) : (
                <Box />
              )}

              <FormControl fullWidth sx={{ marginTop: "14px" }}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userRole}
                  label="role"
                  onChange={handleChange}
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#5A3AB6",
                    },
                  }}
                >
                  <MenuItem
                    sx={{ textTransform: "capitalize" }}
                    value={RoleEnums.Admin}
                  >
                    {RoleEnums.Admin}
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize" }}
                    value={RoleEnums.Concierge}
                  >
                    {RoleEnums.Concierge}
                  </MenuItem>
                  <MenuItem value={RoleEnums.User}>Client</MenuItem>
                </Select>
              </FormControl>

              {role === RoleEnums.Admin &&
                userToEdit.role === RoleEnums.User && (
                  <FormControl fullWidth sx={{ marginTop: "14px" }}>
                    <InputLabel id="concierg-label">
                      Linked Conceirge
                    </InputLabel>
                    <Select
                      labelId="concierg-label"
                      id="concierg"
                      // defaultValue={userConserige || ""}
                      // @ts-ignore
                      value={userConserige}
                      label="Linked Conceirge"
                      onChange={handleChangeConceirge}
                      sx={{
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#5A3AB6",
                        },
                      }}
                    >
                      {filteredConceirge.map((el: IConceirge) => (
                        <MenuItem value={el.id}>{el.user.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

              {role === RoleEnums.Admin &&
                userToEdit.role === RoleEnums.User && (
                  <FormControl fullWidth sx={{ marginTop: "14px" }}>
                    <InputLabel id="role-label">User status</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      value={userStatus}
                      label="User status"
                      onChange={handleChangeUserStatus}
                      sx={{
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#5A3AB6",
                        },
                      }}
                    >
                      <MenuItem value="Inactive">Inactive</MenuItem>
                      <MenuItem value="Requested">Requested</MenuItem>
                      <MenuItem value="Pending Payment">
                        Pending Payment
                      </MenuItem>
                      <MenuItem value="Pending Profile">
                        Pending Profile
                      </MenuItem>
                      <MenuItem value="Pending Assignment">
                        Pending Assignment
                      </MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
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
