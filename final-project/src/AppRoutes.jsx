import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile/Profile";



export default function AppRoutes() {
    return (
        <>  
        <Routes>
        <Route path='/profile' element={<Profile />} />
        </Routes>
        </>
    )
}
