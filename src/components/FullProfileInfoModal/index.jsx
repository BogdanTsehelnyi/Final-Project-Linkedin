import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
// import { fetchProfile } from "../../redux/slices/profileSlice";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "600px",
  height: "auto",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  border: "1px solid #e0dfdc",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  // boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
};

const typographyStyle = {
  borderBottom: "1px solid #ccc",
  marginBottom: "10px",
};

export default function FullProfileInfoModal({ open, handleClose }) {
  const { profileData, loading, error } = useSelector((state) => state.profile);
  const email = useSelector((state) => state.auth.email);

  if (loading) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CircularProgress />
        </Box>
      </Modal>
    );
  }

  if (error && typeof error === "object") {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="body2" color="error">
            Error: {error.message || "An unexpected error occurred"}
          </Typography>
        </Box>
      </Modal>
    );
  }

  if (!profileData || Object.keys(profileData).length === 0) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="body2">No profile data available.</Typography>
        </Box>
      </Modal>
    );
  }

  const {
    name = "N/A",
    surname = "N/A",
    birthdate = "N/A",
    status = "N/A",
    position = "N/A",
    address = "N/A",
  } = profileData;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2" sx={typographyStyle}>
          {name} {surname}
        </Typography>

        <Typography id="modal-modal-email" variant="body1" sx={typographyStyle}>
          Email: {email}
        </Typography>

        <Typography id="modal-modal-position" variant="body1" sx={typographyStyle}>
          Specialization: {position}
        </Typography>

        <Typography id="modal-modal-status" variant="body1" sx={typographyStyle}>
          Status: {status}
        </Typography>

        <Typography id="modal-modal-birthdate" variant="body1" sx={typographyStyle}>
          Birthdate: {new Date(birthdate).toLocaleDateString()}
        </Typography>

        <Typography id="modal-modal-address" variant="body1" sx={typographyStyle}>
          Address: {address}
        </Typography>

        {/* <Typography id="modal-modal-createAt" variant="body1" sx={typographyStyle}>
          Profile was created: {new Date(createAt).toLocaleDateString()}
        </Typography> */}

        <Stack spacing={2} direction="row" sx={{ mt: 3 }}>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
