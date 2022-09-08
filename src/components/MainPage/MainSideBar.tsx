import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchoolFlag, faBars, faCompass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const MainSideBar = () => {
    const [toggle, setToggle] = useState<boolean>(false);
    // const sidebarWidth = toggle ? "col-lg-2 col-md-3 col-6" : "col-3 col-sm-2 col-md-1";
    return (
        <div className={`sidebar-wrapper gx-0 ${toggle ? "open" : ""}`}>
            <ul className={`sidebar`}>
                <li className="sidebar-item">
                    <Link to="#" onClick={() => setToggle(!toggle)} className="sidebar-item-link">
                        <FontAwesomeIcon icon={faBars} />
                        <span className="sidebar-item-text">Menu</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/page_selection" className="sidebar-item-link">
                        <FontAwesomeIcon icon={faCompass} />
                        <span className="sidebar-item-text">Navigation</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/classroom" className="sidebar-item-link">
                        <FontAwesomeIcon icon={faSchoolFlag} />
                        <span className="sidebar-item-text">Classroom</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default MainSideBar;
