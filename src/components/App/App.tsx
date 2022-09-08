import appCss from "./App.module.scss";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import MainSelection from "../SelectionPage/SelectionPage";
import { socket, SocketContext } from "../../providers/SocketProvider";

const App = () => {
    return (
        <>
            <SocketContext.Provider value={socket}>
                <div className="h-100 w-100 app-wrapper">
                    <Router>
                        <Routes>
                            <Route path="/" element={<Navigate to="/main_selection" />} />
                            <Route path="/page_selection" element={<MainSelection />} />
                            <Route path="/*" element={<MainPage />} />
                        </Routes>
                    </Router>
                </div>
            </SocketContext.Provider>
        </>
    );
};

export default App;
