import { Formik, Form } from "formik";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import useMediaQuery from '@mui/material/useMediaQuery';  // Для адаптивності
import { useDispatch } from 'react-redux';
import { setProfileData } from '../../redux/slices/profileSlice';  // Імпорт дії з Redux
import { useNavigate } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  borderRadius: '15px',
  maxHeight: '90vh',  // Зменшуємо висоту та додаємо скрол
  overflowY: 'auto',  // Додаємо вертикальний скрол
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
};

export default function RegistrationForm() {
  const dispatch = useDispatch();  // Для оновлення профілю через Redux
  const navigate = useNavigate();

  // Використовуємо медіа-запит для перевірки ширини екрану
  const isMobile = useMediaQuery('(max-width:500px)');

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Registration Profile
      </Typography>

      <Formik
  initialValues={{
    firstName: "",
    lastName: "",
    headline: "",
    country: "",
    city: "",
    birthDate: dayjs()  // Початкове значення для дати
  }}
  onSubmit={(values) => {
    // Оновлюємо профіль через Redux після натискання Save
    dispatch(setProfileData({
      firstName: values.firstName,
      lastName: values.lastName,
      headline: values.headline,
      location: {
        country: values.country,
        city: values.city
      },
      birthDate: values.birthDate
    }));

    // Після успішного збереження, перенаправляємо на сторінку профілю
    navigate('/profile');
  }}
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {isMobile ? (
          <MobileDatePicker
            label="Birth Date"
            inputFormat="MM/DD/YYYY"
            value={values.birthDate}
            onChange={(value) => setFieldValue('birthDate', value)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        ) : (
          <DatePicker
            label="Birth Date"
            inputFormat="MM/DD/YYYY"
            value={values.birthDate}
            onChange={(value) => setFieldValue('birthDate', value)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        )}
      </LocalizationProvider>

      <TextField
        name="headline"
        label="Headline"
        value={values.headline}
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
