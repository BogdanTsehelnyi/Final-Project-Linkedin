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
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
        {profileData.firstName} {profileData.lastName}
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        {profileData.headline}
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        {profileData.email}
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        {profileData.country}, {profileData.city}
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        {profileData.industry}, 
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        {profileData.experienceTitle}
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        {profileData.educationDegree}
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        {profileData.skills}
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        {profileData.languages}, Proficiency: {profileData.proficiency}
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        {profileData.certifications}
        </Typography>

        <Stack spacing={2} direction="row">
                <Button variant="outlined" onClick={handleClose}>Close</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
