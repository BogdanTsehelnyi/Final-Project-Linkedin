import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';  

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,  // Збільшено ширину модалки
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',  // Додаємо округлі краї
};

const typographyStyle = {
  borderBottom: '1px solid #ccc',  // Нижня лінія
  paddingBottom: '10px',           // Відступ до бордера
  marginBottom: '15px',            // Відступ після елемента
};

export default function FullProfileInfoModal({ open, handleClose }) {

  const profileData = useSelector((state) => state.profile);

  return (
    <Modal
      open={open}
      onClose={handleClose}  // Закриваємо модалку через Redux
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/* Застосовуємо стиль з нижнім бордером для кожного елементу */}
        <Typography id="modal-modal-title" variant="h5" component="h2" sx={typographyStyle}>
          {profileData.firstName} {profileData.lastName}
        </Typography>

        <Typography id="modal-modal-description" variant="subtitle1" component="p" sx={typographyStyle}>
          {profileData.headline}
        </Typography>

        <Typography id="modal-modal-email" variant="body1" sx={typographyStyle}>
          Email: {profileData.email}
        </Typography>

        <Typography id="modal-modal-location" variant="body1" sx={typographyStyle}>
          Location: {profileData.country}, {profileData.city}
        </Typography>

        <Typography id="modal-modal-industry" variant="body1" sx={typographyStyle}>
          Industry: {profileData.industry}
        </Typography>

        <Typography id="modal-modal-experience" variant="body1" sx={typographyStyle}>
          Experience: {profileData.experienceTitle}
        </Typography>

        <Typography id="modal-modal-education" variant="body1" sx={typographyStyle}>
          Education: {profileData.educationDegree}
        </Typography>

        <Typography id="modal-modal-languages" variant="body1" sx={typographyStyle}>
          Languages: {profileData.languages}, Proficiency: {profileData.proficiency}
        </Typography>

        <Typography id="modal-modal-certifications" variant="body1" sx={typographyStyle}>
          Certifications: {profileData.certifications}
        </Typography>

        {/* Додаємо додатковий відступ навколо кнопки */}
        <Stack spacing={2} direction="row" sx={{ mt: 3 }}>
          <Button variant="outlined" onClick={handleClose}>Close</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
