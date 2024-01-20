import React from "react";
import ReactPaginate from "react-paginate";

import { Box } from "@mui/material";

import styles from "./Pagination.module.css";

import LeftIcon from "@/assets/paginationArrow/LeftIcon";
import RightIcon from "@/assets/paginationArrow/RightIcon";

interface IPagination {
  // @ts-ignore
  data: any[];
  itemPerPage: number;
  handlePageClick: ({ selected }: { selected: number }) => void;
  currentPage: number;
}

const PaginationComponent: React.FC<IPagination> = ({
  data,
  itemPerPage,
  handlePageClick,
  currentPage,
}) => {
  return (
    <Box sx={{ marginTop: "12px", marginBottom: "12px" }}>
      <ReactPaginate
        pageCount={Math.ceil(data?.length / itemPerPage)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        initialPage={currentPage}
        containerClassName={styles.pagination}
        activeClassName={styles.activePage}
        previousLabel={
          <button className={styles.pagination__prev}>
            <LeftIcon />
            Prev
          </button>
        }
        nextLabel={
          <button className={styles.pagination__prev}>
            Next
            <RightIcon />
          </button>
        }
      />
    </Box>
  );
};

export default PaginationComponent;
