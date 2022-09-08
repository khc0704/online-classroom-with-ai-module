import { useEffect, useState } from "react";
import { socket } from "../../providers/SocketProvider";

const DialogContainer = (props: any) => {
    const dialog_style = {
        "--clr": "grey",
    } as React.CSSProperties;

    const [translate, setTranslate] = useState<string[]>([]);

    const onTranslate = () => {
        socket.on("on_translate", (data) => {
            setTranslate((translate) => [...translate, data?.translate]);
        });
    };

    useEffect(() => {
        onTranslate();
    }, []);
    return (
        <>
            <div className="card dialog-card">
                <div className="card-body w-100 d-flex flex-column">
                    <h5 className="my-0 ms-2 mt-2" style={{ color: "var(--custom-main)", opacity: "0.8" }}>
                        Translation
                    </h5>
                    <div className="d-flex flex-row gap-2 mt-2">
                        <button
                            onClick={() => {
                                props.setLang("en");
                            }}
                            className="btn trans-btn flex-fill"
                        >
                            en-us
                        </button>
                        <button
                            onClick={() => {
                                props.setLang("ja");
                                console.log("ja");
                            }}
                            className="btn trans-btn flex-fill"
                        >
                            jp
                        </button>
                        <button
                            onClick={() => {
                                props.setLang("ko");
                            }}
                            className="btn trans-btn flex-fill"
                        >
                            kr
                        </button>
                    </div>
                    <hr
                        className="my-3 mb-4 ms-1"
                        style={{
                            width: "3rem",
                            backgroundColor: "var(--custom-main)",
                            height: "5px",
                            opacity: "0.5",
                        }}
                    />
                    <ul className="dialog-box d-flex flex-column">
                        <li className="dialog">
                            <span>載入完成</span>
                        </li>
                        {translate.map((item: string, index) => {
                            return (
                                <li key={index} className="dialog">
                                    <span>{item}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default DialogContainer;
