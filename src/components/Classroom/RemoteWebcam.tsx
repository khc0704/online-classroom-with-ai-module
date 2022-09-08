import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../providers/SocketProvider";
import DialogContainer from "./DialogContainer";

const RemoteWebcam = (props: any) => {
    const [status, setStatus] = useState(true);
    const [isTranslate, setIsTranslate] = useState(true);
    const [translate, setTranslate] = useState<string[]>([]);
    const remoteStream = useRef<HTMLImageElement>(null);
    const remoteDialog = useRef<HTMLSpanElement>(null);
    const remoteScreen = useRef<HTMLImageElement>(null);
    const socket = useContext(SocketContext);

    const joinRoom = () => {
        socket.emit("join-room", {
            username: props.username,
            room: props.room,
        });
    };
    let i = 1;
    const leaveRoom = () => {
        socket.emit("leave-room", {
            username: props.username,
            room: props.room,
        });
    };

    const updateDialog = (dialog: string) => {
        if (remoteDialog?.current) {
            if (dialog.length >= 20) {
                remoteDialog.current.innerText = dialog.substring(dialog.length - 20, dialog.length);
            } else {
                remoteDialog.current.innerText = dialog;
            }
        }
    };

    const updateStream = (stream: string) => {
        if (remoteStream?.current) {
            remoteStream.current.src = stream;
        }
    };

    const updateScreen = (screen: string) => {
        if (remoteScreen?.current) {
            remoteScreen.current.src = screen;
        }
    };

    const onStraem = () => {
        socket.on("on_video", (data) => {
            updateStream(data?.video);
        });
    };

    const onScreen = () => {
        socket.on("on_screen", (data) => {
            updateScreen(data?.video);
        });
    };

    const onTranscription = () => {
        socket.on("on_transcription", (data) => {
            const transcript: string = data?.transcript;
            const isFinal: boolean = data?.isFinal;

            updateDialog(transcript);

            if (isTranslate && isFinal) {
                socket.emit("translate", {
                    transcript: transcript,
                    lang: props.getLang(),
                });
                console.log(props.getLang());
            }
        });
    };

    const onJoin = () => {
        joinRoom();
        onStraem();
        onScreen();
        onTranscription();
    };

    const onLeave = () => {
        if (remoteDialog?.current && remoteScreen?.current && remoteStream?.current) {
            remoteDialog.current.innerText = "";
            remoteStream.current.src = "";
            remoteScreen.current.src = "";
        }
        socket.off("on_video");
        socket.off("on_screen");
        socket.off("on_transcription");
        socket.off("on_translation");
        leaveRoom();
    };

    useEffect(() => {
        if (status) {
            onJoin();
        } else {
            onLeave();
        }
    }, [status]);

    return (
        <>
            <div className="d-flex flex-column">
                <div className="d-flex row gx-0">
                    <div className="col-md-6 col-12">
                        <div className="classroom-webcam-wrapper">
                            <img className="classroom-webcam remote-image" ref={remoteStream}></img>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="classroom-webcam-wrapper">
                            <img className="classroom-webcam remote-image" ref={remoteScreen}></img>
                            <div className="dialog-wrapper">
                                <span ref={remoteDialog}></span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <button onClick={() => console.log(translate)}>{status.toString()}</button>*/}
            </div>
        </>
    );
};

export default RemoteWebcam;
