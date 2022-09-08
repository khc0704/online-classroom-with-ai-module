import { Link } from "react-router-dom";

const MainSelection = () => {
    const home = {
        "--clr": "#00ade1",
    } as React.CSSProperties;
    const about = {
        "--clr": "#ff6493",
    } as React.CSSProperties;
    const strean = {
        "--clr": "#ffdd1c",
    } as React.CSSProperties;
    const contact = {
        "--clr": "#00dc82",
    } as React.CSSProperties;
    return (
        <div className="d-flex justify-content-center align-items-center selection-page">
            <ul>
                <li style={home}>
                    <Link data-text="&nbsp;Home" to="/main">
                        &nbsp;Home
                    </Link>
                </li>
                <li style={about}>
                    <Link data-text="&nbsp;About" to="/classroom">
                        &nbsp;About
                    </Link>
                </li>
                <li style={strean}>
                    <Link data-text="&nbsp;Stream" to="/classroom">
                        &nbsp;Stream
                    </Link>
                </li>
                <li style={contact}>
                    <Link data-text="&nbsp;Contact" to="/classroom">
                        &nbsp;Contact
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default MainSelection;
