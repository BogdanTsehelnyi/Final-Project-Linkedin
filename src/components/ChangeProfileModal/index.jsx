import { Formik, Form } from "formik";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../redux/slices/profileSlice";
import { handleCloseProfileModal } from "../../redux/slices/modal";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { successNotify, errorNotify } from "../../utils/modalNotification";

export default function ChangeProfileModal() {
  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: "80%",
    overflow: "auto",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    // border: "1px solid #e0dfdc",
    // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };

  const { profileData, profileId } = useSelector((state) => state.profile);

  const userId = useSelector((state) => state.auth.userId);

  const open = useSelector((state) => state.changeProfileModal.openProfileModal);

  if (!profileData || Object.keys(profileData).length === 0) {
    return null;
  }

  const handleSubmit = async (values) => {
    if (!userId || !profileId) {
      console.error("Required IDs are missing!");
      alert("Required IDs are missing!");
      return;
    }

    try {
      const result = await dispatch(
        updateProfile({
          newProfileData: {
            userId,
            name: values.firstName,
            surname: values.lastName,
            birthdate: values.birthDate.toISOString(),
            position: values.position,
            address: `${values.city}, ${values.country}`,
            status: values.status || "",
            headerPhotoUrl: values.headerPhotoUrl || "",
          },
          profileId,
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        dispatch(handleCloseProfileModal());
        successNotify("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      errorNotify("Error updating profile");
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => dispatch(handleCloseProfileModal())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Profile
        </Typography>

        <Formik
          initialValues={{
            firstName: profileData.name || "",
            lastName: profileData.surname || "",
            birthDate: profileData.birthdate ? dayjs(profileData.birthdate) : dayjs(),
            position: profileData.position || "",
            country: profileData.address?.split(", ")[1] || "",
            city: profileData.address?.split(", ")[0] || "",
            status: profileData.status || "",
            headerPhotoUrl: profileData.headerPhotoUrl || "",
          }}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <TextField
                name="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="lastName"
                label="Last Name"
                value={values.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />

              <TextField
                name="position"
                label="Specialization"
                value={values.position}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="country"
                label="Country"
                value={values.country}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="city"
                label="City"
                value={values.city}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="status"
                label="Status"
                value={values.status}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <DatePicker
                  label="Birth Date"
                  value={values.birthDate}
                  onChange={(value) => setFieldValue("birthDate", value)}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                  sx={{ width: "100%", margin: "20px 0" }}
                />
              </LocalizationProvider>
              <Stack spacing={2} direction="row">
                <Button type="submit" variant="contained">
                  Save Changes
                </Button>
                <Button variant="outlined" onClick={() => dispatch(handleCloseProfileModal())}>
                  Cancel
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
