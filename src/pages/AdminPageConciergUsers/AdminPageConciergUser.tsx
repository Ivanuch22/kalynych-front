import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Column } from "react-table";

import { Box, CircularProgress, Typography } from "@mui/material";

import { Row } from "@/interfaces/table.interfaces";

import api from "@/services/apiService";

import { IUser } from "@/interfaces/user.interfaces";

import routes from "@/routes";

import styles from "./AdminPageConciergUsrs.module.css";
import { PaginationComponent, TableComponent, TableHeader } from "@/components";

type ColumnWithCustomHeader = Column<Row> & {
  customHeader: React.ReactNode;
};

interface ILinkedUsers {
  users: IUser[];
}

const userPerPage = 4;

const AdminPageConciergUser: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { id } = useParams();

  const getUserByIdQuery = async () =>
    api.get<IUser>(`${routes.editUser}${id}/`).then((res) => res.data);

  async function getAllUserQuery() {
    return api
      .get<ILinkedUsers>(`${routes.getAssignedUsersForAdmin}${id}/`)
      .then((res) => res.data);
  }

  const {
    data: userById,
    isLoading,
    isFetching,
  } = useQuery<IUser>(["getUserByIdQuery", id], getUserByIdQuery);

  const {
    data: linkedUsers,
    isLoading: usersLoading,
    isFetching: usersFetching,
  } = useQuery<ILinkedUsers>(["getAllUserQuery", id], getAllUserQuery);

  const filteredUser = useMemo(
    () => (linkedUsers?.users ? linkedUsers.users : null),
    [linkedUsers?.users]
  );

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
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
    // {
    //   Header: (
    //     <Box sx={{ display: "flex", alignItems: "center" }}>
    //       <Typography
    //         sx={{
    //           fontFamily: "Poppins",
    //           fontSize: "12px",
    //           fontWeight: "400",
    //           lineHeight: "26px",
    //           color: "#343a40",
    //         }}
    //       >
    //         Action
    //       </Typography>
    //     </Box>
    //   ),
    //   accessor: "id",
    //   with: 90,
    //   Cell: ({ row }: { row: any }) => {
    //     const id = row.original.id;
    //     return (
    //       <Box sx={{ display: "flex", alignItems: "center" }}>
    //         <ModeIcon
    //           sx={{ cursor: "pointer", marginLeft: "8px", height: "20px" }}
    //           onClick={() => handleOpenEdit(id)}
    //         />

    //         <Button
    //           onClick={() => handleDeleteOpen(id)}
    //           variant="outlined"
    //           sx={{
    //             color: "#f46a6a",
    //             border: "1px solid #f46a6a",
    //             height: "20px",
    //             fontSize: "10px",
    //             textTransform: "capitalize",
    //             fontWeight: "400",
    //             marginLeft: "8px",
    //             "&:hover": {
    //               backgroundColor: "#f46a6a",
    //               color: "#fff",
    //               border: "none",
    //             },
    //           }}
    //         >
    //           Delete
    //         </Button>
    //       </Box>
    //     );
    //   },
    // },
  ];

  const columnsHeader: ColumnWithCustomHeader[] = [
    {
      Header: "LeftHeader",
      width: 320,
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
            Concierg Linked Users
          </Typography>
        </Box>
      ),
    },
    {
      Header: "RightHeader",
      customHeader: (
        <Typography
          sx={{
            paddingRight: "20px",
            color: " #343a40",
            fontFamily: "Poppins",
            fontSize: "16px;",
            fontWeight: "600",
            lineHeight: "26px",
          }}
        >
          Concierg: {userById?.name}
        </Typography>
      ),
    },
  ];

  const indexOfLastCV = (currentPage + 1) * userPerPage;
  const indexOfFirstCV = indexOfLastCV - userPerPage;
  const currentCVs = filteredUser?.slice(indexOfFirstCV, indexOfLastCV);

  if (usersLoading || usersFetching || isLoading || isFetching)
    return <CircularProgress sx={{ color: "#5A3AB6" }} size={34} />;

  return (
    <Box>
      <TableHeader columns={columnsHeader} />
      <TableComponent
        // resultsFound={resultsFound}
        columns={columns}
        // @ts-ignore
        data={currentCVs}
        isLoading={usersLoading}
      />

      <Box sx={{ marginTop: "32px" }}>
        <PaginationComponent
          // @ts-ignore
          data={filteredUser}
          itemPerPage={userPerPage}
          handlePageClick={handlePageClick}
          currentPage={currentPage}
        />
      </Box>
    </Box>
  );
};

export default AdminPageConciergUser;
