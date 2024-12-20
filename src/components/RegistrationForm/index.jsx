import React from "react";
import { Formik, Form } from "formik";

import { TextField, Button, Box, Typography, Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { createProfile, fetchProfileByProfileId } from "../../redux/slices/profileSlice";

import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  borderRadius: "15px",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  console.log("userId in RegistrationForm ", userId);

  const handleSubmit = async (values) => {
    if (!userId) {
      console.error("User ID is missing!");
      return;
    }

    try {
      const result = await dispatch(
        createProfile({
          userId,
          name: values.firstName,
          surname: values.lastName,
          birthdate: values.birthDate.toISOString(), // ISO-формат дати
          position: values.position,
          address: `${values.city}, ${values.country}`,
          status: "", // Додати статус за замовчуванням
          headerPhotoUrl: "", // Додати headerPhotoUrl за замовчуванням
        })
      );

      if (result.meta.requestStatus === "fulfilled") {
        const profileId = result.payload.profileId;
        dispatch(fetchProfileByProfileId(profileId));
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  return (
    <Box sx={style}>
      <Typography variant="h6">Registration Profile</Typography>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",

          position: "",
          country: "",
          city: "",
          birthDate: dayjs(),
        }}
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

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
              <DatePicker
                label="Birth Date"
                value={values.birthDate}
                onChange={(value) => setFieldValue("birthDate", value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                sx={{ width: "100%", margin: "20px 0 10px" }}
              />
            </LocalizationProvider>

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

            <Stack spacing={2} direction="row">
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
