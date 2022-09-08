import { useEffect, useRef, useState } from "react";
import { socket } from "../../providers/SocketProvider";

const ChatRoom = (props: any) => {
    const localStream = useRef<HTMLVideoElement>(null);
    const localMessage = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<string[]>([]);
    const [signed, setSigned] = useState<string[]>([]);
    const cnv = document.createElement("canvas");
    const ctx = cnv.getContext("2d");

    const sign = () => {
        if (localStream?.current?.srcObject) {
            cnv.width = localStream?.current.videoWidth;
            cnv.height = localStream?.current.videoHeight;

            ctx?.drawImage(localStream.current, 0, 0, cnv.width, cnv.height);
            socket.emit("sign", {
                room: props.room,
                username: props.username,
                face: cnv.toDataURL("image/jpeg", 1),
            });
        }
    };

    const send = () => {
        if (localMessage?.current?.value) {
            socket.emit("message", {
                room: props.room,
                username: props.username,
                message: localMessage?.current?.value,
            });
            localMessage.current.value = "";
        }
    };

    const startCam = (stream: MediaStream) => {
        if (localStream?.current) {
            localStream.current.srcObject = stream;
            localStream.current.play();
        }
    };

    const onMessage = () => {
        socket.on("on_message", (data) => {
            const newM = data?.username + " : " + data?.message;
            console.log(data);
            setMessage((message) => [...message, newM]);
        });
    };

    const onStart = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then((stream) => {
                startCam(stream);
                console.log(stream.getVideoTracks()[0]);
            });
    };
    const onSign = () => {
        socket.on("on_sign", (data) => {
            if (signed.includes(data?.username) === false) {
                console.log(data);
                setSigned((signed) => [...signed, data?.username]);
            }
        });
    };

    useEffect(() => {
        if (props?.teacher !== true) {
            onStart();
        } else {
            onSign();
        }
        onMessage();
    }, []);

    return (
        <>
            <div className="card chatroom-card">
                <div className="card-body w-100 d-flex row">
                    <div className="chatroom-box-wrapper col-md-8 d-flex flex-column">
                        <h5 className="my-0 ms-2 mt-2" style={{ color: "var(--custom-green)", opacity: "0.8" }}>
                            ChatRoom
                        </h5>
                        <hr
                            className="my-3 mb-3 ms-1"
                            style={{
                                width: "3rem",
                                backgroundColor: "var(--custom-green)",
                                height: "5px",
                                opacity: "0.5",
                            }}
                        />
                        <ul className="chatroom-box d-flex flex-column">
                            {message &&
                                message.map((item: any, index) => {
                                    return (
                                        <li key={index} className="chat">
                                            <span>{item}</span>
                                        </li>
                                    );
                                })}
                        </ul>

                        <div className="d-flex w-100  mt-auto flex-column">
                            <div>
                                <hr
                                    className=" mt-3 mb-3 w-100"
                                    style={{
                                        backgroundColor: "var(--custom-green)",
                                        height: "2px",
                                        opacity: "0.5",
                                    }}
                                />
                            </div>
                            <div className="d-flex flex-row p-1 gap-2 ">
                                <div className="w-75 chat-input-wrapper ">
                                    <div className="chat-input">
                                        <input type="text" required ref={localMessage} />
                                        <span>enter...</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        send();
                                    }}
                                    className="btn chat-btn flex-fill"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                    {props?.teacher !== true ? (
                        <div className="col-md-4 mt-sm-2 position-relative">
                            <div className="classroom-webcam-wrapper d-flex flex-column position-sticky top-0">
                                <video muted ref={localStream} className={`classroom-webcam`}></video>
                                <button
                                    onClick={() => {
                                        sign();
                                    }}
                                    className="btn chat-btn flex-fill"
                                >
                                    Take Attendance
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="col-md-4 mt-3 mt-sm-4 sign-card">
                                <h5 className="my-0 ms-2 mt-2">Attendance</h5>
                                <hr
                                    className="my-3 mb-4 ms-1"
                                    style={{
                                        width: "100%",
                                        backgroundColor: "var(--custom-primary)",
                                        height: "5px",
                                    }}
                                />
                                <ul>
                                    {signed && (
                                        <>
                                            {signed.map((item: any, index) => {
                                                return (
                                                    <li key={index}>
                                                        <span>{item}</span>
                                                    </li>
                                                );
                                            })}
                                        </>
                                    )}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ChatRoom;
