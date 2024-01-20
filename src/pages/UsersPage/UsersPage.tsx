import React, { useCallback, useEffect, useState } from "react";
import { Column } from "react-table";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import {
  Filtering,
  PaginationComponent,
  TableComponent,
  TableHeader,
} from "@/components";

import { usePage } from "@/context/PageNaming";

import { EditUserModal } from "./EditUserModal";

import { IUser } from "@/interfaces/user.interfaces";
import { Row } from "@/interfaces/table.interfaces";

import { DeleteUserModal } from "./DeleteModal";

import routes from "@/routes";

import api from "@/services/apiService";

import styles from "./UsersPage.module.css";

import ModeIcon from "@mui/icons-material/Mode";
import SearchIcon from "@/assets/usersPage/searchIcon";
import ClearIcon from "@/assets/usersPage/clearIcon";

type ColumnWithCustomHeader = Column<Row> & {
  customHeader: React.ReactNode;
};

const userPerPage = 4;

const sortOption = ["admin", "user", "concierge"];

const UsersPage: React.FC = () => {
  const { setPageName } = usePage();
  const [resultsFound, setResultsFound] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [userEditId, setUserToEditId] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<string>();
  const [userEdit, setUserToEdit] = useState<IUser | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [previousData, setPreviousData] = useState<IUser[]>([]);
  const [typeOfMethod, setTypeOfMethod] = useState<string>("user");

  const getAllUsersQuery = async () =>
    api
      .get<IUser[]>(
        `${routes.getAllUsers}?search=${searchValue}&ordering=name&role=${
          typeOfMethod ? typeOfMethod : ""
        }`
      )
      .then((res) => res.data);

  const getUserByIdQuery = async () =>
    api.get<IUser>(`${routes.editUser}${userEditId}/`).then((res) => res.data);

  const {
    data: userById,
    isLoading: userLoading,
    isFetching: userFetching,
    refetch: userByIdRefetch,
  } = useQuery<IUser>(["getUserByIdQuery", userEditId], getUserByIdQuery, {
    enabled: false,
  });

  const { data, isLoading, refetch } = useQuery<IUser[]>(
    ["getAllUsersQuery", typeOfMethod, searchValue],
    getAllUsersQuery,
    { enabled: false }
  );

  useEffect(() => {
    if (data) {
      setPreviousData(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
    setPageName("All users");
  }, []);

  useEffect(() => {
    userById?.id && setUserToEdit(userById);
  }, [userById]);

  useEffect(() => {
    userEditId && userByIdRefetch();
  }, [userEditId]);

  useEffect(() => {
    refetch();
  }, [typeOfMethod]);

  const currentData = data || previousData;

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleDeleteOpen = useCallback((id: string) => {
    setOpenDeleteDialog(true);
    setUserToDelete(id);
  }, []);

  const handleOpenEdit = useCallback((id: string) => {
    setOpenEditDialog(true);
    setUserToEditId(id);
    setUserToEdit(null);
  }, []);

  const handleClearSearch = async () => {
    setSearchValue("");
    refetch();
  };

  const handleCloseEditModal = () => {
    setOpenEditDialog(false);
    setUserToEditId(null);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteDialog(false);
  };

  const handleSearch = async () => {
    await refetch();
  };

  const columns = [
    {
      Header: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "26px",
              color: "#343a40",
            }}
          >
            Name
          </Typography>
        </Box>
      ),
      accessor: "name",
      width: 110,
      Cell: ({ row }: { row: any }) => {
        if (row.original.role === "concierge") {
          return (
            <Link
              className={styles.linkStyle}
              to={`${routes.conceirgePageUsers}${row.original.id}`}
            >
              {row.original.name}
            </Link>
          );
        } else {
          return (
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "10px",
                fontWeight: "400",
                color: "#343a40",
              }}
            >
              {row.original.name}
            </Typography>
          );
        }
      },
    },
    {
      Header: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "26px",
              color: "#343a40",
            }}
          >
            Email
          </Typography>
        </Box>
      ),
      accessor: "email",
      width: 170,
    },
    {
      Header: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "26px",
              color: "#343a40",
            }}
          >
            Role
          </Typography>
        </Box>
      ),
      accessor: "role",
      width: 110,
    },
    {
      Header: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "26px",
              color: "#343a40",
            }}
          >
            Status
          </Typography>
        </Box>
      ),
      accessor: "status",
      width: 110,
    },
    {
      Header: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "26px",
              color: "#343a40",
            }}
          >
            Requested tokens
          </Typography>
        </Box>
      ),
      accessor: "requested_tokens",
      width: 110,
    },
    {
      Header: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "26px",
              color: "#343a40",
            }}
          >
            Action
          </Typography>
        </Box>
      ),
      accessor: "id",
      with: 90,
      Cell: ({ row }: { row: any }) => {
        const id = row.original.id;
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ModeIcon
              sx={{ cursor: "pointer", marginLeft: "8px", height: "20px" }}
              onClick={() => handleOpenEdit(id)}
            />

            <Button
              onClick={() => handleDeleteOpen(id)}
              variant="outlined"
              sx={{
                color: "#f46a6a",
                border: "1px solid #f46a6a",
                height: "20px",
                fontSize: "10px",
                textTransform: "capitalize",
                fontWeight: "400",
                marginLeft: "8px",
                "&:hover": {
                  backgroundColor: "#f46a6a",
                  color: "#fff",
                  border: "none",
                },
              }}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  const columnsHeader: ColumnWithCustomHeader[] = [
    {
      Header: "LeftHeader",
      width: 120,
      customHeader: (
        <Box sx={{ padding: "20px" }}>
          <Typography
            sx={{
              color: " #343a40",
              fontFamily: "Poppins",
              fontSize: "16px;",
              fontWeight: "600",
              lineHeight: "26px",
            }}
          >
            Users
          </Typography>
        </Box>
      ),
    },
    {
      Header: "RightHeader",
      customHeader: (
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            placeholder="Search"
            className={styles.inputSearch}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              padding: "2px 8px",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              borderRadius: "4px",
            }}
          >
            <SearchIcon className={styles.searchIcon} />
            {searchValue.length ? (
              <ClearIcon
                onClick={handleClearSearch}
                className={styles.clearIcon}
              />
            ) : (
              ""
            )}
            <button className={styles.btnSearch} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      ),
    },
  ];

  const indexOfLastCV = (currentPage + 1) * userPerPage;
  const indexOfFirstCV = indexOfLastCV - userPerPage;
  const currentCVs = currentData?.slice(indexOfFirstCV, indexOfLastCV);

  return (
    <>
      <Box
        sx={{
          width: "700px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "2px",
          boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
          marginTop: "24px",
          height: "70vh",
          overflow: "auto",
        }}
      >
        <TableHeader columns={columnsHeader} />
        <Box
          sx={{
            width: "100%",
            background: "#fff",
            paddingTop: "14px",
            paddingBottom: "14px",
            borderBottom: "1px solid #eff2f7",
          }}
        >
          <Filtering
            sortOption={sortOption}
            setTypeOfMethod={setTypeOfMethod}
            typeOfMethod={typeOfMethod}
          />
        </Box>

        <TableComponent
          resultsFound={resultsFound}
          columns={columns}
          data={currentCVs}
          isLoading={isLoading}
        />

        <EditUserModal
          isOpen={openEditDialog}
          handleClose={handleCloseEditModal}
          refetch={refetch}
          userToEdit={userEdit}
          userLoading={userLoading}
          userFetching={userFetching}
        />
      </Box>

      <PaginationComponent
        data={currentData}
        itemPerPage={userPerPage}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
      />

      <DeleteUserModal
        refetch={refetch}
        userId={userToDelete}
        isOpen={openDeleteDialog}
        handleClose={handleCloseDeleteModal}
      />
    </>
  );
};

export default UsersPage;
