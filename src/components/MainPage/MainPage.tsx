import MainView from "./MainView";
import MainSideBar from "./MainSideBar";

const MainSection = () => {
    return (
        <div className="main-container d-flex flex-row gx-0">
            <div className="sidebar-container">
                <MainSideBar />
            </div>

            <div className="main-wrapper flex-fill">
                <MainView />
            </div>
        </div>
    );
};

export default MainSection;
