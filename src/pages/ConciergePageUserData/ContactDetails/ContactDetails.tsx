import React from "react";

import { Box, TextField, Typography } from "@mui/material";

import { IUser } from "@/interfaces/user.interfaces";

import styles from "./ContactDetails.module.css";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneIcon from "@mui/icons-material/Phone";
import MapIcon from "@mui/icons-material/Map";
import LinkedInIcon from "@mui/icons-material/LinkedIn";


interface IContactForm {
  user: IUser | null;
}

const ContactDetails: React.FC<IContactForm> = ({ user }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "666px",
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
        Job Profile
      </Typography>
      <form className={styles.formStyles}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PermIdentityIcon sx={{ display: "flex" }} />
          <Box
            sx={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
          >
            <TextField
              disabled
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
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}>
          <PermIdentityIcon sx={{ display: "flex" }} />
          <Box
            sx={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
          >
            <TextField
              defaultValue={user?.preferred_name || ""}
              disabled
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
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}>
          <PhoneIcon sx={{ display: "flex" }} />
          <Box
            sx={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
          >
            <TextField
              defaultValue={user?.phone_number || ""}
              disabled
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
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}>
          <PhoneIcon sx={{ display: "flex" }} />
          <Box
            sx={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
          >
            <TextField
              defaultValue={user?.phone_number_type || ""}
              disabled
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
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}>
          <MapIcon sx={{ display: "flex" }} />
          <Box
            sx={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
          >
            <TextField
              defaultValue={user?.address || ""}
              disabled
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
            />
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
              disabled
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
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "12px",
            }}
          >
            <TextField
              defaultValue={user?.state || ""}
              disabled
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
              label="State"
              variant="outlined"
            />
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
              disabled
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
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", marginTop: "24px" }}>
          <LinkedInIcon sx={{ display: "flex" }} />
          <Box
            sx={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
          >
            <TextField
              defaultValue={user?.linkedin || ""}
              disabled
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
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ContactDetails;
