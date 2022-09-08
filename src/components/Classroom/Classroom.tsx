import { useRef, useState } from "react";
import { io } from "socket.io-client";
import Webcam from "./Webcam";
import RemoteWebcam from "./RemoteWebcam";
import { faBlackboard } from "@fortawesome/free-solid-svg-icons";
import DialogContainer from "./DialogContainer";
import ChatRoom from "./ChatRoom";

const Classroom = () => {
    const [room, setRoom] = useState("");
    const [user, setUser] = useState("");

    const [lang, setLang] = useState<string>("en");
    const [isTeacher, setIsTeacher] = useState<boolean | null>(null);

    const getlang = () => {
        return lang;
    };

    const activateRoom = () => {
        if (room && user) {
            if (user !== "" && user !== "") {
                if (user.includes("teacher")) {
                    setIsTeacher(true);
                } else {
                    setIsTeacher(false);
                }
            }
        } else {
            setIsTeacher(null);
        }
    };
    console.log("render2");
    return (
        <>
            <div className="d-flex flex-column classroom-wrapper">
                {isTeacher === null ? (
                    <div className="card custom-card">
                        <div className="card-body d-flex flex-column align-items-center">
                            <h5 className="card-title">
                                <b>Login Form</b>
                            </h5>
                            <hr className="w-100"></hr>
                            <div className="kc-input mt-2">
                                <input type="text" required onChange={(e) => setUser(e.target.value)} value={user} />
                                <span>Username</span>
                            </div>
                            <div className="kc-input mt-3">
                                <input type="text" required onChange={(e) => setRoom(e.target.value)} value={room} />
                                <span>Room Id</span>
                            </div>
                            <button onClick={() => activateRoom()} className="btn main-btn w-25 mt-3">
                                Join
                            </button>
                        </div>
                    </div>
                ) : isTeacher ? (
                    <>
                        <Webcam room={room} username={user} />
                        <div className="mt-3">
                            <ChatRoom username={user} room={room} teacher={true} />
                        </div>
                    </>
                ) : (
                    <>
                        <RemoteWebcam room={room} username={user} getLang={() => getlang()} />
                        <div className="d-flex row">
                            <div className="mt-3 col-md-4 col-12">
                                <DialogContainer
                                    setLang={(e: string) => {
                                        setLang((lang) => e);
                                    }}
                                />
                            </div>
                            <div className="mt-3 col-md-8 col-12">
                                <ChatRoom username={user} room={room} />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div style={{ height: "50px", width: "100%" }}></div>
        </>
    );
};

export default Classroom;
