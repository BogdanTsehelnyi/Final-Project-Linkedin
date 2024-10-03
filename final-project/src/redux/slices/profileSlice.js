import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
    lastName: '',
    headline: '',
    country: '',
    city: '',
    profilePicture: '',
    backgroundProfile: '',
    email: '',
    industry: '',
    experienceTitle: '',
    experianceCompany: '',
    experienceDescription: '',
    educationDegree: '',
    educationFieldOfStudy: '',
    skills: '',
    languages: '',
    proficiency: '',
    certifications: '',

  };

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData(state, action) {
        return { ...state, ...action.payload };
    },
    profileData(state, action) {
        return initialState;
    },
  },
});

export const { profileData, setProfileData } = profileSlice.actions;
export default profileSlice.reducer;
