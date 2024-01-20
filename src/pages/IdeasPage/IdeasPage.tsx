import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { PaginationComponent, TableComponent, TableHeader } from "@/components";

import CreateNewIdea from "./CreateNewIdea/CreateNewIdea";

import { IFeature } from "@/interfaces/feature.interface";
import { Row } from "@/interfaces/table.interfaces";

import { USER } from "@/constants";

import { usePage } from "@/context/PageNaming";

import routes from "@/routes";

import api from "@/services/apiService";

import styles from "./IdeasPage.module.css";

import SearchIcon from "@/assets/usersPage/searchIcon";
import ClearIcon from "@/assets/usersPage/clearIcon";
import LikeIcon from "@/assets/feature/likeIcon";
import LikeGoldIcon from "@/assets/feature/likedIconGold";
import PlusIcon from "@/assets/cvpage/PlusIcon";

type ColumnWithCustomHeader = Column<Row> & {
  customHeader: React.ReactNode;
};

interface IVote {
  feature_id: number;
}

const ideasPerPage = 4;

const IdeasPage: React.FC = () => {
  const { setPageName } = usePage();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [previousData, setPreviousData] = useState<IFeature[]>([]);
  const [selectedFeatureId, setSelectedFeatureId] = useState<number | null>(
    null
  );

  const getAllFeaturesQuery = async () => {
    const url = searchValue
      ? `${routes.getAllFeatures}?search=${searchValue}?ordering=name`
      : `${routes.getAllFeatures}?ordering=name`;

    return api.get<IFeature[]>(url).then((res) => res.data);
  };

  const voteQuery = (data: IVote) =>
    api.post(routes.vote, data).then((res) => res.data);

  const unVoteQuery = (data: IVote) =>
    api.post(routes.unVote, data).then((res) => res.data);

  const { mutateAsync: unVoteIdea, isLoading: unvoteIsLoading } = useMutation(
    "unVoteQuery",
    (data: IVote) => unVoteQuery(data),
    {
      onSuccess: () => {
        toast.success("Down voted!");
        refetch();
      },
    }
  );

  const { mutateAsync: createNewIdea, isLoading: voteIsLoading } = useMutation(
    "voteQuery",
    (data: IVote) => voteQuery(data),
    {
      onSuccess: () => {
        toast.success("Up voted!");
        refetch();
      },
    }
  );

  const { data, isLoading, refetch } = useQuery<IFeature[]>({
    queryKey: ["getAllFeaturesQuery", { searchValue }],
    queryFn: getAllFeaturesQuery,
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      setPreviousData(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setPageName("Ideas");
  }, []);

  const currentData = data || previousData;

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleClearSearch = async () => {
    setSearchValue("");
    refetch();
  };

  const handleSearch = async () => {
    await refetch();
  };

  const handleVote = async (id: number) => {
    setSelectedFeatureId(id);
    const data = {
      feature_id: id,
    };
    try {
      await createNewIdea(data);
    } finally {
      setSelectedFeatureId(null);
    }
  };

  const handleDownVote = async (id: number) => {
    setSelectedFeatureId(id);
    const data = {
      feature_id: id,
    };
    try {
      await unVoteIdea(data);
    } finally {
      setSelectedFeatureId(null);
    }
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
            Text
          </Typography>
        </Box>
      ),
      accessor: "text",
      width: 110,
    },
    {
      Header: (
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "26px",
              color: "#343a40",
            }}
          >
            Vote
          </Typography>
        </Box>
      ),
      accessor: "votes",
      width: 90,
      Cell: ({ value }: { value: number }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LikeGoldIcon />
            {value}
          </div>
        </div>
      ),
    },
    {
      Header: (
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
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
        </div>
      ),
      accessor: "id",
      with: 90,
      Cell: ({ row }: { row: any }) => {
        let isUserVoted;
        const featureId = row.original.id;
        const currentFeature = currentData.find(
          (feature) => feature.id === featureId
        );
        const userVotedIds = currentFeature?.voted_users || [];

        const user = localStorage.getItem(USER);

        if (user) {
          const parsedUser = JSON.parse(user);
          isUserVoted = userVotedIds.includes(parsedUser.id);
        }

        return (
          <div className={styles.btnWrapper}>
            {selectedFeatureId === featureId &&
            (voteIsLoading || unvoteIsLoading) ? (
              <CircularProgress sx={{ color: "#5A3AB6" }} size={24} />
            ) : isUserVoted ? (
              <Button
                sx={{
                  backgroundColor: "#495057",
                  color: "#fff",
                  height: "20px",
                  fontSize: "10px",
                  textTransform: "capitalize",
                  fontWeight: "400",
                  "&:hover": {
                    backgroundColor: "#5A3AB6",
                    color: "#fff",
                  },
                }}
                onClick={() => handleDownVote(row.original.id)}
              >
                Down Vote
              </Button>
            ) : (
              <Button
                startIcon={<LikeIcon className={styles.icon} />}
                sx={{
                  backgroundColor: "#5A3AB6",
                  color: "#fff",
                  height: "20px",
                  fontSize: "10px",
                  textTransform: "capitalize",
                  fontWeight: "400",
                  "&:hover": {
                    backgroundColor: "#5A3AB6",
                    color: "#fff",
                  },
                }}
                onClick={() => handleVote(row.original.id)}
              >
                Up Vote
              </Button>
            )}
          </div>
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
            Ideas
          </Typography>
        </Box>
      ),
    },
    {
      Header: "RightHeader",
      // width: 230,
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

  const indexOfLastCV = (currentPage + 1) * ideasPerPage;
  const indexOfFirstCV = indexOfLastCV - ideasPerPage;
  const currentCVs = currentData?.slice(indexOfFirstCV, indexOfLastCV);

  return (
    <>
      <Box
        sx={{
          width: "500px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "2px",
          boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
          padding: "14px",
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
                paddingRight: "20px",
              }}
            >
              <Button
                startIcon={<PlusIcon className={styles.iconPlus} />}
                sx={{
                  backgroundColor: "#5A3AB6",
                  color: "#fff",
                  height: "20px",
                  fontSize: "10px",
                  textTransform: "capitalize",
                  fontWeight: "400",
                  "&:hover": {
                    backgroundColor: "#5A3AB6",
                    color: "#fff",
                  },
                }}
                onClick={() => setModalOpen(true)}
              >
                Create new Idea
              </Button>
            </Box>
          </Box>
        </Box>

        <TableComponent
          columns={columns}
          data={currentCVs}
          isLoading={isLoading}
        />

        <CreateNewIdea
          isOpen={modalOpen}
          handleClose={() => setModalOpen(false)}
          refetch={refetch}
        />
      </Box>

      <PaginationComponent
        data={currentData}
        itemPerPage={ideasPerPage}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
      />
    </>
  );
};

export default IdeasPage;
