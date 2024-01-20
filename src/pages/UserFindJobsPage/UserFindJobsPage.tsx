import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { usePage } from "@/context/PageNaming";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { localStorageManager } from "@/services";

import { IUser } from "@/interfaces/user.interfaces";

import api from "@/services/apiService";

import routes from "@/routes";

import { SaveModal } from "./SaveModal";
import CreateQueryModal from "./CreateQueryModal/CreateQueryModal";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SaveIcon from "@mui/icons-material/Save";

interface IQuery {
  final_url: string;
}

interface IAllQuery {
  id: number;
  user_id: number;
  title: string;
  linkedin_url: string;
}

const UserFindJobsPage: React.FC = () => {
  const { setPageName } = usePage();

  const [user, setUser] = useState<IUser | null>(null);
  const [openQueryModal, setOpenQueryModal] = useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = useState<boolean>(false);
  const [currentObject, setCurrentObject] = useState<IAllQuery | null>(null);

  const getSearchQueryModal = async () =>
    api.get<IQuery>(routes.userGetGeneratedQuery).then((res) => res.data);

  const getAllSearchQueryModal = async () =>
    api.get<IAllQuery[]>(routes.userGetAllLinks).then((res) => res.data);

  const {
    data: allUrls,
    isLoading: allUrlsIsLoading,
    isFetching: allUrlsIsFetching,
    refetch: allUrlsRefetch,
  } = useQuery<IAllQuery[]>("getAllSearchQueryModal", getAllSearchQueryModal);

  const {
    data: finalUrl,
    isLoading: finalUrlIsLoading,
    isFetching: finalUrlIsFetching,
    refetch: finalUrlRefetch,
  } = useQuery<IQuery>("getSearchQueryModal", getSearchQueryModal);

  const handleOpenModal = () => {
    setOpenQueryModal(true);
  };

  useEffect(() => {
    if (allUrls && allUrls?.length > 0) {
      setCurrentObject(allUrls[0]);
    }
  }, [allUrls]);

  const handleOpenSaveModal = () => {
    setOpenSaveModal(true);
  };

  const handleCloseSaveModal = () => {
    setOpenSaveModal(false);
  };

  const handleCloseModal = () => {
    setOpenQueryModal(false);
  };

  const handleOpenUrl = () => {
    window.open(finalUrl?.final_url, "_blank");
  };

  const handleChangeObject = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedId = Number(event.target.value);
    const selectedUrl = allUrls?.find((url) => url.id === selectedId);
    if (selectedUrl) {
      setCurrentObject(selectedUrl);
    }
  };

  const handleClearDropDown = () => {
    setCurrentObject(null);
  };

  useEffect(() => {
    setPageName("Find Jobs");
    const localStorageUser = localStorageManager.getUser();
    localStorageUser?.id && setUser(localStorageUser);
  }, []);

  if (allUrlsIsLoading || allUrlsIsFetching)
    return <CircularProgress sx={{ color: "#5A3AB6" }} size={20} />;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          marginTop: "24px",
          paddingLeft: "12px",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", marginTop: "18px" }}
        >
          <Typography
            sx={{
              color: "#030303",
              fontSize: "24px",
              fontFamily: "Roboto",
              fontWeight: 400,
              lineHeight: "28px",
            }}
          >
            Saved urls
          </Typography>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "2px",
              boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              marginTop: "12px",
            }}
          >
            <FormControl fullWidth sx={{ marginTop: "14px" }}>
              <InputLabel id="demo-simple-select-label">
                Set as current
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentObject?.id ?? null}
                label="Set as current"
                // @ts-ignore
                onChange={handleChangeObject}
                sx={{
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#5A3AB6",
                  },
                }}
              >
                {allUrls?.map((url) => (
                  <MenuItem key={url.id} value={url.id}>
                    {url.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            startIcon={<ManageAccountsIcon sx={{ height: "14px" }} />}
            onClick={handleOpenModal}
            sx={{
              backgroundColor: "#5A3AB6",
              height: "20px",
              fontSize: "10px",
              textTransform: "capitalize",
              borderRadius: "25px",
              fontWeight: "400",
              marginTop: "24px",
              "&:hover": {
                backgroundColor: "#5A3AB6",
              },
            }}
          >
            Review and Update General Search Criteria
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "18px",
            marginLeft: "32px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "#030303",
                fontSize: "24px",
                fontFamily: "Roboto",
                fontWeight: 400,
                lineHeight: "28px",
              }}
            >
              Jobs Posted in the last 24 hours
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "60px",
              backgroundColor: "#ffffff",
              borderRadius: "2px",
              boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
              display: "flex",
              flexDirection: "column",
              marginTop: "12px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LinkedInIcon sx={{ fill: "#5A3AB6" }} />
                <Typography
                  sx={{
                    color: "#5A3AB6",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                    lineHeight: "16px",
                  }}
                >
                  Linkedin
                </Typography>
              </Box>
              {!finalUrlIsLoading && !finalUrlIsFetching && !currentObject ? (
                <Typography
                  sx={{
                    color: "#5A3AB6",
                    width: "300px",
                    overflow: "auto",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    marginLeft: "24px",
                    marginRight: "24px",
                  }}
                >
                  {finalUrl?.final_url}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    color: "#5A3AB6",
                    width: "300px",
                    overflow: "auto",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    marginLeft: "24px",
                    marginRight: "24px",
                  }}
                >
                  {currentObject?.linkedin_url}
                </Typography>
              )}
              <Button
                variant="contained"
                onClick={handleOpenUrl}
                endIcon={<OpenInNewIcon sx={{ height: "14px" }} />}
                sx={{
                  backgroundColor: "#5A3AB6",
                  height: "20px",
                  fontSize: "10px",
                  textTransform: "capitalize",
                  borderRadius: "25px",
                  fontWeight: "400",
                  "&:hover": {
                    backgroundColor: "#5A3AB6",
                  },
                }}
              >
                Go
              </Button>
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={handleOpenSaveModal}
                startIcon={
                  <SaveIcon
                    sx={{
                      height: "14px",
                      fill: "#5A3AB6",
                    }}
                  />
                }
                sx={{
                  backgroundColor: "#fff",
                  border: "1px solid #5A3AB6",
                  color: "#5A3AB6",
                  height: "20px",
                  fontSize: "10px",
                  textTransform: "capitalize",
                  borderRadius: "25px",
                  fontWeight: "400",
                  marginTop: "24px",
                }}
              >
                Save to Profile
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <CreateQueryModal
        userToEdit={user}
        isOpen={openQueryModal}
        handleClose={handleCloseModal}
        finalUrlRefetch={finalUrlRefetch}
        handleClearDropDown={handleClearDropDown}
      />

      <SaveModal
        isOpen={openSaveModal}
        handleClose={handleCloseSaveModal}
        finalUrl={finalUrl?.final_url}
        allUrlsRefetch={allUrlsRefetch}
      />
    </>
  );
};

export default UserFindJobsPage;
