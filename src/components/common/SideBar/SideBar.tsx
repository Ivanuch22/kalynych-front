import React from "react";
import { NavLink } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import routes from "@/routes";

import { useAuth } from "@/context/Auth";

import { RoleEnums } from "@/enums";

import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import WorkIcon from "@mui/icons-material/Work";
import ForumIcon from "@mui/icons-material/Forum";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

import styles from "./SideBar.module.css";

const SideBar: React.FC = () => {
  const { role } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#000000",
        padding: "16px 32px 16px 32px",
        height: "calc(100vh - 32px)",
        maxWidth: "200px",
        justifyContent: "center",
      }}
    >
      {(role === RoleEnums.Admin || role === RoleEnums.User) && (
        <NavLink
          to={routes.jobsDescriptions}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <WorkIcon sx={{ color: "#555B6D", height: "16px", fill: "#fff" }} />
          <Typography className={styles.text}>My Target Jobs</Typography>
        </NavLink>
      )}

      {(role === RoleEnums.Admin || role === RoleEnums.User) && (
        <NavLink
          to={routes.index}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <ForumIcon
            sx={{
              color: "#555B6D",
              height: "16px",
              fill: "#fff",
            }}
          />
          <Typography className={styles.text}>Ace My Interview</Typography>
        </NavLink>
      )}

      {(role === RoleEnums.Admin || role === RoleEnums.User) && (
        <NavLink
          to={routes.cv}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <InsertDriveFileIcon
            sx={{ color: "#555B6D", height: "16px", fill: "#fff" }}
          />
          <Typography className={styles.text}>My Resumes</Typography>
        </NavLink>
      )}

      {role === RoleEnums.User && (
        <NavLink
          to={routes.userFindJob}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <ContentPasteSearchIcon
            sx={{
              color: "#555B6D",
              height: "16px",
              fill: "#fff",
            }}
          />
          <Typography className={styles.text}>Find Jobs</Typography>
        </NavLink>
      )}

      {role === RoleEnums.Concierge && (
        <NavLink
          to={routes.conciergDashBoard}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <ModeStandbyIcon
            sx={{ color: "#555B6D", height: "16px", fill: "#fff" }}
          />
          <Typography className={styles.text}>Dashboard</Typography>
        </NavLink>
      )}

      {role === RoleEnums.Concierge && (
        <NavLink
          to={routes.conceirgePage}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <SupervisorAccountIcon
            sx={{ color: "#555B6D", height: "16px", fill: "#fff" }}
          />
          <Typography className={styles.text}>My Clients</Typography>
        </NavLink>
      )}

      {role === RoleEnums.Concierge && (
        <NavLink
          to={routes.userJobs}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <WorkIcon sx={{ color: "#555B6D", height: "16px", fill: "#fff" }} />
          <Typography className={styles.text}>Target Jobs</Typography>
        </NavLink>
      )}

      <NavLink
        to={routes.ideasPage}
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        <LightbulbIcon
          sx={{ color: "#555B6D", height: "16px", fill: "#fff" }}
        />
        <Typography className={styles.text}>Ideas</Typography>
      </NavLink>

      {role === RoleEnums.Admin && (
        <NavLink
          to={routes.adminPage}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <AdminPanelSettingsIcon
            sx={{ color: "#555B6D", height: "16px", fill: "#fff" }}
          />
          <Typography className={styles.text}>Admin Page</Typography>
        </NavLink>
      )}

      {role === RoleEnums.Admin && (
        <NavLink
          to={routes.usersPage}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <PeopleAltIcon
            sx={{ color: "#555B6D", height: "16px", fill: "#fff" }}
          />
          <Typography className={styles.text}>All Users</Typography>
        </NavLink>
      )}
    </Box>
  );
};

export default SideBar;
