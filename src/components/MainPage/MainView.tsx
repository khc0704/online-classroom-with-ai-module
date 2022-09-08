import { Routes, Route, Navigate } from "react-router-dom";
import Classroom from "../Classroom/Classroom";

const MainView = () => {
    return (
        <>
            <Routes>
                <Route path="/main" element={<Navigate to="/classroom" />} />
                <Route path="/classroom" element={<Classroom />} />
            </Routes>
        </>
    );
};

export default MainView;
