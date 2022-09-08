import "./index.scss";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import App from "../components/App/App";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(<App />);
} // createRoot(container!) if you use TypeScript
