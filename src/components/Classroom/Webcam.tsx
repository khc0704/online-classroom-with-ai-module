import { useEffect, useRef, useState, useContext } from "react";
import { SocketContext } from "../../providers/SocketProvider";
import ChatRoom from "./ChatRoom";

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const speechRecognition = new SpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.lang = "cmn-Hant-TW";

const Webcam = (props: any) => {
    const [status, setStatus] = useState(false);
    const [streaming, setStreaming] = useState<NodeJS.Timeout | null>();
    const localStream = useRef<HTMLVideoElement>(null);
    const localScreen = useRef<HTMLVideoElement>(null);
    const localDialog = useRef<HTMLSpanElement>(null);
    const socket = useContext(SocketContext);

    const joinRoom = () => {
        socket.emit("join-room", {
            username: props.username,
            room: props.room,
        });
    };

    const startSpeech = () => {
        speechRecognition.start();
        speechRecognition.onaudioend = () => {
            updateDialog("");
            sendTranscription("", false);
        };
        speechRecognition.onend = () => {
            speechRecognition.start();
        };
        speechRecognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
                .map((result: any) => result[0])
                .map((result) => result.transcript)
                .join("");
            if (transcript.length >= 20) {
                updateDialog(transcript.substring(transcript.length - 20, transcript.length));
            } else {
                updateDialog(transcript);
            }
            if (event.results[0].isFinal) {
                speechRecognition.stop();
                sendTranscription(transcript, true);
                return;
            }
            sendTranscription(transcript, false);
        };
    };

    const updateDialog = (dialog: string) => {
        if (localDialog?.current) {
            localDialog.current.innerText = dialog;
        }
    };

    const stopSpeech = () => {
        speechRecognition.stop();
        speechRecognition.onend = () => {
            updateDialog("");
            sendTranscription("", false);
        };
    };

    const startCam = (stream: MediaStream) => {
        if (localStream?.current) {
            localStream.current.srcObject = stream;
            localStream.current.play();
        }
    };

    const startScreen = (stream: MediaStream) => {
        if (localScreen?.current) {
            localScreen.current.srcObject = stream;
            localScreen.current.play();
        }
    };

    const stopCam = () => {
        if (localStream?.current?.srcObject) {
            (localStream.current.srcObject as MediaStream).getTracks().forEach(function (track) {
                track.stop();
            });
            localStream.current.srcObject = null;
        }
    };

    const stopScreen = () => {
        if (localScreen?.current?.srcObject) {
            (localScreen.current.srcObject as MediaStream).getTracks().forEach(function (track) {
                track.stop();
            });
            localScreen.current.srcObject = null;
        }
    };

    const cnv = document.createElement("canvas");
    const ctx = cnv.getContext("2d");
    const snv = document.createElement("canvas");
    const stx = snv.getContext("2d");

    const sendVideo = () => {
        if (localStream?.current?.srcObject) {
            cnv.width = localStream?.current.videoWidth;
            cnv.height = localStream?.current.videoHeight;

            ctx?.drawImage(localStream.current, 0, 0, cnv.width, cnv.height);
            socket.emit("video", {
                room: props.room,
                video: cnv.toDataURL("image/jpeg", 0.3),
            });
        }
    };

    const sendScreen = () => {
        if (localScreen?.current?.srcObject) {
            snv.width = localScreen?.current.videoWidth;
            snv.height = localScreen?.current.videoHeight;

            stx?.drawImage(localScreen.current, 0, 0, snv.width, snv.height);
            socket.emit("screen", {
                room: props.room,
                video: snv.toDataURL("image/jpeg", 0.1),
            });
        }
    };

    const sendTranscription = (transcript: string, isFinal: boolean) => {
        socket.emit("transcription", {
            room: props.room,
            transcript: transcript,
            isFinal: isFinal,
        });
    };

    const onStart = () => {
        let done: boolean = true;
        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then((stream) => {
                startCam(stream);
                startSpeech();
            })
            .catch(() => {
                done = false;
            });
        navigator.mediaDevices
            .getDisplayMedia({})
            .then((screen) => {
                startScreen(screen);
            })
            .catch(() => {
                done = false;
            });

        if (done) {
            setStreaming(
                setInterval(() => {
                    sendVideo();
                    sendScreen();
                }, 1000 / 100),
            );
        }
    };

    const onStop = () => {
        stopCam();
        stopSpeech();
        stopScreen();
        if (streaming) {
            clearInterval(streaming);
        }
        setStreaming(null);
    };

    useEffect(() => {
        if (status) {
            onStart();
        } else {
            onStop();
        }
    }, [status]);

    useEffect(() => {
        joinRoom();
    }, []);

    return (
        <>
            <div className="row gx-0 classroom-box">
                <div className="col-lg-6">
                    <div className="classroom-webcam-wrapper">
                        <video muted ref={localStream} className={`classroom-webcam`}></video>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="classroom-webcam-wrapper">
                        <video muted ref={localScreen} className={`classroom-webcam`}></video>
                        <div className="dialog-wrapper">
                            <span ref={localDialog}></span>
                        </div>
                    </div>
                </div>
                <button
                    className={`w-100 mt-3 mb-4 btn main-btn ${status ? "start1" : ""}`}
                    onClick={() => setStatus(!status)}
                >
                    <span>{status ? "關閉直播" : "開啓直播"}</span>
                </button>
            </div>
            {/* {test && <img id="showing" className="classroom-remote-webcam" src={test}></img>} */}
        </>
    );
};

export default Webcam;
