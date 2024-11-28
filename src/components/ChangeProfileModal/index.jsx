import { Formik, Form } from "formik";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/slices/profileSlice'; // Використовуємо PUT дію
import { handleCloseProfileModal } from '../../redux/slices/modal'; // Дія для закриття модалки

// Стиль для модалки
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ChangeProfileModal() {
  const dispatch = useDispatch();

  // Отримуємо дані профілю з Redux
  const { profileData } = useSelector((state) => state.profile);
  const open = useSelector((state) => state.changeProfileModal.openProfileModal);

  // Перевіряємо, чи є дані профілю перед рендерингом форми
  if (!profileData || Object.keys(profileData).length === 0) {
    return null; // Тут можна додати спінер замість повернення null
  }

  // Розділяємо адресу на місто і країну
  const [city, country] = profileData.address ? profileData.address.split(', ') : ["", ""];

  return (
    <Modal
      open={open}
      onClose={() => dispatch(handleCloseProfileModal())} // Закриваємо модалку через Redux
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
            position: profileData.position || "",
            status: profileData.status || "",
            country: country,
            city: city,
          }}
          enableReinitialize={true} // Ця опція дозволяє повторно ініціалізувати форму при зміні значень
          onSubmit={(values) => {
            // Формуємо новий об’єкт профілю
            const updatedProfile = {
              ...profileData,
              name: values.firstName,
              surname: values.lastName,
              position: values.position,
              status: values.status,
              address: `${values.city}, ${values.country}`,
            };

            // Оновлюємо профіль через PUT-запит
            dispatch(updateProfile({ profileId: profileData.profileId, profileData: updatedProfile }));
            dispatch(handleCloseProfileModal()); // Закриваємо модалку після збереження
          }}
        >
          {({ values, handleChange }) => (
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
                label="Position"
                value={values.position}
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
                <Button type="submit" variant="contained">Save Changes</Button>
                <Button variant="outlined" onClick={() => dispatch(handleCloseProfileModal())}>Cancel</Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
