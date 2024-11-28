import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchProfileById } from '../../redux/slices/profileSlice'; 
import { useSelector, useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',           // Зменшили ширину до 90% екрана
  maxWidth: '600px',       // Максимальна ширина - 600px
  height: '80%',           // Зменшили висоту до 80% екрана
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  overflowY: 'auto',       // Додаємо вертикальну прокрутку
  display: 'flex',         // Додаємо flex для вертикального розміщення
  flexDirection: 'column',
};

const typographyStyle = {
  borderBottom: '1px solid #ccc',
  marginBottom: '10px',
};

export default function FullProfileInfoModal({ open, handleClose }) {
  const dispatch = useDispatch();

  const { profileData, loading, error } = useSelector((state) => state.profile);
  
  useEffect(() => {
    if (open) {
      dispatch(fetchProfileById()); // Завантажуємо профіль, якщо модалка відкрита
    }
  }, [dispatch, open]);

  if (loading) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CircularProgress />
        </Box>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="body2" color="error">
            Error: {error}
          </Typography>
        </Box>
      </Modal>
    );
  }

  // Перевірка наявності профілю
  if (!profileData || Object.keys(profileData).length === 0) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="body2">No profile data available.</Typography>
        </Box>
      </Modal>
    );
  }

  // Деструктуризація даних з профілю
  const {
    firstName = "N/A",
    lastName = "N/A",
    headline = "N/A",
    email = "N/A",
    location = { country: "N/A", city: "N/A" },
    industry = "N/A",
    experience = [],
    education = [],
    certifications = [],
    languages = []
  } = profileData;

  // Функція для відображення списку даних
  const renderList = (title, data, renderItem) => (
    <Typography variant="body1" sx={typographyStyle}>
      {title}:
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{renderItem(item)}</li>
          ))}
        </ul>
      ) : (
        <ul>
          <li>No {title.toLowerCase()} available</li>
        </ul>
      )}
    </Typography>
  );

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2" sx={typographyStyle}>
          {firstName} {lastName}
        </Typography>

        <Typography id="modal-modal-description" variant="subtitle1" component="p" sx={typographyStyle}>
          {headline}
        </Typography>

        <Typography id="modal-modal-email" variant="body1" sx={typographyStyle}>
          Email: {email}
        </Typography>

        <Typography id="modal-modal-location" variant="body1" sx={typographyStyle}>
          Location: {location.country}, {location.city}
        </Typography>

        <Typography id="modal-modal-industry" variant="body1" sx={typographyStyle}>
          Industry: {industry}
        </Typography>

        {renderList('Experience', experience, (exp) => (
          `${exp.title} at ${exp.company} (${exp.startDate} - ${exp.endDate || "Present"})`
        ))}

        {renderList('Education', education, (edu) => (
          `${edu.degree} in ${edu.fieldOfStudy} (${edu.startDate} - ${edu.endDate})`
        ))}

        {renderList('Languages', languages, (lang) => (
          `${lang.language} (Proficiency: ${lang.proficiency})`
        ))}
        
        {renderList('Certifications', certifications, (cert) => (
          `${cert.name} - ${cert.authority} (${cert.date})`
        ))}

        <Stack spacing={2} direction="row" sx={{ mt: 3 }}>
          <Button variant="outlined" onClick={handleClose}>Close</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
